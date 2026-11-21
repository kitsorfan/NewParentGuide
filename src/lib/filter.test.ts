import { describe, expect, it } from 'vitest'
import { items } from '../data/items'
import { referenceOrder } from '../data/referenceOrder'
import type { ReferencePurchase } from '../data/types'
import { DEFAULT_FILTERS, filterItems, isFiltering, matchesQuery, togglePriority } from './filter'

const references: ReadonlyMap<string, ReferencePurchase> = new Map(
  referenceOrder.map((purchase) => [purchase.itemId, purchase]),
)
const noneOwned = { owned: new Set<string>(), references }
const ids = (list: readonly { id: string }[]) => list.map((item) => item.id)

describe('filterItems', () => {
  it('returns everything with the default filters', () => {
    expect(filterItems(items, DEFAULT_FILTERS, noneOwned)).toHaveLength(items.length)
    expect(isFiltering(DEFAULT_FILTERS)).toBe(false)
  })

  it('filters by one or more priorities', () => {
    const essentials = filterItems(
      items,
      { ...DEFAULT_FILTERS, priorities: ['essential'] },
      noneOwned,
    )
    expect(essentials.length).toBeGreaterThan(0)
    expect(essentials.every((item) => item.priority === 'essential')).toBe(true)

    const both = filterItems(
      items,
      { ...DEFAULT_FILTERS, priorities: ['essential', 'optional'] },
      noneOwned,
    )
    expect(both.some((item) => item.priority === 'recommended')).toBe(false)
    expect(both.length).toBeGreaterThan(essentials.length)
  })

  it('searches Greek without accents, and English', () => {
    expect(ids(filterItems(items, { ...DEFAULT_FILTERS, query: 'ΜΠΙΜΠΕΡΟ' }, noneOwned))).toContain(
      'bottles',
    )
    expect(ids(filterItems(items, { ...DEFAULT_FILTERS, query: 'bottle' }, noneOwned))).toContain(
      'bottles',
    )
  })

  it('searches the reference product name too', () => {
    expect(ids(filterItems(items, { ...DEFAULT_FILTERS, query: 'nammas' }, noneOwned))).toEqual([
      'travel-system',
    ])
  })

  it('hides owned items on request', () => {
    const owned = new Set(['bottles'])
    const visible = filterItems(
      items,
      { ...DEFAULT_FILTERS, hideOwned: true },
      { owned, references },
    )
    expect(ids(visible)).not.toContain('bottles')
  })
})

describe('matchesQuery', () => {
  it('requires every word to match', () => {
    const bottles = items.find((item) => item.id === 'bottles')
    expect(bottles).toBeDefined()
    if (!bottles) return
    expect(matchesQuery(bottles, '  ')).toBe(true)
    expect(matchesQuery(bottles, 'baby bottles')).toBe(true)
    expect(matchesQuery(bottles, 'bottles pram')).toBe(false)
  })
})

describe('togglePriority', () => {
  it('adds and removes a priority', () => {
    expect(togglePriority([], 'essential')).toEqual(['essential'])
    expect(togglePriority(['essential', 'optional'], 'essential')).toEqual(['optional'])
  })
})
