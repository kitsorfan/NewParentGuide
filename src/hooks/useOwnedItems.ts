import { useCallback, useMemo, useState } from 'react'
import { items } from '../data/items'
import {
  completeIds,
  countsFromTicks,
  parseCounts,
  withCount,
  type OwnedCounts,
} from '../lib/owned'
import { parseIds, useIdSet, type IdSet } from './useIdSet'
import { usePersistentState } from './usePersistentState'

export const OWNED_STORAGE_KEY = 'npg.owned.v2'
/** The old format: a list of ticked item ids. Read once to carry ticks over to counts. */
export const LEGACY_OWNED_STORAGE_KEY = 'npg.owned.v1'
export const SKIPPED_STORAGE_KEY = 'npg.skipped.v1'
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
  /** Items the user marked "I don't need it". */
  readonly skipped: ReadonlySet<string>
  /** Setting a count above zero also clears "don't need". */
  readonly setCount: (id: string, count: number) => void
  /** Marking "don't need" also clears the count. */
  readonly setSkipped: (id: string, skipped: boolean) => void
  readonly clear: () => void
}

function withoutId(ids: readonly string[], id: string): readonly string[] {
  return ids.includes(id) ? ids.filter((other) => other !== id) : ids
}

/** Shopping-list items the user has (with how many of each) or doesn't need. */
export function useOwnedItems(): OwnedItems {
  const [legacy] = useState(readLegacyTicks)
  const [counts, setCounts] = usePersistentState<OwnedCounts>(
    OWNED_STORAGE_KEY,
    legacy,
    parseCounts,
  )

  const [skippedIds, setSkippedIds] = usePersistentState<readonly string[]>(
    SKIPPED_STORAGE_KEY,
    [],
    parseIds,
  )

  const owned = useMemo(() => completeIds(items, counts), [counts])
  const skipped = useMemo(() => new Set(skippedIds), [skippedIds])

  const setCount = useCallback(
    (id: string, count: number) => {
      setCounts((current) => withCount(current, id, count))
      if (count > 0) setSkippedIds((current) => withoutId(current, id))
    },
    [setCounts, setSkippedIds],
  )

  const setSkipped = useCallback(
    (id: string, skip: boolean) => {
      setSkippedIds((current) =>
        skip ? (current.includes(id) ? current : [...current, id]) : withoutId(current, id),
      )
      if (skip) setCounts((current) => withCount(current, id, 0))
    },
    [setCounts, setSkippedIds],
  )

  const clear = useCallback(() => {
    setCounts({})
    setSkippedIds([])
  }, [setCounts, setSkippedIds])

  return { counts, owned, skipped, setCount, setSkipped, clear }
}

/** Hospital-bag items the user has packed. */
export function usePackedItems(): IdSet {
  return useIdSet(PACKED_STORAGE_KEY)
}
