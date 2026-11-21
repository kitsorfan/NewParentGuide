import { items } from '../data/items'
import { referenceOrder } from '../data/referenceOrder'
import type { CategoryId, Item, ReferencePurchase } from '../data/types'

/** The 2024 reference order, keyed by item id. */
export const references: ReadonlyMap<string, ReferencePurchase> = new Map(
  referenceOrder.map((purchase) => [purchase.itemId, purchase]),
)

export function groupByCategory(list: readonly Item[]): Map<CategoryId, Item[]> {
  const groups = new Map<CategoryId, Item[]>()
  for (const item of list) {
    const group = groups.get(item.category)
    if (group) group.push(item)
    else groups.set(item.category, [item])
  }
  return groups
}

export const itemsByCategory: ReadonlyMap<CategoryId, readonly Item[]> = groupByCategory(items)
