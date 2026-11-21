import type { CSSProperties, ReactNode } from 'react'

/*
 * A calm, slowly moving nursery backdrop: soft pastel glows, drifting baby motifs and a few
 * rising bath bubbles. Purely decorative, so it is hidden from assistive tech and ignores the
 * pointer. Colours and per-theme tuning live in src/styles/ambient.css; all motion stops under
 * `prefers-reduced-motion`.
 */

type Shape =
  | 'star'
  | 'sparkle'
  | 'moon'
  | 'cloud'
  | 'heart'
  | 'duck'
  | 'bottle'
  | 'pacifier'
  | 'rattle'
  | 'onesie'
  | 'feet'
type Tone = 'pink' | 'peach' | 'mint' | 'sky' | 'lilac' | 'butter'
/**
 * bob – floats up and down with a tilt      swim – paddles across and back, turning at each end
 * rock – cradle-rocks in place               drift – sails slowly sideways (clouds)
 * twinkle – pulses and glints                wander – loops around a small circuit
 */
type Motion = 'bob' | 'swim' | 'rock' | 'drift' | 'twinkle' | 'wander'

interface Motif {
  readonly shape: Shape
  readonly tone: Tone
  readonly motion: Motion
  /** Position, in % of the backdrop. */
  readonly x: number
  readonly y: number
  /** Size in px. */
  readonly size: number
  /** Seconds per cycle. Negative delays start mid-cycle so nothing moves in step. */
  readonly duration: number
  readonly delay: number
  /** Resting rotation in degrees. */
  readonly tilt: number
  /** For `swim` and `drift`: how far it travels, in vw (negative = leftwards first). */
  readonly travel?: number
}

interface Bubble {
  /** Horizontal position, in % of the backdrop. */
  readonly x: number
  readonly size: number
  readonly duration: number
  readonly delay: number
}

type StyleVars = CSSProperties & Record<`--${string}`, string>

