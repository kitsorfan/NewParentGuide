import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AmbientBackground } from './components/layout/AmbientBackground'
import { Footer } from './components/layout/Footer'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { items } from './data/items'
import { useBirthDate } from './hooks/useBirthDate'
import { useOwnedItems, usePackedItems } from './hooks/useOwnedItems'
import { usePageSections } from './hooks/usePageSections'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useI18n } from './i18n/useI18n'
import { references } from './lib/catalog'
import { DEFAULT_FILTERS, filterItems, type ItemFilters } from './lib/filter'
import { BagPage } from './pages/BagPage'
import { BreastfeedingPage } from './pages/BreastfeedingPage'
import { ChecklistPage } from './pages/ChecklistPage'
import { GuidePage } from './pages/GuidePage'
import { HealthPage } from './pages/HealthPage'
import { SleepPage } from './pages/SleepPage'
import { SourcesPage } from './pages/SourcesPage'
import { useRoute } from './router/useRoute'
import { useTheme } from './theme/useTheme'

const SIDEBAR_ID = 'sidebar'
/** Matches the CSS breakpoint where the sidebar becomes a fixed column. */
const DESKTOP_QUERY = '(min-width: 1024px)'

interface Props {
  /** "Today", injectable for tests. */
  readonly today?: Date
}

export function App({ today: todayOverride }: Props) {
  // Read the clock once per visit; tests can pin it.
  const [defaultToday] = useState(() => new Date())
  const today = todayOverride ?? defaultToday
  const { t } = useI18n()
  const route = useRoute()
  const ownedItems = useOwnedItems()
  const { owned } = ownedItems
  const packedItems = usePackedItems()
  const [filters, setFilters] = useState<ItemFilters>(DEFAULT_FILTERS)
  const [birthDate, setBirthDate] = useBirthDate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef(false)
  const [theme, setTheme] = useTheme()

  const visible = useMemo(
    () => filterItems(items, filters, { owned, references }),
    [filters, owned],
  )
  const sections = usePageSections(route.page, owned, packedItems.owned, visible)
  const activeSection = useScrollSpy(sections.map((section) => section.id))

  useEffect(() => {
    document.title = `${t.nav[route.page]} · ${t.brand}`
  }, [route.page, t])

  /** Closes the mobile menu; when dismissed (not by following a link), focus returns to its button. */
  const closeMenu = useCallback((restoreFocus = false) => {
    restoreFocusRef.current = restoreFocus
    setMenuOpen(false)
  }, [])

  // After the re-render, once the top bar is no longer inert.
  useEffect(() => {
    if (menuOpen || !restoreFocusRef.current) return
    restoreFocusRef.current = false
    menuButtonRef.current?.focus()
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && closeMenu(true)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, closeMenu])

  // The drawer only exists on small screens: close it if the window grows to desktop width.
  useEffect(() => {
    if (!menuOpen || typeof window.matchMedia !== 'function') return
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => desktop.matches && setMenuOpen(false)
    onChange()
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [menuOpen])

  const dateProps = { birthDate, onBirthDateChange: setBirthDate, today }

  return (
    <div className="shell" data-menu-open={menuOpen}>
      <a
        className="skip-link"
        href="#main-content"
        inert={menuOpen}
        onClick={(event) => {
          // A plain `#main-content` would be read as a route; move focus instead.
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        {t.skipToContent}
      </a>

      <AmbientBackground />

      <TopBar
        page={route.page}
        menuOpen={menuOpen}
        sidebarId={SIDEBAR_ID}
        menuButtonRef={menuButtonRef}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <Sidebar
        id={SIDEBAR_ID}
        route={route}
        sections={sections}
        activeSection={activeSection}
        open={menuOpen}
        onClose={closeMenu}
        theme={theme}
        onThemeChange={setTheme}
      />
      {menuOpen && (
        <button
          type="button"
          className="backdrop"
          tabIndex={-1}
          aria-label={t.menuClose}
          onClick={() => closeMenu(true)}
        />
      )}

      {/* While the drawer is open, keep keyboard and screen-reader focus inside it. */}
      <main id="main-content" className="main" tabIndex={-1} inert={menuOpen}>
        <div className="main__inner" data-page={route.page}>
          {route.page === 'checklist' && (
            <ChecklistPage
              {...ownedItems}
              filters={filters}
              onFiltersChange={setFilters}
              visible={visible}
            />
          )}
          {route.page === 'bag' && <BagPage {...packedItems} />}
          {route.page === 'guide' && <GuidePage {...dateProps} />}
          {route.page === 'sleep' && <SleepPage birthDate={birthDate} today={today} />}
          {route.page === 'breastfeeding' && (
            <BreastfeedingPage birthDate={birthDate} today={today} />
          )}
          {route.page === 'health' && <HealthPage {...dateProps} />}
          {route.page === 'sources' && <SourcesPage />}
        </div>
        <Footer />
      </main>
    </div>
  )
}
