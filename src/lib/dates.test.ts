import { describe, expect, it } from 'vitest'
import { stages } from '../data/stages'
import { messages } from '../i18n/messages'
import { currentRangeId, describeAge } from './age'
import { addAge, daysBetween, formatDate, parseIsoDate, toIsoDate } from './dates'

describe('dates', () => {
  it('parses and formats ISO dates without time-zone drift', () => {
    expect(toIsoDate(parseIsoDate('2027-01-15'))).toBe('2027-01-15')
  })

  it('adds days, weeks and months', () => {
    const birth = parseIsoDate('2027-01-15')
    expect(toIsoDate(addAge(birth, { weeks: 2 }))).toBe('2027-01-29')
    expect(toIsoDate(addAge(birth, { months: 2 }))).toBe('2027-03-15')
    expect(toIsoDate(addAge(birth, { weeks: -13 }))).toBe('2026-10-16')
  })

  it('clamps month overflow to the end of the month', () => {
    expect(toIsoDate(addAge(parseIsoDate('2027-01-31'), { months: 1 }))).toBe('2027-02-28')
  })

  it('counts days between dates', () => {
    expect(daysBetween(parseIsoDate('2027-01-01'), parseIsoDate('2027-03-01'))).toBe(59)
  })

  it('formats in both languages', () => {
    const date = parseIsoDate('2027-01-15')
    expect(formatDate(date, 'en')).toBe('15 Jan 2027')
    expect(formatDate(date, 'el')).toMatch(/15 Ιαν 2027/)
  })
})

describe('describeAge', () => {
  const t = messages.en
  const today = parseIsoDate('2027-03-01')

  it('counts down to the due date', () => {
    expect(describeAge('2027-03-06', today, t)).toBe('~5 days until the due date')
    expect(describeAge('2027-04-26', today, t)).toBe('~8 weeks until the due date')
  })

  it('describes the age in days, weeks or months', () => {
    expect(describeAge('2027-02-25', today, t)).toBe('Baby is 4 days old')
    expect(describeAge('2027-01-15', today, t)).toBe('Baby is 6 weeks old')
    expect(describeAge('2026-09-01', today, t)).toBe('Baby is 5 months old')
  })
})

describe('currentRangeId', () => {
  const today = parseIsoDate('2027-03-01')

  it('finds the stage for the baby’s age', () => {
    expect(currentRangeId(stages, '2027-02-25', today)).toBe('first-2-weeks')
    expect(currentRangeId(stages, '2027-02-08', today)).toBe('first-month')
    expect(currentRangeId(stages, '2027-01-15', today)).toBe('months-1-3')
    expect(currentRangeId(stages, '2026-08-01', today)).toBe('months-6-12')
  })

  it('returns nothing before birth, without a date, or after the last stage', () => {
    expect(currentRangeId(stages, '2027-04-01', today)).toBeUndefined()
    expect(currentRangeId(stages, undefined, today)).toBeUndefined()
    expect(currentRangeId(stages, '2025-01-01', today)).toBeUndefined()
  })
})
