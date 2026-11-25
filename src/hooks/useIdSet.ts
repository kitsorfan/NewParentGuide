import { useCallback, useMemo } from 'react'
import { usePersistentState } from './usePersistentState'

/** Validates a stored list of ids. */
export function parseIds(raw: unknown): readonly string[] | undefined {
  return Array.isArray(raw) && raw.every((id) => typeof id === 'string') ? raw : undefined
}

export interface IdSet {
  readonly owned: ReadonlySet<string>
  readonly toggle: (id: string) => void
  readonly clear: () => void
}

/** A set of ticked ids (checklist state), remembered in localStorage under `storageKey`. */
export function useIdSet(storageKey: string): IdSet {
  const [ids, setIds] = usePersistentState<readonly string[]>(storageKey, [], parseIds)

  const owned = useMemo(() => new Set(ids), [ids])

  const toggle = useCallback(
    (id: string) =>
      setIds((current) =>
        current.includes(id) ? current.filter((other) => other !== id) : [...current, id],
      ),
    [setIds],
  )

  const clear = useCallback(() => setIds([]), [setIds])

  return { owned, toggle, clear }
}
