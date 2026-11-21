import { useEffect, useRef, type CSSProperties } from 'react'

/*
 * The glow around the rattle cursor (see src/styles/cursor.css): a soft halo on the rattle's head
 * that trails the pointer, a short comet tail of pastel dots, and a little jingle of sparks on
 * click. While a button is held, <html data-cursor="press"> swaps in the jingling rattle.
 *
 * Purely decorative: hidden from assistive tech, never takes the pointer, ignores touch, and steps
 * aside wherever the page shows another cursor (the I-beam in text fields, `help` on hints).
 * Positions are written straight to the DOM from one animation-frame loop, so moving the mouse
 * never re-renders anything.
 */

/** The rattle's head is centred 6px right of and below the cursor hotspot. */
const HEAD_OFFSET = 6
/** Share of the remaining distance the halo closes per 60 Hz frame (lower trails further). */
const HALO_FOLLOW = 0.35
/** Each trail dot closes this share of the gap to the dot ahead of it, per 60 Hz frame. */
const TRAIL_FOLLOW = 0.45
const TRAIL_LENGTH = 8
const SPARKS = 7
/** Keeps the jingling rattle up long enough to see on a quick click. */
const MIN_PRESS_MS = 160
/** Covers the longest burst animation in cursor.css. */
const BURST_MS = 800

const TONES = ['pink', 'butter', 'mint', 'lilac', 'sky'] as const
const SPARK_SHAPES = ['star', 'heart', 'dot'] as const
const TRAIL_DOTS = Array.from({ length: TRAIL_LENGTH }, (_, index) => TONES[index % TONES.length])

/** What the pointer is over: plain rattle, shaking rattle (clickable), or another cursor. */
type Over = 'rattle' | 'shake' | 'other'

type StyleVars = CSSProperties & Record<`--${string}`, string>

interface Point {
  x: number
  y: number
}

/** A point that drives an element's position. */
interface Mover extends Point {
  readonly element: HTMLElement
}

/** Moves `point` a frame-rate-independent `share` of the way to `target`; true once it arrives. */
function approach(point: Point, target: Point, share: number, frames: number): boolean {
  const keep = (1 - share) ** frames
  point.x = target.x + (point.x - target.x) * keep
  point.y = target.y + (point.y - target.y) * keep
  if (Math.abs(point.x - target.x) > 0.1 || Math.abs(point.y - target.y) > 0.1) return false
  point.x = target.x
  point.y = target.y
  return true
}

function place(element: HTMLElement, { x, y }: Point) {
  element.style.transform = `translate3d(${x}px, ${y}px, 0)`
}

/** Reads the cursor the stylesheet gives `element`, so this always agrees with cursor.css. */
function cursorOver(element: Element | null): Over {
  if (!element) return 'other'
  const cursor = getComputedStyle(element).cursor
  if (!cursor.startsWith('url(')) return 'other'
  return cursor.endsWith('pointer') ? 'shake' : 'rattle'
}

/** A ripple and a ring of tiny stars, hearts and dots flying out from `at`. */
function createBurst(at: Point): HTMLElement {
  const burst = document.createElement('span')
  burst.className = 'cursor-glow__burst'
  place(burst, at)

  const ripple = document.createElement('span')
  ripple.className = 'cursor-glow__ripple'
  burst.append(ripple)

  const turn = Math.random() * Math.PI * 2
  for (let index = 0; index < SPARKS; index++) {
    const angle = turn + (index / SPARKS) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
    const distance = 22 + Math.random() * 20
    const spark = document.createElement('span')
    spark.className = 'cursor-glow__spark'
    spark.dataset.shape = SPARK_SHAPES[index % SPARK_SHAPES.length]
    spark.dataset.tone = TONES[index % TONES.length]
    spark.style.setProperty('--dx', `${(Math.cos(angle) * distance).toFixed(1)}px`)
    spark.style.setProperty('--dy', `${(Math.sin(angle) * distance).toFixed(1)}px`)
    spark.style.setProperty('--rot', `${Math.round((Math.random() - 0.5) * 240)}deg`)
    burst.append(spark)
  }
  return burst
}

