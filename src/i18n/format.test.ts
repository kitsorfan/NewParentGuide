import { describe, expect, it } from 'vitest'
import { formatEuro, formatEuroRange, formatQuantity, interpolate, normalizeText } from './format'

// Intl may use a narrow no-break space in some locales; normalise for readable assertions.
const plain = (text: string) => text.replace(/[  ]/g, ' ')

describe('interpolate', () => {
  it('replaces known placeholders and keeps unknown ones', () => {
    expect(interpolate('{done} of {total} {unknown}', { done: 2, total: 5 })).toBe(
      '2 of 5 {unknown}',
    )
  })
})

describe('formatEuro', () => {
  it('uses Greek conventions', () => {
    expect(plain(formatEuro(26.99, 'el'))).toBe('26,99 €')
    expect(plain(formatEuro(1234.5, 'el'))).toBe('1.234,50 €')
  })

  it('uses English conventions', () => {
    expect(formatEuro(26.99, 'en')).toBe('€26.99')
    expect(formatEuro(1234.5, 'en')).toBe('€1,234.50')
  })

  it('drops decimals for whole amounts', () => {
    expect(plain(formatEuro(60, 'el'))).toBe('60 €')
    expect(formatEuro(60, 'en')).toBe('€60')
  })
})

describe('formatEuroRange', () => {
  it('formats ranges with an en dash, rounding to whole euros', () => {
    expect(plain(formatEuroRange(24.6, 59.5, 'el'))).toBe('25–60 €')
    expect(formatEuroRange(25, 60, 'en')).toBe('€25–60')
  })

  it('collapses equal bounds into one amount', () => {
    expect(formatEuroRange(8, 8, 'en')).toBe('€8')
  })
})

describe('formatQuantity', () => {
  it('shows a single number or a range', () => {
    expect(formatQuantity(1, 1)).toBe('1')
    expect(formatQuantity(3, 6)).toBe('3–6')
  })
})

describe('normalizeText', () => {
  it('ignores case, accents and final sigma', () => {
    expect(normalizeText('Μπιμπερό')).toBe('μπιμπερο')
    expect(normalizeText('ΘΗΛΑΣΜΟΣ')).toBe(normalizeText('θηλασμός'))
    expect(normalizeText('  Crème ')).toBe('creme')
  })
})
