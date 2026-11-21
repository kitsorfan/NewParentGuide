import { useEffect } from 'react'
import { usePersistentState } from '../hooks/usePersistentState'
import { applyTheme, isTheme, THEME_STORAGE_KEY, type Theme } from './theme'

const parseTheme = (raw: unknown): Theme | undefined => (isTheme(raw) ? raw : undefined)

/** The chosen colour theme, remembered and applied to `<html data-theme>`. */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = usePersistentState<Theme>(THEME_STORAGE_KEY, 'auto', parseTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return [theme, setTheme]
}
