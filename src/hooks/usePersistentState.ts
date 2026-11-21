import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'

function readStorage(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? undefined : (JSON.parse(raw) as unknown)
  } catch {
    // Private mode, blocked storage or corrupt JSON: fall back to the default.
    return undefined
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    if (value === undefined) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable: the app keeps working, it just won't remember.
  }
}

/**
 * `useState` that survives reloads via localStorage.
 * `parse` validates what was stored; returning `undefined` means "use the initial value".
 */
export function usePersistentState<T>(
  key: string,
  initial: T,
  parse: (raw: unknown) => T | undefined,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const stored = readStorage(key)
    return stored === undefined ? initial : (parse(stored) ?? initial)
  })

  const isFirstRender = useRef(true)
  useEffect(() => {
    // Don't write the value we just read back on mount.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    writeStorage(key, state)
  }, [key, state])

  return [state, setState]
}
