import type { Lang } from '../i18n/types'

/** An age offset from birth. */
export interface AgeOffset {
  readonly days?: number
  readonly weeks?: number
  readonly months?: number
}

/** Parses `YYYY-MM-DD` as a local calendar date (no time-zone shifts). */
export function parseIsoDate(iso: string): Date {
  const [year = 0, month = 1, day = 1] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addAge(birth: Date, { days = 0, weeks = 0, months = 0 }: AgeOffset): Date {
  const result = new Date(birth.getFullYear(), birth.getMonth() + months, birth.getDate())
  // Adding months to e.g. 31 Jan overflows into March; clamp to the month's last day instead.
  if (months !== 0 && result.getDate() !== birth.getDate()) result.setDate(0)
  result.setDate(result.getDate() + days + weeks * 7)
  return result
}

const utc = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
const pad = (n: number) => String(n).padStart(2, '0')

/** Whole days between two dates (b − a), ignoring daylight-saving shifts. */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((utc(b) - utc(a)) / 86_400_000)
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'el' ? 'el-GR' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
