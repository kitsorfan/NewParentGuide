import { describe, expect, it } from 'vitest'
import { parseHash, routeHref, sectionDomId } from './routes'

describe('parseHash', () => {
  it('defaults to the checklist', () => {
    expect(parseHash('')).toEqual({ page: 'checklist' })
    expect(parseHash('#/')).toEqual({ page: 'checklist' })
    expect(parseHash('#/nope')).toEqual({ page: 'checklist' })
  })

  it('reads the page and optional section', () => {
    expect(parseHash('#/guide')).toEqual({ page: 'guide' })
    expect(parseHash('#/guide/first-month')).toEqual({ page: 'guide', section: 'first-month' })
    expect(parseHash('#/bag/baby')).toEqual({ page: 'bag', section: 'baby' })
  })

  it('round-trips with routeHref', () => {
    const href = routeHref('health', 'vaccines')
    expect(href).toBe('#/health/vaccines')
    expect(parseHash(href)).toEqual({ page: 'health', section: 'vaccines' })
  })
})

describe('sectionDomId', () => {
  it('namespaces section ids', () => {
    expect(sectionDomId('sleep')).toBe('sec-sleep')
  })
})
