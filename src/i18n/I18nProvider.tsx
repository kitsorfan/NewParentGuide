import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { usePersistentState } from '../hooks/usePersistentState'
import { I18nContext, type I18nValue } from './context'
import { LANG_STORAGE_KEY, resolveInitialLang } from './lang'
import { messages } from './messages'
import { isLang, type Lang, type Localized } from './types'

function parseLang(raw: unknown): Lang | undefined {
  return isLang(raw) ? raw : undefined
}

interface Props {
  readonly children: ReactNode
  /** Language to use when neither the URL nor a saved choice sets one. Defaults to Greek. */
  readonly defaultLang?: Lang
}

export function I18nProvider({ children, defaultLang }: Props) {
  const [stored, setStored] = usePersistentState<Lang | undefined>(
    LANG_STORAGE_KEY,
    undefined,
    parseLang,
  )
  const lang = resolveInitialLang(window.location.search, stored ?? defaultLang)

  const setLang = useCallback(
    (next: Lang) => {
      setStored(next)
      const url = new URL(window.location.href)
      if (url.searchParams.has('lang')) {
        url.searchParams.set('lang', next)
        window.history.replaceState(null, '', url)
      }
    },
    [setStored],
  )

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: messages[lang], l: (text: Localized) => text[lang] }),
    [lang, setLang],
  )

  return <I18nContext value={value}>{children}</I18nContext>
}
