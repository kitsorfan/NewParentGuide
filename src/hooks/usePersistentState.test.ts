import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { usePersistentState } from './usePersistentState'

const parseNumber = (raw: unknown) => (typeof raw === 'number' ? raw : undefined)

describe('usePersistentState', () => {
  it('starts from the stored value', () => {
    window.localStorage.setItem('k', '42')
    const { result } = renderHook(() => usePersistentState('k', 0, parseNumber))
    expect(result.current[0]).toBe(42)
  })

  it('falls back to the initial value for invalid or corrupt data', () => {
    window.localStorage.setItem('a', '"not a number"')
    window.localStorage.setItem('b', '{broken json')
    expect(renderHook(() => usePersistentState('a', 7, parseNumber)).result.current[0]).toBe(7)
    expect(renderHook(() => usePersistentState('b', 8, parseNumber)).result.current[0]).toBe(8)
  })

  it('saves updates', () => {
    const { result } = renderHook(() => usePersistentState('k', 0, parseNumber))
    act(() => result.current[1](5))
    expect(window.localStorage.getItem('k')).toBe('5')
  })

  it('keeps working when storage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    const { result } = renderHook(() => usePersistentState('k', 0, parseNumber))
    act(() => result.current[1](3))
    expect(result.current[0]).toBe(3)
  })
})
