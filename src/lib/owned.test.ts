import { describe, expect, it } from 'vitest'
import type { Item } from '../data/types'
import {
  MAX_COUNT,
  clampCount,
  completeIds,
  countsFromTicks,
  extraCount,
  hasEnough,
  isCountable,
  parseCounts,
  withCount,
} from './owned'

function makeItem(id: string, min: number, max: number): Item {
  return {
    id,
    category: 'clothing',
    priority: 'essential',
    timing: 'beforeBirth',
    name: { el: id, en: id },
    why: { el: 'γιατί', en: 'why' },
    quantity: { min, max },
    unit: 'piece',
    price: { min: 5, max: 10, typical: 8 },
    searchTerm: id,
  }
}

const bodysuits = makeItem('bodysuits', 7, 10)
const crib = makeItem('crib', 1, 1)

describe('owned counts', () => {
  it('uses a counter only for items bought in quantity', () => {
    expect(isCountable(bodysuits)).toBe(true)
    expect(isCountable(crib)).toBe(false)
  })

  it('is done at the low end of the range, and extra past the top', () => {
    expect(hasEnough(bodysuits, 6)).toBe(false)
    expect(hasEnough(bodysuits, 7)).toBe(true)
    expect(extraCount(bodysuits, 10)).toBe(0)
    expect(extraCount(bodysuits, 12)).toBe(2)
  })

  it('clamps counts to whole numbers from 0 to the maximum', () => {
    expect(clampCount(-3)).toBe(0)
    expect(clampCount(2.7)).toBe(2)
    expect(clampCount(Number.NaN)).toBe(0)
    expect(clampCount(1000)).toBe(MAX_COUNT)
  })

  it('sets a count and drops the key at zero', () => {
    const counts = withCount({}, 'bodysuits', 3)
    expect(counts).toEqual({ bodysuits: 3 })
    expect(withCount(counts, 'bodysuits', 3)).toBe(counts)
    expect(withCount(counts, 'bodysuits', 0)).toEqual({})
  })

  it('validates stored counts', () => {
    expect(parseCounts({ bodysuits: 3, crib: 0 })).toEqual({ bodysuits: 3 })
    expect(parseCounts({ bodysuits: '3' })).toBeUndefined()
    expect(parseCounts(['bodysuits'])).toBeUndefined()
    expect(parseCounts(null)).toBeUndefined()
  })

  it('turns old ticks into "enough" and skips unknown ids', () => {
    expect(countsFromTicks(['bodysuits', 'crib', 'gone'], [bodysuits, crib])).toEqual({
      bodysuits: 7,
      crib: 1,
    })
    expect(countsFromTicks('nope', [crib])).toBeUndefined()
  })

  it('lists the items the user has enough of', () => {
    expect(completeIds([bodysuits, crib], { bodysuits: 4, crib: 1 })).toEqual(new Set(['crib']))
  })
})
