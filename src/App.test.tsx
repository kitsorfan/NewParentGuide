import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { bagGroups } from './data/hospitalBag'
import { items } from './data/items'
import { stages } from './data/stages'
import { OWNED_STORAGE_KEY, PACKED_STORAGE_KEY } from './hooks/useOwnedItems'
import { messages } from './i18n/messages'
import { BAG_TOTAL } from './lib/bag'
import { parseIsoDate } from './lib/dates'
import { renderWithI18n } from './test/render'

const el = messages.el
const en = messages.en

/** Navigates like a link click would, and lets the router react. */
function goTo(hash: string) {
  act(() => {
    window.location.hash = hash
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

describe('App shell', () => {
  it('opens on the Greek shopping list with every category', () => {
    renderWithI18n(<App />)
    expect(screen.getByRole('heading', { level: 1, name: el.checklistTitle })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Ύπνος' })).toBeInTheDocument()
    expect(screen.getAllByTestId(/^item-/)).toHaveLength(items.length)
    expect(document.title).toBe(`${el.nav.checklist} · ${el.brand}`)
  })

  it('lists every page in the sidebar and the current page’s sections', () => {
    renderWithI18n(<App />, 'en')
    const nav = screen.getByRole('complementary', { name: en.mainNav })
    for (const label of Object.values(en.nav)) {
      expect(within(nav).getByRole('link', { name: new RegExp(label) })).toBeInTheDocument()
    }
    expect(within(nav).getByRole('link', { name: /Shopping list/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(nav).getByRole('link', { name: /Sleep/ })).toHaveAttribute(
      'href',
      '#/checklist/sleep',
    )
  })

  it('switches language', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App />)
    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.getByRole('heading', { level: 1, name: en.checklistTitle })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App />, 'en')
    const menuButton = screen.getByRole('button', { name: en.menuOpen })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('Shopping list page', () => {
  it('shows what the reference parent bought', () => {
    renderWithI18n(<App />, 'en')
    const card = screen.getByTestId('item-bottles')
    expect(within(card).getByText(/Chicco Well-Being glass bottle/)).toBeInTheDocument()
    expect(within(card).getByText('3 × €9.41 = €28.22')).toBeInTheDocument()
  })

  it('explains why to buy an item on hover', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App />, 'en')
    const card = screen.getByTestId('item-car-seat')
    const why = items.find((item) => item.id === 'car-seat')?.why.en ?? ''
    expect(within(card).getByText(why)).not.toBeVisible()

    await user.hover(within(card).getByRole('heading'))
    expect(within(card).getByText(why)).toBeVisible()
  })

  it('remembers ticked items, updates progress and the sidebar', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App />, 'en')
    const card = screen.getByTestId('item-bottles')
    await user.click(within(card).getByRole('checkbox', { name: /I have: Baby bottles/ }))

    expect(card).toHaveClass('is-owned')
    expect(screen.getByText(`You have 1 of ${items.length}`)).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(OWNED_STORAGE_KEY) ?? '[]')).toEqual(['bottles'])
    const feeding = items.filter((item) => item.category === 'feeding').length
    expect(screen.getByRole('link', { name: new RegExp(`Feeding\\s*1/${feeding}`) })).toBeVisible()

    vi.spyOn(window, 'confirm').mockReturnValue(true)
    await user.click(screen.getByRole('button', { name: en.clearOwned }))
    expect(card).not.toHaveClass('is-owned')
  })

  it('filters by priority and search, and can reset', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App />, 'en')
    const essentials = items.filter((item) => item.priority === 'essential').length

    await user.click(screen.getByRole('button', { name: en.priority.essential, pressed: false }))
    expect(screen.getByText(`${essentials} of ${items.length}`)).toBeInTheDocument()
    expect(screen.queryByTestId('item-bouncer')).not.toBeInTheDocument()

    await user.type(screen.getByRole('searchbox'), 'zzz-nothing')
    expect(screen.getByText(en.noResults)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: en.resetFilters }))
    expect(screen.getByText(`${items.length} of ${items.length}`)).toBeInTheDocument()
  })

  it('links every item to a Skroutz search', () => {
    renderWithI18n(<App />)
    const link = within(screen.getByTestId('item-bottles')).getByRole('link')
    expect(link).toHaveAttribute('href', expect.stringContaining('skroutz.gr/search?keyphrase='))
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

describe('Hospital bag page', () => {
  it('lists the groups and remembers packed items', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App />, 'en')
    goTo('#/bag')

    expect(screen.getByRole('heading', { level: 1, name: en.bagTitle })).toBeInTheDocument()
    for (const group of bagGroups) {
      expect(screen.getByRole('heading', { level: 2, name: group.title.en })).toBeInTheDocument()
    }
    expect(screen.getByText(`0 of ${BAG_TOTAL} packed`)).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Packed: ID cards for both parents' }))
    expect(screen.getByText(`1 of ${BAG_TOTAL} packed`)).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(PACKED_STORAGE_KEY) ?? '[]')).toEqual([
      'documents/ids',
    ])
  })

  it('links bag entries to the matching shopping-list category', () => {
    renderWithI18n(<App />, 'en')
    goTo('#/bag')
    expect(
      screen.getByRole('link', { name: 'See “Maternity pads” on the shopping list' }),
    ).toHaveAttribute('href', '#/checklist/mom')
  })
})

describe('Guide page', () => {
  it('shows every stage and highlights the current one from the birth date', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App today={parseIsoDate('2027-02-01')} />, 'en')
    goTo('#/guide')

    expect(screen.getByRole('heading', { level: 1, name: en.guideTitle })).toBeInTheDocument()
    for (const stage of stages) {
      expect(screen.getByRole('heading', { level: 2, name: stage.title.en })).toBeInTheDocument()
    }
    expect(screen.queryByText(en.youAreHere)).not.toBeInTheDocument()

    const input = screen.getByLabelText(en.birthDateLabel)
    await user.type(input, '2027-01-20')
    expect(screen.getByText('Baby is 12 days old')).toBeInTheDocument()
    const current = screen.getByText(en.youAreHere).closest('section')
    expect(current).toHaveAttribute('id', 'sec-first-2-weeks')
  })
})

describe('Health page', () => {
  it('shows the timeline, vaccine chart and paperwork, with dates from the due date', async () => {
    const user = userEvent.setup()
    renderWithI18n(<App today={parseIsoDate('2026-11-21')} />, 'en')
    goTo('#/health')

    expect(screen.getByRole('heading', { level: 1, name: en.healthTitle })).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: en.sectionLabels.paperwork }),
    ).toBeVisible()

    await user.type(screen.getByLabelText(en.birthDateLabel), '2027-01-20')
    // The pregnancy-vaccine window is the next thing due: 27–36+6 weeks of pregnancy.
    const next = screen.getByText(en.nextUp).closest('li')
    expect(next).toHaveTextContent('During pregnancy')
    expect(next).toHaveTextContent('21 Oct 2026 – 29 Dec 2026')
  })
})

describe('Sources page', () => {
  it('groups the sources and keeps the disclaimer off the other pages', () => {
    renderWithI18n(<App />, 'en')
    expect(screen.queryByText(en.disclaimerTitle)).not.toBeInTheDocument()

    goTo('#/sources')
    expect(screen.getByRole('heading', { level: 1, name: en.sourcesTitle })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: en.sourceTopics.sleep })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: en.sourceTopics.schedule })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: en.disclaimerTitle })).toBeInTheDocument()
    expect(document.title).toBe(`${en.nav.sources} · ${en.brand}`)
  })
})
