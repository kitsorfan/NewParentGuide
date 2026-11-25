import { describe, expect, it } from 'vitest'
import type { Item } from '../data/types'
import {
  budgetTiers,
  itemEstimate,
  remainingEstimate,
  sumEstimates,
  sumRemaining,
  typicalQuantity,
} from './budget'

function makeItem(overrides: Partial<Item> & Pick<Item, 'id'>): Item {
  return {
    category: 'feeding',
    priority: 'essential',
    timing: 'beforeBirth',
    name: { el: overrides.id, en: overrides.id },
    why: { el: 'γιατί', en: 'why' },
    quantity: { min: 1, max: 1 },
    unit: 'piece',
    price: { min: 10, max: 20, typical: 15 },
    searchTerm: overrides.id,
    ...overrides,
  }
}

const bottles = makeItem({
  id: 'bottles',
  quantity: { min: 3, max: 6 },
  price: { min: 6, max: 15, typical: 9 },
})
const sterilizer = makeItem({ id: 'sterilizer', priority: 'recommended' })
const bouncer = makeItem({
  id: 'bouncer',
  priority: 'optional',
  price: { min: 40, max: 200, typical: 80 },
})
const carSeat = makeItem({
  id: 'car-seat',
  price: { min: 100, max: 300, typical: 180 },
  countInBudget: false,
})

describe('itemEstimate', () => {
  it('multiplies quantity and price bounds', () => {
    expect(typicalQuantity(bottles)).toBe(5) // round(4.5)
    expect(itemEstimate(bottles)).toEqual({ min: 18, max: 90, typical: 45 })
  })
})

describe('sumEstimates', () => {
  it('adds items and skips the ones excluded from the budget', () => {
    expect(sumEstimates([bottles, sterilizer, carSeat])).toEqual({
      min: 28,
      max: 110,
      typical: 60,
    })
  })

  it('returns zero for an empty list', () => {
    expect(sumEstimates([])).toEqual({ min: 0, max: 0, typical: 0 })
  })
})

describe('remainingEstimate / sumRemaining', () => {
  it('only counts the units still missing, and nothing once there are enough', () => {
    // Bottles 3–6 at 6/15/9 €, typical quantity 5.
    expect(remainingEstimate(bottles, 0)).toEqual(itemEstimate(bottles))
    expect(remainingEstimate(bottles, 1)).toEqual({ min: 12, max: 75, typical: 36 })
    expect(remainingEstimate(bottles, 3)).toEqual({ min: 0, max: 0, typical: 0 })
  })

  it('skips the items excluded from the budget', () => {
    expect(sumRemaining([bottles, sterilizer, carSeat], { bottles: 1, sterilizer: 1 })).toEqual({
      min: 12,
      max: 75,
      typical: 36,
    })
  })
})

describe('budgetTiers', () => {
  it('builds cumulative tiers: essentials → + recommended → everything', () => {
    const tiers = budgetTiers([bottles, sterilizer, bouncer, carSeat])
    expect(tiers.map((tier) => tier.upTo)).toEqual(['essential', 'recommended', 'optional'])
    expect(tiers.map((tier) => tier.itemCount)).toEqual([2, 3, 4])
    expect(tiers.map((tier) => tier.estimate.typical)).toEqual([45, 60, 140])
  })
})
