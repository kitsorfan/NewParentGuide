import type { Lang } from './types'

const LOCALES: Record<Lang, string> = { el: 'el-GR', en: 'en-IE' }

/** Replaces `{name}` placeholders with the matching param. Unknown placeholders are left as-is. */
export function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  )
}

function numberFormatter(lang: Lang, decimals: boolean): Intl.NumberFormat {
  return new Intl.NumberFormat(LOCALES[lang], {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  })
}

/** Formats an amount as euros, e.g. `26,99 €` (el) or `€26.99` (en). Whole amounts drop decimals. */
export function formatEuro(amount: number, lang: Lang): string {
  const decimals = !Number.isInteger(Math.round(amount * 100) / 100)
  const value = numberFormatter(lang, decimals).format(amount)
  return lang === 'el' ? `${value} €` : `€${value}`
}

/** Formats a price range, e.g. `25–60 €` (el) or `€25–60` (en). */
export function formatEuroRange(min: number, max: number, lang: Lang): string {
  if (Math.round(min) === Math.round(max)) return formatEuro(Math.round(min), lang)
  const fmt = numberFormatter(lang, false)
  const range = `${fmt.format(Math.round(min))}–${fmt.format(Math.round(max))}`
  return lang === 'el' ? `${range} €` : `€${range}`
}

/** Formats a quantity range, e.g. `3–6` or `2`. */
export function formatQuantity(min: number, max: number): string {
  return min === max ? String(min) : `${min}–${max}`
}

/**
 * Lower-cases and strips accents so "Μπιμπερό", "μπιμπερο" and "ΜΠΙΜΠΕΡΟ" all match.
 * Greek final sigma is folded to σ.
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/ς/g, 'σ')
    .trim()
}
