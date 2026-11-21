import { createContext } from 'react'
import type { Messages } from './messages'
import type { Lang, Localized } from './types'

export interface I18nValue {
  readonly lang: Lang
  readonly setLang: (lang: Lang) => void
  /** UI strings in the active language. */
  readonly t: Messages
  /** Picks the active-language variant of a data string. */
  readonly l: (text: Localized) => string
}

export const I18nContext = createContext<I18nValue | null>(null)
