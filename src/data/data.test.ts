import { describe, expect, it } from 'vitest'
import { LANGS, type Localized } from '../i18n/types'
import { avoidList } from './avoid'
import { categories } from './categories'
import { items } from './items'
import { REFERENCE_ORDER_TOTAL, referenceOrder } from './referenceOrder'
import { sources } from './sources'
import { tips } from './tips'
import { CATEGORY_IDS, PRIORITIES, TIMINGS, UNITS } from './types'

function expectLocalized(text: Localized | undefined, where: string) {
  if (text === undefined) return
  for (const lang of LANGS) {
    expect(text[lang]?.trim(), `${where} [${lang}]`).toBeTruthy()
  }
}

const unique = (values: readonly string[]) => new Set(values).size === values.length

describe('items', () => {
  it('have unique ids', () => {
    expect(unique(items.map((item) => item.id))).toBe(true)
  })

  it.each(items.map((item) => [item.id, item] as const))(
    '%s is complete and consistent',
    (id, item) => {
      expect(CATEGORY_IDS).toContain(item.category)
      expect(PRIORITIES).toContain(item.priority)
      expect(TIMINGS).toContain(item.timing)
      expect(UNITS).toContain(item.unit)

      expectLocalized(item.name, `${id}.name`)
      expectLocalized(item.why, `${id}.why`)
      expectLocalized(item.tip, `${id}.tip`)
      expectLocalized(item.condition, `${id}.condition`)
      expectLocalized(item.priceNote, `${id}.priceNote`)
      expect(item.searchTerm.trim()).not.toBe('')

      expect(item.quantity.min).toBeGreaterThan(0)
      expect(item.quantity.max).toBeGreaterThanOrEqual(item.quantity.min)
      expect(item.price.min).toBeGreaterThan(0)
      expect(item.price.typical).toBeGreaterThanOrEqual(item.price.min)
      expect(item.price.max).toBeGreaterThanOrEqual(item.price.typical)
    },
  )

  it('cover every category', () => {
    for (const category of categories) {
      expect(
        items.some((item) => item.category === category.id),
        category.id,
      ).toBe(true)
    }
  })

  it('include the safety-critical basics as essential', () => {
    const essential = new Set(
      items.filter((item) => item.priority === 'essential').map((item) => item.id),
    )
    for (const id of ['car-seat', 'crib', 'crib-mattress', 'fitted-sheets', 'thermometer']) {
      expect(essential.has(id), id).toBe(true)
    }
  })
})

describe('categories', () => {
  it('match the declared ids, in order', () => {
    expect(categories.map((category) => category.id)).toEqual([...CATEGORY_IDS])
    for (const category of categories) {
      expectLocalized(category.name, `${category.id}.name`)
      expectLocalized(category.intro, `${category.id}.intro`)
    }
  })
})

describe('reference order (PDF)', () => {
  const itemIds = new Set(items.map((item) => item.id))

  it('maps every line to a known item, once', () => {
    for (const purchase of referenceOrder) {
      expect(itemIds.has(purchase.itemId), purchase.itemId).toBe(true)
      expectLocalized(purchase.product, purchase.itemId)
    }
    expect(unique(referenceOrder.map((purchase) => purchase.itemId))).toBe(true)
  })

  it('has line totals consistent with quantity × unit price', () => {
    for (const purchase of referenceOrder) {
      // The shop rounds unit prices, so allow a cent of difference.
      expect(
        Math.abs(purchase.quantity * purchase.unitPrice - purchase.lineTotal),
        purchase.itemId,
      ).toBeLessThanOrEqual(0.011)
    }
  })

  it('adds up to the order total printed on the PDF', () => {
    const cents = referenceOrder.reduce(
      (sum, purchase) => sum + Math.round(purchase.lineTotal * 100),
      0,
    )
    expect(cents / 100).toBe(REFERENCE_ORDER_TOTAL)
    expect(referenceOrder).toHaveLength(18)
  })
})

describe('avoid list, tips and sources', () => {
  it('are complete', () => {
    expect(unique(avoidList.map((entry) => entry.id))).toBe(true)
    for (const entry of avoidList) {
      expectLocalized(entry.name, entry.id)
      expectLocalized(entry.why, entry.id)
    }
    for (const tip of tips) {
      expectLocalized(tip.title, tip.id)
      tip.points.forEach((point, index) => expectLocalized(point, `${tip.id}[${index}]`))
    }
  })

  it('link only to https URLs, without duplicates', () => {
    expect(unique(sources.map((source) => source.url))).toBe(true)
    for (const source of sources) {
      expect(new URL(source.url).protocol, source.id).toBe('https:')
      expectLocalized(source.title, source.id)
    }
  })
})
