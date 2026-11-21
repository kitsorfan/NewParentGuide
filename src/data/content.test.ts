import { describe, expect, it } from 'vitest'
import { LANGS, type Localized } from '../i18n/types'
import type { AgeRange } from '../lib/age'
import { addAge, daysBetween } from '../lib/dates'
import {
  breastfeedingRedFlags,
  enoughSigns,
  expressingCards,
  feedingPositions,
  feedingProblems,
  firstDaysCards,
  latchSigns,
  latchSteps,
  milkStorage,
  motherCards,
  nappyChart,
  POO_KINDS,
  stomachSizes,
  supportContacts,
} from './breastfeeding'
import { healthSources, healthVisits, paperwork, vaccineColumns, vaccineRows } from './health'
import { bagGroups, bagTips } from './hospitalBag'
import { items } from './items'
import { lookFor } from './lookFor'
import {
  bedSharing,
  parentCards,
  roomTips,
  safeSleepDonts,
  safeSleepDos,
  safeSleepRules,
  settlingCards,
  sleepBands,
  sleepRedFlags,
  togBands,
} from './sleep'
import { sources } from './sources'
import { stages, STAGE_TOPICS } from './stages'
import { tips } from './tips'
import { CARD_ICONS, type InfoCard } from './types'

function expectLocalized(text: Localized | undefined, where: string) {
  if (text === undefined) return
  for (const lang of LANGS) expect(text[lang]?.trim(), `${where} [${lang}]`).toBeTruthy()
}

function expectCards(cards: readonly InfoCard[]) {
  expect(unique(cards.map((card) => card.id))).toBe(true)
  for (const card of cards) {
    expect(CARD_ICONS).toContain(card.icon)
    expectLocalized(card.title, card.id)
    expect(card.points.length, card.id).toBeGreaterThan(0)
    card.points.forEach((point) => expectLocalized(point, card.id))
  }
}

/** Ranges start at birth and each one starts where the previous one ended. */
function expectContiguous(ranges: readonly AgeRange[]) {
  expect(dayOf(ranges[0]?.from ?? {})).toBe(0)
  const ends = ranges.slice(0, -1).map((range) => dayOf(range.to))
  const starts = ranges.slice(1).map((range) => dayOf(range.from))
  expect(starts).toEqual(ends)
  for (const range of ranges) expect(dayOf(range.to), range.id).toBeGreaterThan(dayOf(range.from))
}

const unique = (values: readonly string[]) => new Set(values).size === values.length
const doses = (id: string) => vaccineRows.find((row) => row.id === id)?.doses
const itemIds = new Set(items.map((item) => item.id))
const origin = new Date(2027, 0, 15)
const dayOf = (offset: Parameters<typeof addAge>[1]) => daysBetween(origin, addAge(origin, offset))

describe('age guide (stages)', () => {
  it('is complete, ordered and contiguous', () => {
    expect(unique(stages.map((stage) => stage.id))).toBe(true)
    for (const stage of stages) {
      expectLocalized(stage.title, stage.id)
      expectLocalized(stage.intro, stage.id)
      expectLocalized(stage.ageLabel, stage.id)
      expect(stage.redFlags.length, stage.id).toBeGreaterThan(0)
      stage.redFlags.forEach((flag) => expectLocalized(flag, `${stage.id} red flag`))
      for (const topic of stage.topics) {
        expect(STAGE_TOPICS).toContain(topic.id)
        topic.points.forEach((point) => expectLocalized(point, `${stage.id}.${topic.id}`))
      }
    }
    // Each stage starts where the previous one ended.
    const ends = stages.slice(0, -1).map((stage) => dayOf(stage.to))
    const starts = stages.slice(1).map((stage) => dayOf(stage.from))
    expect(starts).toEqual(ends)
  })

  it('splits tips between the shopping list and the guide', () => {
    expect(tips.some((tip) => tip.page === 'checklist')).toBe(true)
    expect(tips.some((tip) => tip.page === 'guide')).toBe(true)
  })
})

