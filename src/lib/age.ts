import { interpolate } from '../i18n/format'
import type { Messages } from '../i18n/messages'
import { addAge, daysBetween, parseIsoDate, type AgeOffset } from './dates'

/** Anything that covers a span of the baby's age: guide stages, sleep bands, nappy-chart rows. */
export interface AgeRange {
  readonly id: string
  readonly from: AgeOffset
  /** Exclusive. */
  readonly to: AgeOffset
}

/** "Baby is 3 weeks old" / "~6 weeks until the due date". */
export function describeAge(birthDate: string, today: Date, t: Messages): string {
  const days = daysBetween(parseIsoDate(birthDate), today)
  if (days < 0) {
    const left = -days
    return left < 14
      ? interpolate(t.dueInDays, { count: left })
      : interpolate(t.dueInWeeks, { count: Math.round(left / 7) })
  }
  if (days < 14) return interpolate(t.babyAgeDays, { count: days })
  if (days < 91) return interpolate(t.babyAgeWeeks, { count: Math.floor(days / 7) })
  return interpolate(t.babyAgeMonths, { count: Math.floor(days / 30.44) })
}

/** The range the baby is in today, or `undefined` before birth / after the last range. */
export function currentRangeId(
  ranges: readonly AgeRange[],
  birthDate: string | undefined,
  today: Date,
): string | undefined {
  if (!birthDate) return undefined
  const birth = parseIsoDate(birthDate)
  if (daysBetween(birth, today) < 0) return undefined
  return ranges.find(
    (range) =>
      daysBetween(addAge(birth, range.from), today) >= 0 &&
      daysBetween(today, addAge(birth, range.to)) > 0,
  )?.id
}
