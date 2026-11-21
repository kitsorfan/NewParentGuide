import { useIdSet, type IdSet } from './useIdSet'

export const OWNED_STORAGE_KEY = 'npg.owned.v1'
export const PACKED_STORAGE_KEY = 'npg.bag.v1'

export type OwnedItems = IdSet

/** Shopping-list items the user has ticked as "I have it". */
export function useOwnedItems(): OwnedItems {
  return useIdSet(OWNED_STORAGE_KEY)
}

/** Hospital-bag items the user has packed. */
export function usePackedItems(): IdSet {
  return useIdSet(PACKED_STORAGE_KEY)
}
