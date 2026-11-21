export const LANGS = ['el', 'en'] as const

export type Lang = (typeof LANGS)[number]

/** A piece of text available in every supported language. */
export type Localized = Readonly<Record<Lang, string>>

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value)
}
