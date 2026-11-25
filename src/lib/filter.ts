import type { Item, Priority, ReferencePurchase } from '../data/types'
import { normalizeText } from '../i18n/format'

export interface ItemFilters {
  readonly query: string
  /** Empty means "all priorities". */
  readonly priorities: readonly Priority[]
  /** Show only what is still missing: hide items the user has enough of or doesn't need. */
  readonly hideOwned: boolean
}

export const DEFAULT_FILTERS: ItemFilters = {
  query: '',
  priorities: [],
  hideOwned: false,
}

export interface FilterContext {
  readonly owned: ReadonlySet<string>
  readonly skipped: ReadonlySet<string>
  readonly references: ReadonlyMap<string, ReferencePurchase>
}

export function isFiltering(filters: ItemFilters): boolean {
  return filters.query.trim() !== '' || filters.priorities.length > 0 || filters.hideOwned
}

/** Searches both languages, the Greek search term and the reference product name. */
export function matchesQuery(item: Item, query: string, reference?: ReferencePurchase): boolean {
  const needle = normalizeText(query)
  if (needle === '') return true
  const haystack = [
    item.name.el,
    item.name.en,
    item.searchTerm,
    reference?.product.el ?? '',
    reference?.product.en ?? '',
  ]
    .map(normalizeText)
    .join(' ')
  return needle.split(/\s+/).every((word) => haystack.includes(word))
}

export function filterItems(
  items: readonly Item[],
  filters: ItemFilters,
  { owned, skipped, references }: FilterContext,
): Item[] {
  return items.filter((item) => {
    if (filters.priorities.length > 0 && !filters.priorities.includes(item.priority)) return false
    if (filters.hideOwned && (owned.has(item.id) || skipped.has(item.id))) return false
    return matchesQuery(item, filters.query, references.get(item.id))
  })
}

export function togglePriority(
  priorities: readonly Priority[],
  priority: Priority,
): readonly Priority[] {
  return priorities.includes(priority)
    ? priorities.filter((p) => p !== priority)
    : [...priorities, priority]
}
