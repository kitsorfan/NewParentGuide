import { Info } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

interface Props {
  /** Accessible name of the ⓘ button. */
  readonly label: string
  /** What the hint says. */
  readonly content: ReactNode
  /** The visible trigger area (e.g. the item name). Hovering it opens the hint. */
  readonly children: ReactNode
}

/**
 * A hint that opens on mouse hover, and toggles on tap/click/Enter for touch and keyboard users.
 * Escape or a click elsewhere closes it.
 */
export function InfoHint({ label, content, children }: Props) {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const bubbleId = useId()
  const open = hovered || pinned

  useEffect(() => {
    if (!pinned) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setPinned(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [pinned])

  return (
    // The wrapper only listens for hover/Escape; the button is the interactive element.
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={rootRef}
      className="hint"
      data-open={open}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setPinned(false)
          setHovered(false)
        }
      }}
    >
      <div className="hint__trigger">{children}</div>
      <button
        type="button"
        className="hint__button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={bubbleId}
        onClick={() => setPinned((value) => !value)}
      >
        <Info aria-hidden="true" size={16} />
      </button>
      <div id={bubbleId} className="hint__bubble" hidden={!open}>
        {content}
      </div>
    </div>
  )
}
