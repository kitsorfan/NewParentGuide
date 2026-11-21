import { render, type RenderResult } from '@testing-library/react'
import type { ReactElement } from 'react'
import { I18nProvider } from '../i18n/I18nProvider'
import type { Lang } from '../i18n/types'

export function renderWithI18n(ui: ReactElement, lang: Lang = 'el'): RenderResult {
  return render(<I18nProvider defaultLang={lang}>{ui}</I18nProvider>)
}
