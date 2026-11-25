import { useCallback, useMemo, useState } from 'react'
import { items } from '../data/items'
import {
  completeIds,
  countsFromTicks,
  parseCounts,
  withCount,
  type OwnedCounts,
} from '../lib/owned'
import { useIdSet, type IdSet } from './useIdSet'
import { usePersistentState } from './usePersistentState'

export const OWNED_STORAGE_KEY = 'npg.owned.v2'
/** The old format: a list of ticked item ids. Read once to carry ticks over to counts. */
export const LEGACY_OWNED_STORAGE_KEY = 'npg.owned.v1'
export const PACKED_STORAGE_KEY = 'npg.bag.v1'

function readLegacyTicks(): OwnedCounts {
  try {
    const raw = window.localStorage.getItem(LEGACY_OWNED_STORAGE_KEY)
    return (raw === null ? undefined : countsFromTicks(JSON.parse(raw), items)) ?? {}
  } catch {
    return {}
  }
}

export interface OwnedItems {
  /** How many of each item the user has. */
  readonly counts: OwnedCounts
  /** Items the user has enough of. */
  readonly owned: ReadonlySet<string>
  readonly setCount: (id: string, count: number) => void
  readonly clear: () => void
}

/** Shopping-list items the user has, with how many of each. */
export function useOwnedItems(): OwnedItems {
  const [legacy] = useState(readLegacyTicks)
  const [counts, setCounts] = usePersistentState<OwnedCounts>(
    OWNED_STORAGE_KEY,
    legacy,
    parseCounts,
  )

  const owned = useMemo(() => completeIds(items, counts), [counts])

  const setCount = useCallback(
    (id: string, count: number) => setCounts((current) => withCount(current, id, count)),
    [setCounts],
  )

  const clear = useCallback(() => setCounts({}), [setCounts])

  return { counts, owned, setCount, clear }
}

/** Hospital-bag items the user has packed. */
export function usePackedItems(): IdSet {
  return useIdSet(PACKED_STORAGE_KEY)
}
