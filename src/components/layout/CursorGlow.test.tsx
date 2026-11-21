import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CursorGlow } from './CursorGlow'

const RATTLE = 'url(rattle.svg) 5 5, auto'
const SHAKE = 'url(rattle-shake.svg) 5 5, pointer'

function setup() {
  const view = render(
    <div style={{ cursor: RATTLE }}>
      <p>Plain text</p>
      <button type="button" style={{ cursor: SHAKE }}>
        Add
      </button>
      <input type="search" style={{ cursor: 'text' }} />
      <CursorGlow />
    </div>,
  )
  const glow = view.container.querySelector<HTMLElement>('.cursor-glow')!
  const follower = glow.querySelector<HTMLElement>('.cursor-glow__follower')!
  const get = (selector: string) => view.container.querySelector<HTMLElement>(selector)!
  return { ...view, glow, follower, get }
}

const mouse = { pointerType: 'mouse' } as const

afterEach(() => {
  vi.useRealTimers()
})

describe('CursorGlow', () => {
  it('is decorative and stays hidden until the mouse moves', () => {
    const { glow } = setup()
    expect(glow).toHaveAttribute('aria-hidden', 'true')
    expect(glow).not.toHaveAttribute('data-visible')
    expect(glow.querySelectorAll('.cursor-glow__dot')).toHaveLength(8)
  })

  it('appears on the rattle’s head, 6px past the hotspot', () => {
    const { glow, follower, get } = setup()
    fireEvent.pointerMove(get('p'), { ...mouse, clientX: 100, clientY: 40 })
    expect(glow).toHaveAttribute('data-visible', 'true')
    expect(follower.style.transform).toBe('translate3d(106px, 46px, 0)')
    for (const dot of glow.querySelectorAll<HTMLElement>('.cursor-glow__dot')) {
      expect(dot.style.transform).toBe('translate3d(106px, 46px, 0)')
    }
  })

  it('follows the page’s cursor: rattle, shaking over clickables, aside over text fields', () => {
    const { glow, get } = setup()
    fireEvent.pointerMove(get('p'), mouse)
    expect(glow).toHaveAttribute('data-over', 'rattle')
    fireEvent.pointerMove(get('button'), mouse)
    expect(glow).toHaveAttribute('data-over', 'shake')
    fireEvent.pointerMove(get('input'), mouse)
    expect(glow).toHaveAttribute('data-over', 'other')
  })

  it('jingles on click and keeps the pressed rattle up briefly', () => {
    vi.useFakeTimers()
    const { glow, get } = setup()
    const button = get('button')
    fireEvent.pointerMove(button, mouse)
    fireEvent.pointerDown(button, { ...mouse, clientX: 20, clientY: 30 })

    expect(document.documentElement).toHaveAttribute('data-cursor', 'press')
    expect(glow).toHaveAttribute('data-press', 'true')
    const burst = glow.querySelector<HTMLElement>('.cursor-glow__burst')!
    expect(burst.style.transform).toBe('translate3d(26px, 36px, 0)')
    expect(burst.querySelectorAll('.cursor-glow__ripple')).toHaveLength(1)
    expect(burst.querySelectorAll('.cursor-glow__spark')).toHaveLength(7)

    fireEvent.pointerUp(button, mouse)
    expect(document.documentElement).toHaveAttribute('data-cursor', 'press')
    act(() => void vi.advanceTimersByTime(200))
    expect(document.documentElement).not.toHaveAttribute('data-cursor')
    expect(glow).not.toHaveAttribute('data-press')

    act(() => void vi.advanceTimersByTime(800))
    expect(glow.querySelector('.cursor-glow__burst')).toBeNull()
  })

  it('does not sparkle when clicking into a text field', () => {
    const { glow, get } = setup()
    fireEvent.pointerMove(get('input'), mouse)
    fireEvent.pointerDown(get('input'), mouse)
    expect(glow.querySelector('.cursor-glow__burst')).toBeNull()
  })

  it('ignores touch', () => {
    const { glow, get } = setup()
    const touch = { pointerType: 'touch' } as const
    fireEvent.pointerMove(get('button'), touch)
    fireEvent.pointerDown(get('button'), touch)
    expect(glow).toHaveAttribute('data-visible', 'false')
    expect(document.documentElement).not.toHaveAttribute('data-cursor')
  })

  it('hides when the mouse leaves the window or the window loses focus', () => {
    const { glow, get } = setup()
    fireEvent.pointerMove(get('p'), mouse)
    fireEvent.pointerOut(get('p'), { ...mouse, relatedTarget: null })
    expect(glow).toHaveAttribute('data-visible', 'false')

    fireEvent.pointerMove(get('p'), mouse)
    fireEvent.pointerDown(get('p'), mouse)
    fireEvent.blur(window)
    expect(glow).toHaveAttribute('data-visible', 'false')
    expect(document.documentElement).not.toHaveAttribute('data-cursor')
  })

  it('cleans up after itself', () => {
    const { get, unmount } = setup()
    fireEvent.pointerDown(get('p'), mouse)
    expect(document.documentElement).toHaveAttribute('data-cursor', 'press')
    unmount()
    expect(document.documentElement).not.toHaveAttribute('data-cursor')
  })
})