describe('sleep guide', () => {
  it('has complete text in both languages', () => {
    expect(unique(safeSleepRules.map((rule) => rule.id))).toBe(true)
    for (const rule of safeSleepRules) {
      expect(CARD_ICONS).toContain(rule.icon)
      expectLocalized(rule.title, rule.id)
      expectLocalized(rule.text, rule.id)
    }
    for (const list of [safeSleepDos, safeSleepDonts, roomTips, sleepRedFlags]) {
      expect(list.length).toBeGreaterThan(0)
      list.forEach((text, index) => expectLocalized(text, `item ${index}`))
    }
    expectLocalized(bedSharing.title, 'bed sharing')
    expectLocalized(bedSharing.lead, 'bed sharing')
    ;[...bedSharing.points, ...bedSharing.never].forEach((text) => expectLocalized(text, 'bed'))
    expectCards(settlingCards)
    expectCards(parentCards)
  })

  it('covers the first year with contiguous age bands', () => {
    expect(unique(sleepBands.map((band) => band.id))).toBe(true)
    expectContiguous(sleepBands)
    expect(dayOf(sleepBands.at(-1)?.to ?? {})).toBe(dayOf({ months: 12 }))
    for (const band of sleepBands) {
      for (const text of [band.age, band.total, band.naps, band.awake, band.note]) {
        expectLocalized(text, band.id)
      }
    }
  })

  it('lists sleeping-bag TOGs from the warmest room to the coldest', () => {
    const togs = togBands.map((band) => band.tog)
    expect(togs).toEqual(togs.toSorted((a, b) => a - b))
    // The recommended 16–20 °C room is a 2.5 TOG bag, as in the winter tips.
    expect(togBands.find((band) => band.id === 'cool')?.tog).toBe(2.5)
    togBands.forEach((band) => expectLocalized(band.wear, band.id))
  })

  it('never contradicts the core safe-sleep rules', () => {
    expect(safeSleepRules.map((rule) => rule.id)).toEqual(['back', 'alone', 'clear'])
    expect(sleepRedFlags.some((flag) => flag.el.includes('166'))).toBe(true)
  })
})

describe('breastfeeding guide', () => {
  it('has complete text in both languages', () => {
    expectCards(firstDaysCards)
    expectCards(expressingCards)
    expectCards(motherCards)
    for (const list of [latchSteps, latchSigns, enoughSigns, breastfeedingRedFlags]) {
      expect(list.length).toBeGreaterThan(0)
      list.forEach((text, index) => expectLocalized(text, `item ${index}`))
    }
    for (const position of feedingPositions) {
      expectLocalized(position.name, position.id)
      expectLocalized(position.text, position.id)
    }
    for (const problem of feedingProblems) {
      expectLocalized(problem.title, problem.id)
      expectLocalized(problem.signs, problem.id)
      expectLocalized(problem.doctor, problem.id)
      expect(problem.helps.length, problem.id).toBeGreaterThan(0)
      problem.helps.forEach((help) => expectLocalized(help, problem.id))
    }
    for (const rule of milkStorage) {
      expect(CARD_ICONS).toContain(rule.icon)
      for (const text of [rule.place, rule.temperature, rule.time, rule.note]) {
        expectLocalized(text, rule.id)
      }
    }
  })

  it('draws bigger stomachs as baby grows', () => {
    const sizes = stomachSizes.map((size) => size.size)
    expect(sizes).toEqual(sizes.toSorted((a, b) => a - b))
    stomachSizes.forEach((size) => expectLocalized(size.like, size.id))
  })

  it('has a contiguous nappy chart where wet nappies only go up', () => {
    expect(unique(nappyChart.map((row) => row.id))).toBe(true)
    expectContiguous(nappyChart)
    const wet = nappyChart.map((row) => row.wet)
    expect(wet).toEqual(wet.toSorted((a, b) => a - b))
    // NHS: at least 6 heavy wet nappies a day from the end of the first week.
    expect(nappyChart.at(-1)?.wet).toBe(6)
    for (const row of nappyChart) {
      expect(POO_KINDS).toContain(row.poo)
      expectLocalized(row.wetText, row.id)
      expectLocalized(row.pooText, row.id)
    }
  })

  it('lists the Greek helpline and links only to sources on the Sources page', () => {
    expect(supportContacts.find((contact) => contact.id === 'alkyoni')?.phone).toBe('10525')
    const sourceUrls = new Set(sources.map((source) => source.url))
    for (const contact of supportContacts) {
      expectLocalized(contact.name, contact.id)
      expectLocalized(contact.detail, contact.id)
    }
    const linked = supportContacts.flatMap((contact) => (contact.url ? [contact.url] : []))
    expect(linked.length).toBeGreaterThan(0)
    expect(linked.filter((url) => !sourceUrls.has(url))).toEqual([])
    expect(sources.filter((source) => source.topic === 'breastfeeding').length).toBeGreaterThan(5)
  })
})

