import { PRIORITIES, type Item, type Priority } from '../data/types'

export interface Estimate {
  readonly min: number
  readonly max: number
  readonly typical: number
}

export const ZERO_ESTIMATE: Estimate = { min: 0, max: 0, typical: 0 }

/** The quantity used for "typical" totals: the middle of the range, rounded. */
export function typicalQuantity(item: Item): number {
  return Math.round((item.quantity.min + item.quantity.max) / 2)
}

/** Cost of an item at its recommended quantity: cheapest, priciest and typical. */
export function itemEstimate(item: Item): Estimate {
  return {
    min: item.quantity.min * item.price.min,
    max: item.quantity.max * item.price.max,
    typical: typicalQuantity(item) * item.price.typical,
  }
}

export function addEstimates(a: Estimate, b: Estimate): Estimate {
  return { min: a.min + b.min, max: a.max + b.max, typical: a.typical + b.typical }
}

/** Sums the items that count towards the budget (alternatives/conditional items are skipped). */
export function sumEstimates(items: readonly Item[]): Estimate {
  return items
    .filter((item) => item.countInBudget !== false)
    .map(itemEstimate)
    .reduce(addEstimates, ZERO_ESTIMATE)
}

/**
 * What is still left to spend on an item when the user already has `count` of it: nothing once
 * they have enough, otherwise the estimate for the units still missing.
 */
export function remainingEstimate(item: Item, count: number): Estimate {
  if (count <= 0) return itemEstimate(item)
  if (count >= item.quantity.min) return ZERO_ESTIMATE
  return {
    min: (item.quantity.min - count) * item.price.min,
    max: (item.quantity.max - count) * item.price.max,
    typical: Math.max(0, typicalQuantity(item) - count) * item.price.typical,
  }
}

/** Sums `remainingEstimate` over the items that count towards the budget. */
export function sumRemaining(
  items: readonly Item[],
  counts: Readonly<Record<string, number>>,
): Estimate {
  return items
    .filter((item) => item.countInBudget !== false)
    .map((item) => remainingEstimate(item, counts[item.id] ?? 0))
    .reduce(addEstimates, ZERO_ESTIMATE)
}

export interface BudgetTier {
  /** The lowest priority included in this tier. */
  readonly upTo: Priority
  readonly estimate: Estimate
  readonly itemCount: number
}

/**
 * Cumulative budgets: essentials only → essentials + recommended → everything.
 */
export function budgetTiers(items: readonly Item[]): BudgetTier[] {
  return PRIORITIES.map((upTo, index) => {
    const included = new Set(PRIORITIES.slice(0, index + 1))
    const tierItems = items.filter((item) => included.has(item.priority))
    return { upTo, estimate: sumEstimates(tierItems), itemCount: tierItems.length }
  })
}
