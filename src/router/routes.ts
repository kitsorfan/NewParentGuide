/**
 * Hash-based routes (`#/guide/first-2-weeks`). Hash routing works on GitHub Pages without any
 * server configuration, and the optional second segment scrolls to a section of the page.
 */
export const PAGES = [
  'checklist',
  'bag',
  'guide',
  'sleep',
  'breastfeeding',
  'health',
  'sources',
] as const
export type PageId = (typeof PAGES)[number]

export interface Route {
  readonly page: PageId
  readonly section?: string
}

export const DEFAULT_PAGE: PageId = 'checklist'

function isPage(value: string | undefined): value is PageId {
  return value !== undefined && (PAGES as readonly string[]).includes(value)
}

/** `#/guide/first-month` → `{ page: 'guide', section: 'first-month' }`. Unknown pages fall back to the checklist. */
export function parseHash(hash: string): Route {
  const [first, second] = hash.replace(/^#\/?/, '').split('/')
  if (!isPage(first)) return { page: DEFAULT_PAGE }
  const section = second ? decodeURIComponent(second) : undefined
  return section ? { page: first, section } : { page: first }
}

export function routeHref(page: PageId, section?: string): string {
  return section ? `#/${page}/${encodeURIComponent(section)}` : `#/${page}`
}

/** DOM id of a section, namespaced so it can't clash with other ids on the page. */
export function sectionDomId(section: string): string {
  return `sec-${section}`
}
