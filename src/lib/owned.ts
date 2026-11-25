import type { Item } from '../data/types'

/** How many of each shopping-list item the user has, by item id. Missing means none. */
export type OwnedCounts = Readonly<Record<string, number>>

/** The stepper won't go past this, so a stray key press can't produce silly numbers. */
export const MAX_COUNT = 99

/** Items you buy more than one of get a counter instead of a single tick. */
export function isCountable(item: Item): boolean {
  return item.quantity.max > 1
}

/** How many you need before the item counts as done: the low end of the recommended range. */
export function neededQuantity(item: Item): number {
  return item.quantity.min
}

/** True once the user has at least the needed quantity. */
export function hasEnough(item: Item, count: number): boolean {
  return count >= neededQuantity(item)
}

/** Units beyond the top of the recommended range. */
export function extraCount(item: Item, count: number): number {
  return Math.max(0, count - item.quantity.max)
}

/** Whole numbers from 0 to `MAX_COUNT`; anything else (NaN, negatives, fractions) is coerced. */
export function clampCount(count: number): number {
  if (!Number.isFinite(count)) return 0
  return Math.min(MAX_COUNT, Math.max(0, Math.floor(count)))
}

/** Returns `counts` with `id` set to `count`, dropping the key at zero. */
export function withCount(counts: OwnedCounts, id: string, count: number): OwnedCounts {
  const next = clampCount(count)
  if ((counts[id] ?? 0) === next) return counts
  if (next > 0) return { ...counts, [id]: next }
  return Object.fromEntries(Object.entries(counts).filter(([key]) => key !== id))
}

/** Validates stored counts; `undefined` means "unusable, start fresh". */
export function parseCounts(raw: unknown): OwnedCounts | undefined {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return undefined
  const counts: Record<string, number> = {}
  for (const [id, value] of Object.entries(raw)) {
    if (typeof value !== 'number') return undefined
    const count = clampCount(value)
    if (count > 0) counts[id] = count
  }
  return counts
}

/**
 * Converts the old tick list (`["bottles", …]`) to counts: a ticked item had "enough",
 * so it gets its needed quantity. Unknown ids are dropped.
 */
export function countsFromTicks(raw: unknown, items: readonly Item[]): OwnedCounts | undefined {
  if (!Array.isArray(raw)) return undefined
  const ticked = new Set(raw.filter((id): id is string => typeof id === 'string'))
  const counts: Record<string, number> = {}
  for (const item of items) {
    if (ticked.has(item.id)) counts[item.id] = neededQuantity(item)
  }
  return counts
}

/** Ids of the items the user has enough of. */
export function completeIds(items: readonly Item[], counts: OwnedCounts): Set<string> {
  return new Set(
    items.filter((item) => hasEnough(item, counts[item.id] ?? 0)).map((item) => item.id),
  )
}