/** 24×24 silhouettes (the onesie reuses the favicon's artwork). Cut-outs use `evenodd`. */
const SHAPES: Record<Shape, { readonly viewBox: string; readonly art: ReactNode }> = {
  star: {
    viewBox: '0 0 24 24',
    art: (
      <path
        d="M12 2 14.65 8.36 21.51 8.91 16.28 13.39 17.88 20.09 12 16.5 6.12 20.09 7.72 13.39 2.49 8.91 9.35 8.36Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  sparkle: {
    viewBox: '0 0 24 24',
    art: (
      <path d="M12 1.5c.7 6.1 4.4 9.8 10.5 10.5-6.1.7-9.8 4.4-10.5 10.5-.7-6.1-4.4-9.8-10.5-10.5C7.6 11.3 11.3 7.6 12 1.5Z" />
    ),
  },
  moon: {
    viewBox: '0 0 24 24',
    art: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  },
  cloud: {
    viewBox: '0 0 24 24',
    art: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  },
  heart: {
    viewBox: '0 0 24 24',
    art: (
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  duck: {
    viewBox: '0 0 24 24',
    art: (
      <>
        <path d="M2.5 11.5c1.2 1 2.6 1.4 4 1.2 1.5-.2 2.6-.8 4.2-.8H17c2.6 0 4.5 1.6 4.5 3.9 0 3-3.2 5.2-8.5 5.2-6 0-10-2.6-10.5-9.5Z" />
        <path
          fillRule="evenodd"
          d="M10.8 8a4.2 4.2 0 1 0 8.4 0 4.2 4.2 0 1 0-8.4 0Zm4.8-.8a.8.8 0 1 0 1.6 0 .8.8 0 1 0-1.6 0Z"
        />
        <path
          d="M18.6 7.6 22.5 8.6 18.6 10.2Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  bottle: {
    viewBox: '0 0 24 24',
    art: (
      <>
        <path d="M10 6V4.2C10 2.8 10.9 1.8 12 1.8s2 1 2 2.4V6Z" />
        <rect x="8.2" y="5.8" width="7.6" height="2.6" rx="1" />
        <path
          fillRule="evenodd"
          d="M10 9h4a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 14 22h-4a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 10 9Zm-.5 3.5V13.5H12V12.5Zm0 3V16.5h2V15.5Zm0 3V19.5H12V18.5Z"
        />
      </>
    ),
  },
  pacifier: {
    viewBox: '0 0 24 24',
    art: (
      <>
        <path d="M10.2 9V6.5C10.2 4.6 11 3 12 3s1.8 1.6 1.8 3.5V9Z" />
        <path
          fillRule="evenodd"
          d="M2.5 11.5C2.5 9.6 6 8.5 12 8.5s9.5 1.1 9.5 3-3.5 3-9.5 3-9.5-1.1-9.5-3Zm8 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0Z"
        />
        <circle cx="12" cy="18.2" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
  },
  rattle: {
    viewBox: '0 0 24 24',
    art: (
      <>
        <path
          fillRule="evenodd"
          d="M2.5 9a6.5 6.5 0 1 0 13 0 6.5 6.5 0 1 0-13 0Zm3.5-2a1 1 0 1 0 2 0 1 1 0 1 0-2 0Zm4.1 1a.9.9 0 1 0 1.8 0 .9.9 0 1 0-1.8 0Zm-2.5 3.5a.9.9 0 1 0 1.8 0 .9.9 0 1 0-1.8 0Z"
        />
        <path
          d="M13.6 13.6 18.6 18.6"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
  },
  onesie: {
    viewBox: '10 9 44 44',
    art: (
      <path
        fillRule="evenodd"
        d="M20 14 26 12Q32 18 38 12L44 14 52 22 47 27 43 24V46Q43 50 39 50H36Q32 46 28 50H25Q21 50 21 46V24L17 27 12 22ZM32 38C26 34 26 29 29.5 28.5 31 28.3 32 29.3 32 30.4 32 29.3 33 28.3 34.5 28.5 38 29 38 34 32 38Z"
      />
    ),
  },
  feet: {
    viewBox: '0 0 24 24',
    art: (
      <>
        <ellipse cx="7" cy="16" rx="2.8" ry="4.4" transform="rotate(-12 7 16)" />
        <circle cx="3.7" cy="11.6" r=".6" />
        <circle cx="4.5" cy="10.6" r=".7" />
        <circle cx="5.6" cy="9.9" r=".8" />
        <circle cx="6.9" cy="9.5" r=".9" />
        <circle cx="8.4" cy="9.6" r="1.15" />
        <ellipse cx="17" cy="10" rx="2.8" ry="4.4" transform="rotate(12 17 10)" />
        <circle cx="15.6" cy="3.6" r="1.15" />
        <circle cx="17.1" cy="3.5" r=".9" />
        <circle cx="18.4" cy="3.9" r=".8" />
        <circle cx="19.5" cy="4.6" r=".7" />
        <circle cx="20.3" cy="5.6" r=".6" />
      </>
    ),
  },
}

/*
 * Ordered so the first 12 cover the screen evenly on their own; small screens show only those.
 * Night mode keeps just the sleepy ones (stars, sparkles, moon, clouds).
 */
const MOTIFS: readonly Motif[] = [
  {
    shape: 'moon',
    tone: 'lilac',
    motion: 'rock',
    x: 86,
    y: 7,
    size: 46,
    duration: 8,
    delay: -3,
    tilt: -10,
  },
  {
    shape: 'star',
    tone: 'butter',
    motion: 'twinkle',
    x: 7,
    y: 6,
    size: 18,
    duration: 3.6,
    delay: -1,
    tilt: 0,
  },
  {
    shape: 'cloud',
    tone: 'sky',
    motion: 'drift',
    x: 24,
    y: 13,
    size: 58,
    duration: 30,
    delay: -12,
    tilt: 0,
    travel: 16,
  },
  {
    shape: 'duck',
    tone: 'butter',
    motion: 'swim',
    x: 84,
    y: 36,
    size: 40,
    duration: 20,
    delay: -4,
    tilt: 0,
    travel: -22,
  },
  {
    shape: 'heart',
    tone: 'pink',
    motion: 'bob',
    x: 4,
    y: 30,
    size: 24,
    duration: 6,
    delay: -2,
    tilt: -12,
  },
  {
    shape: 'sparkle',
    tone: 'pink',
    motion: 'twinkle',
    x: 60,
    y: 5,
    size: 14,
    duration: 4,
    delay: -2.5,
    tilt: 0,
  },
  {
    shape: 'bottle',
    tone: 'sky',
    motion: 'bob',
    x: 11,
    y: 54,
    size: 36,
    duration: 7,
    delay: -3,
    tilt: 14,
  },
  {
    shape: 'onesie',
    tone: 'mint',
    motion: 'bob',
    x: 56,
    y: 44,
    size: 40,
    duration: 8,
    delay: -5,
    tilt: -8,
  },
  {
    shape: 'pacifier',
    tone: 'pink',
    motion: 'wander',
    x: 72,
    y: 62,
    size: 34,
    duration: 18,
    delay: -9,
    tilt: 18,
  },
  {
    shape: 'star',
    tone: 'mint',
    motion: 'twinkle',
    x: 42,
    y: 24,
    size: 14,
    duration: 4.4,
    delay: -1.2,
    tilt: 12,
  },
  {
    shape: 'feet',
    tone: 'peach',
    motion: 'wander',
    x: 6,
    y: 80,
    size: 34,
    duration: 20,
    delay: -7,
    tilt: 10,
  },
  {
    shape: 'rattle',
    tone: 'lilac',
    motion: 'rock',
    x: 38,
    y: 74,
    size: 34,
    duration: 7,
    delay: -2,
    tilt: -20,
  },
  {
    shape: 'cloud',
    tone: 'pink',
    motion: 'drift',
    x: 70,
    y: 24,
    size: 48,
    duration: 36,
    delay: -20,
    tilt: 0,
    travel: -14,
  },
  {
    shape: 'sparkle',
    tone: 'butter',
    motion: 'twinkle',
    x: 28,
    y: 40,
    size: 12,
    duration: 3.2,
    delay: -1,
    tilt: 0,
  },
  {
    shape: 'star',
    tone: 'pink',
    motion: 'twinkle',
    x: 94,
    y: 76,
    size: 16,
    duration: 4.2,
    delay: -1.5,
    tilt: -8,
  },
  {
    shape: 'heart',
    tone: 'lilac',
    motion: 'bob',
    x: 52,
    y: 88,
    size: 20,
    duration: 6.5,
    delay: -4,
    tilt: 10,
  },
  {
    shape: 'duck',
    tone: 'butter',
    motion: 'swim',
    x: 14,
    y: 92,
    size: 30,
    duration: 24,
    delay: -15,
    tilt: 0,
    travel: 26,
  },
  {
    shape: 'sparkle',
    tone: 'sky',
    motion: 'twinkle',
    x: 82,
    y: 90,
    size: 14,
    duration: 3,
    delay: -0.8,
    tilt: 0,
  },
  {
    shape: 'cloud',
    tone: 'mint',
    motion: 'drift',
    x: 44,
    y: 60,
    size: 44,
    duration: 34,
    delay: -6,
    tilt: 0,
    travel: 12,
  },
  {
    shape: 'star',
    tone: 'lilac',
    motion: 'twinkle',
    x: 16,
    y: 70,
    size: 12,
    duration: 3.8,
    delay: -2.2,
    tilt: 20,
  },
  {
    shape: 'heart',
    tone: 'peach',
    motion: 'bob',
    x: 88,
    y: 50,
    size: 18,
    duration: 5.5,
    delay: -3,
    tilt: 14,
  },
]

const BUBBLES: readonly Bubble[] = [
  { x: 9, size: 26, duration: 34, delay: -4 },
  { x: 31, size: 16, duration: 28, delay: -17 },
  { x: 63, size: 30, duration: 42, delay: -26 },
  { x: 84, size: 20, duration: 31, delay: -9 },
  { x: 47, size: 14, duration: 26, delay: -2 },
  { x: 72, size: 22, duration: 37, delay: -33 },
  { x: 18, size: 34, duration: 46, delay: -38 },
]

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__wash" />
      <div className="ambient__glow ambient__glow--1" />
      <div className="ambient__glow ambient__glow--2" />
      <div className="ambient__glow ambient__glow--3" />
      <div className="ambient__glow ambient__glow--4" />

      <div className="ambient__motifs">
        {MOTIFS.map((motif) => {
          const { viewBox, art } = SHAPES[motif.shape]
          const style: StyleVars = {
            '--x': `${motif.x}%`,
            '--y': `${motif.y}%`,
            '--size': `${motif.size}px`,
            '--duration': `${motif.duration}s`,
            '--delay': `${motif.delay}s`,
            '--tilt': `${motif.tilt}deg`,
            '--travel': `${motif.travel ?? 0}vw`,
            // The artwork faces right; face the way it sets off.
            '--face': (motif.travel ?? 0) < 0 ? '-1' : '1',
          }
          return (
            <svg
              key={`${motif.shape}-${motif.x}-${motif.y}`}
              className="ambient__motif"
              data-shape={motif.shape}
              data-tone={motif.tone}
              data-motion={motif.motion}
              viewBox={viewBox}
              fill="currentColor"
              style={style}
            >
              {art}
            </svg>
          )
        })}
      </div>

      <div className="ambient__bubbles">
        {BUBBLES.map((bubble) => {
          const style: StyleVars = {
            '--x': `${bubble.x}%`,
            '--size': `${bubble.size}px`,
            '--duration': `${bubble.duration}s`,
            '--delay': `${bubble.delay}s`,
          }
          return (
            <span key={bubble.x} className="ambient__bubble" style={style}>
              <span className="ambient__bubble-body" />
            </span>
          )
        })}
      </div>
    </div>
  )
}
