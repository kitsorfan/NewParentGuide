import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from '../App'
import { messages } from '../i18n/messages'
import { renderWithI18n } from '../test/render'
import { applyTheme, isTheme, THEME_STORAGE_KEY } from './theme'

const en = messages.en

afterEach(() => {
  delete document.documentElement.dataset.theme
  document.head.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.remove())
})

describe('applyTheme', () => {
  it('sets data-theme for explicit themes and removes it for auto', () => {
    applyTheme('night')
    expect(document.documentElement.dataset.theme).toBe('night')
    applyTheme('auto')
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('updates the browser theme colour and restores it for auto', () => {
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = '#faf9f7'
    document.head.append(meta)

    applyTheme('night')
    expect(meta.content).toBe('#0a0806')
    applyTheme('auto')
    expect(meta.content).toBe('#faf9f7')
  })

  it('validates stored values', () => {
    expect(isTheme('dark')).toBe(true)
    expect(isTheme('sepia')).toBe(false)
  })
})

describe('theme switch', () => {
  it('switches theme from the sidebar and remembers it', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App />, 'en')
    expect(screen.getByRole('button', { name: en.themes.auto })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.click(screen.getByRole('button', { name: en.themes.night }))
    expect(document.documentElement.dataset.theme).toBe('night')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('"night"')

    await user.click(screen.getByRole('button', { name: en.themes.dark }))
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