describe('health schedule', () => {
  it('has visits in chronological order with unique event ids', () => {
    const starts = healthVisits.map((visit) => addAge(origin, visit.offset).getTime())
    expect(starts).toEqual(starts.toSorted((a, b) => a - b))
    const eventIds = healthVisits.flatMap((visit) => visit.events.map((event) => event.id))
    expect(unique(eventIds)).toBe(true)
    for (const visit of healthVisits) {
      expectLocalized(visit.age, visit.id)
      for (const event of visit.events) {
        expectLocalized(event.title, event.id)
        expectLocalized(event.detail, event.id)
      }
    }
    // Windows (e.g. pregnancy vaccines) must end after they start.
    const windowLengths = healthVisits.flatMap((visit) =>
      visit.until ? [daysBetween(addAge(origin, visit.offset), addAge(origin, visit.until))] : [],
    )
    expect(windowLengths.length).toBeGreaterThan(0)
    expect(windowLengths.every((days) => days > 0)).toBe(true)
  })

  it('puts every vaccine dose in a known column', () => {
    const columns = new Set(vaccineColumns.map((column) => column.id))
    for (const row of vaccineRows) {
      expectLocalized(row.name, row.id)
      expect(row.doses.length, row.id).toBeGreaterThan(0)
      for (const dose of row.doses) expect(columns.has(dose), `${row.id}:${dose}`).toBe(true)
    }
  })

  it('follows the 2026 schedule for the core infant vaccines', () => {
    expect(doses('hexa')).toEqual(['2m', '4m', '6m'])
    expect(doses('pcv')).toEqual(['2m', '4m', '12m'])
    expect(doses('menb')).toEqual(['2m', '4m', '12m'])
    expect(doses('menc')).toEqual(['10m'])
    expect(doses('mmr')).toEqual(['12m', '2y'])
  })

  it('has complete paperwork and official https sources', () => {
    paperwork.forEach((event) => expectLocalized(event.detail, event.id))
    expect(unique(healthSources.map((source) => source.url))).toBe(true)
    for (const source of healthSources) {
      expect(new URL(source.url).protocol).toBe('https:')
      expectLocalized(source.title, source.id)
    }
  })
})

describe('hospital bag', () => {
  it('has unique ids and complete text', () => {
    expect(unique(bagGroups.map((group) => group.id))).toBe(true)
    bagTips.forEach((tip, index) => expectLocalized(tip, `tip ${index}`))
    for (const group of bagGroups) {
      expectLocalized(group.title, group.id)
      expect(unique(group.items.map((entry) => entry.id)), group.id).toBe(true)
      for (const entry of group.items) {
        expectLocalized(entry.name, `${group.id}/${entry.id}`)
        expectLocalized(entry.note, `${group.id}/${entry.id}`)
      }
    }
  })

  it('links only to items that exist on the shopping list', () => {
    const linked = bagGroups.flatMap((group) =>
      group.items.flatMap((entry) => (entry.itemId ? [entry.itemId] : [])),
    )
    expect(linked.length).toBeGreaterThan(0)
    expect(linked.filter((id) => !itemIds.has(id))).toEqual([])
  })
})

describe('what to look for', () => {
  it('only describes existing items, in both languages', () => {
    for (const [id, features] of Object.entries(lookFor)) {
      expect(itemIds.has(id), id).toBe(true)
      expect(features?.length, id).toBeGreaterThan(0)
      features?.forEach((feature, index) => expectLocalized(feature, `${id}[${index}]`))
    }
  })

  it('covers the big-ticket and safety items', () => {
    for (const id of ['crib', 'crib-mattress', 'bassinet', 'travel-system', 'car-seat']) {
      expect(lookFor[id], id).toBeDefined()
    }
    expect(lookFor.bassinet?.some((feature) => /κουνουπιέρα/i.test(feature.el))).toBe(true)
  })
})
