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
