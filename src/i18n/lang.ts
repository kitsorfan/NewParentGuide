import { isLang, type Lang } from './types'

export const LANG_STORAGE_KEY = 'npg.lang'

/**
 * Language priority: `?lang=` in the URL (shareable links) → saved choice → Greek.
 * The audience is parents in Greece, so Greek is the default.
 */
export function resolveInitialLang(search: string, stored: unknown): Lang {
  const fromUrl = new URLSearchParams(search).get('lang')
  if (isLang(fromUrl)) return fromUrl
  if (isLang(stored)) return stored
  return 'el'
}
