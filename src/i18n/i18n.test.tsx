import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { I18nProvider } from './I18nProvider'
import { LANG_STORAGE_KEY, resolveInitialLang } from './lang'
import { messages } from './messages'
import { useI18n } from './useI18n'

describe('resolveInitialLang', () => {
  it('prefers the URL, then the saved choice, then Greek', () => {
    expect(resolveInitialLang('?lang=en', 'el')).toBe('en')
    expect(resolveInitialLang('', 'en')).toBe('en')
    expect(resolveInitialLang('', undefined)).toBe('el')
  })

  it('ignores unsupported values', () => {
    expect(resolveInitialLang('?lang=fr', 'de')).toBe('el')
  })
})

/** Collects "a.b.c" paths of every string leaf. */
function leafPaths(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix]
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    leafPaths(child, prefix ? `${prefix}.${key}` : key),
  )
}

function leafAt(value: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], value)
}

describe('messages', () => {
  it('has the same keys in Greek and English', () => {
    expect(leafPaths(messages.en).toSorted()).toEqual(leafPaths(messages.el).toSorted())
  })

  it('has no empty strings', () => {
    for (const lang of ['el', 'en'] as const) {
      for (const path of leafPaths(messages[lang])) {
        expect(String(leafAt(messages[lang], path)).trim(), `${lang}.${path}`).not.toBe('')
      }
    }
  })
})

function Probe() {
  const { lang, setLang, t } = useI18n()
  return (
    <>
      <p>{t.brand}</p>
      <button type="button" onClick={() => setLang(lang === 'el' ? 'en' : 'el')}>
        switch
      </button>
    </>
  )
}

describe('I18nProvider', () => {
  it('switches language, remembers it and updates <html lang>', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByText(messages.el.brand)).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('el')

    await user.click(screen.getByRole('button', { name: 'switch' }))

    expect(screen.getByText(messages.en.brand)).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem(LANG_STORAGE_KEY)).toBe('"en"')
  })

  it('reads the language from the URL and keeps the URL in sync', async () => {
    window.history.replaceState(null, '', '/?lang=en')
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByText(messages.en.brand)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'switch' }))

    expect(screen.getByText(messages.el.brand)).toBeInTheDocument()
    expect(window.location.search).toBe('?lang=el')
  })

  it('throws a helpful error outside the provider', () => {
    // React logs the thrown error; keep the test output clean.
    const original = console.error
    console.error = () => {}
    try {
      expect(() => render(<Probe />)).toThrow(/I18nProvider/)
    } finally {
      console.error = original
    }
  })
})
