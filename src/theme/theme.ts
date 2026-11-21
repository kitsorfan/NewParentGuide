export const THEMES = ['auto', 'light', 'dark', 'night'] as const
export type Theme = (typeof THEMES)[number]

/** Keep in sync with the inline script in index.html, which applies the theme before first paint. */
export const THEME_STORAGE_KEY = 'npg.theme'

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value)
}

/** Browser UI colour (address bar etc.) per explicit theme; `auto` keeps the media-based defaults. */
const THEME_COLORS: Record<Exclude<Theme, 'auto'>, string> = {
  light: '#faf9f7',
  dark: '#111013',
  night: '#0a0806',
}

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  if (theme === 'auto') delete root.dataset.theme
  else root.dataset.theme = theme

  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.dataset.default ??= meta.content
    meta.content = theme === 'auto' ? meta.dataset.default : THEME_COLORS[theme]
  }
}
