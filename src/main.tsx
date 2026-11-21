import '@fontsource-variable/commissioner'
import './styles/tokens.css'
import './styles/base.css'
import './styles/app.css'
import './styles/ambient.css'
import './styles/cursor.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { I18nProvider } from './i18n/I18nProvider'

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