export function CursorGlow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const burstsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const halo = haloRef.current
    const trail = trailRef.current
    const bursts = burstsRef.current
    if (!root || !halo || !trail || !bursts) return

    const html = document.documentElement
    const reducedMotion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : undefined
    const target: Point = { x: 0, y: 0 }
    const haloAt: Mover = { element: halo, x: 0, y: 0 }
    const dots: Mover[] = Array.from(
      trail.children as HTMLCollectionOf<HTMLElement>,
      (element) => ({
        element,
        x: 0,
        y: 0,
      }),
    )
    const timers = new Set<number>()
    let frame = 0
    let lastTime = 0
    let visible = false
    let hovered: EventTarget | null = null
    let over: Over = 'other'
    let pressedAt = 0
    let releaseTimer = 0

    const later = (callback: () => void, ms: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        callback()
      }, ms)
      timers.add(timer)
      return timer
    }

    const setVisible = (value: boolean) => {
      visible = value
      root.dataset.visible = String(value)
    }

    const snap = () => {
      for (const mover of [haloAt, ...dots]) {
        Object.assign(mover, target)
        place(mover.element, mover)
      }
    }

    const step = (time: number) => {
      // At most ~3 frames' worth at once, e.g. after the tab was in the background.
      const frames = lastTime ? Math.min((time - lastTime) / (1000 / 60), 3) : 1
      lastTime = time
      let settled = approach(haloAt, target, HALO_FOLLOW, frames)
      place(halo, haloAt)
      // Each dot chases the one ahead of it, so the tail stretches with speed.
      let ahead: Point = target
      for (const dot of dots) {
        settled = approach(dot, ahead, TRAIL_FOLLOW, frames) && settled
        place(dot.element, dot)
        ahead = dot
      }
      frame = settled ? 0 : requestAnimationFrame(step)
      if (settled) lastTime = 0
    }

    const release = () => {
      delete html.dataset.cursor
      delete root.dataset.press
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        setVisible(false)
        return
      }
      target.x = event.clientX + HEAD_OFFSET
      target.y = event.clientY + HEAD_OFFSET
      if (event.target !== hovered) {
        hovered = event.target
        over = cursorOver(hovered instanceof Element ? hovered : null)
        root.dataset.over = over
      }
      // Appear right at the pointer rather than sweeping in from where it was last seen.
      if (!visible || reducedMotion?.matches) {
        snap()
        setVisible(true)
      } else if (!frame) {
        frame = requestAnimationFrame(step)
      }
    }

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.button !== 0) return
      window.clearTimeout(releaseTimer)
      pressedAt = performance.now()
      html.dataset.cursor = 'press'
      root.dataset.press = 'true'
      if (over === 'other' || reducedMotion?.matches) return
      const burst = createBurst({ x: event.clientX + HEAD_OFFSET, y: event.clientY + HEAD_OFFSET })
      bursts.append(burst)
      later(() => burst.remove(), BURST_MS)
    }

    const onUp = () => {
      releaseTimer = later(release, Math.max(0, MIN_PRESS_MS - (performance.now() - pressedAt)))
    }

    const onOut = (event: PointerEvent) => {
      // `relatedTarget` is null only when the pointer leaves the window.
      if (event.relatedTarget === null) setVisible(false)
    }

    const onBlur = () => {
      release()
      setVisible(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })
    window.addEventListener('pointerout', onOut, { passive: true })
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      window.removeEventListener('pointerout', onOut)
      window.removeEventListener('blur', onBlur)
      cancelAnimationFrame(frame)
      timers.forEach((timer) => window.clearTimeout(timer))
      bursts.replaceChildren()
      release()
    }
  }, [])

  return (
    <div ref={rootRef} className="cursor-glow" aria-hidden="true">
      <div className="cursor-glow__body">
        <div ref={trailRef}>
          {TRAIL_DOTS.map((tone, index) => {
            const style: StyleVars = { '--i': String(index) }
            return <span key={index} className="cursor-glow__dot" data-tone={tone} style={style} />
          })}
        </div>
        <div ref={haloRef} className="cursor-glow__follower">
          <span className="cursor-glow__halo" />
        </div>
      </div>
      <div ref={burstsRef} />
    </div>
  )
}
