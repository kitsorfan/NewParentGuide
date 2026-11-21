import type { Localized } from '../i18n/types'

export const PRIORITIES = ['essential', 'recommended', 'optional'] as const
export type Priority = (typeof PRIORITIES)[number]

export const TIMINGS = ['beforeBirth', 'firstWeeks', 'later'] as const
export type Timing = (typeof TIMINGS)[number]

export const UNITS = ['piece', 'pack', 'pair', 'set', 'box'] as const
export type Unit = (typeof UNITS)[number]

export const CATEGORY_IDS = [
  'sleep',
  'travel',
  'feeding',
  'diapering',
  'bath',
  'health',
  'clothing',
  'mom',
  'play',
] as const
export type CategoryId = (typeof CATEGORY_IDS)[number]

export interface Category {
  readonly id: CategoryId
  readonly name: Localized
  readonly intro: Localized
}

export interface QuantityRange {
  readonly min: number
  readonly max: number
}

/** Price of ONE unit (see `Item.unit`) in euros. */
export interface PriceRange {
  readonly min: number
  readonly max: number
  /** A sensible mid-range choice, used for "typical" totals. */
  readonly typical: number
}

export interface Item {
  readonly id: string
  readonly category: CategoryId
  readonly priority: Priority
  readonly timing: Timing
  readonly name: Localized
  /** Shown in the hover hint: why this is worth buying. */
  readonly why: Localized
  /** Optional practical/safety advice, also shown in the hint. */
  readonly tip?: Localized
  /** Shown on the card when the item only applies in some situations. */
  readonly condition?: Localized
  readonly quantity: QuantityRange
  readonly unit: Unit
  readonly price: PriceRange
  /** Extra detail about the price, e.g. "manual 25–45 €, electric 80–200 €". */
  readonly priceNote?: Localized
  /** Greek search phrase used for the Skroutz link. */
  readonly searchTerm: string
  /** `false` for alternatives/conditional items so totals aren't double counted. */
  readonly countInBudget?: false
}

/** One line of the 2024 reference order (the PDF). */
export interface ReferencePurchase {
  readonly itemId: string
  readonly product: Localized
  readonly quantity: number
  /** Unit price in euros, as charged. */
  readonly unitPrice: number
  /** Line total as printed on the order. */
  readonly lineTotal: number
}

export interface AvoidEntry {
  readonly id: string
  readonly kind: 'safety' | 'money'
  readonly name: Localized
  readonly why: Localized
}

/** Icons a content card can show. Mapped to Lucide icons in src/components/icons.ts. */
export const CARD_ICONS = [
  'sleep',
  'winter',
  'hospital',
  'smart',
  'health',
  'baby',
  'bed',
  'shield',
  'sun',
  'eye',
  'bath',
  'noise',
  'phases',
  'rest',
  'crying',
  'skin',
  'droplet',
  'clock',
  'timer',
  'milk',
  'food',
  'coffee',
  'pill',
  'calendar',
  'work',
  'home',
  'bag',
  'fridge',
  'freezer',
] as const
export type CardIcon = (typeof CARD_ICONS)[number]

/** A titled list of points, shown as a card. */
export interface InfoCard {
  readonly id: string
  readonly icon: CardIcon
  readonly title: Localized
  readonly points: readonly Localized[]
}

export interface Tip extends InfoCard {
  /** Which page shows the tip. */
  readonly page: 'checklist' | 'guide'
}

export const SOURCE_TOPICS = [
  'sleep',
  'breastfeeding',
  'car',
  'feeding',
  'health',
  'development',
  'prices',
] as const
export type SourceTopic = (typeof SOURCE_TOPICS)[number]

export interface Source {
  readonly id: string
  readonly topic: SourceTopic
  readonly title: Localized
  readonly publisher: string
  readonly url: string
  readonly lang: 'el' | 'en'
}

/** Credit for an openly licensed item photo. */
export interface PhotoCredit {
  /** Path relative to the site root, e.g. `images/items/bottles.webp`. */
  readonly file: string
  readonly title: string
  readonly creator: string
  readonly license: string
  /** Empty for photos without an open licence (© the owner). */
  readonly licenseUrl: string
  readonly sourceUrl: string
}
