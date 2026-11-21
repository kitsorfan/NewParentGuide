import { Printer, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useI18n } from '../../i18n/useI18n'
import { PAGES, routeHref, type PageId, type Route } from '../../router/routes'
import { scrollToSection } from '../../router/useRoute'
import { PAGE_ICONS } from '../icons'
import type { Theme } from '../../theme/theme'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeSwitch } from './ThemeSwitch'

export interface NavSection {
  readonly id: string
  readonly label: string
  readonly icon?: LucideIcon
  /** Small text on the right, e.g. "3/12". */
  readonly meta?: string
}

interface Props {
  readonly id: string
  readonly route: Route
  /** Sub-sections of the current page. */
  readonly sections: readonly NavSection[]
  readonly activeSection: string | undefined
  readonly open: boolean
  /** `restoreFocus` is true when the menu is dismissed rather than left via a link. */
  readonly onClose: (restoreFocus?: boolean) => void
  readonly theme: Theme
  readonly onThemeChange: (theme: Theme) => void
}

export function Sidebar({
  id,
  route,
  sections,
  activeSection,
  open,
  onClose,
  theme,
  onThemeChange,
}: Props) {
  const { t } = useI18n()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // When the mobile drawer opens, move focus into it.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus({ preventScroll: true })
  }, [open])

  /** Clicking the link of the section you're already on doesn't fire `hashchange`; scroll anyway. */
  const onNavigate = (page: PageId, section?: string) => {
    if (window.location.hash === routeHref(page, section)) scrollToSection(section)
    onClose()
  }

  return (
    <aside id={id} className="sidebar" data-open={open} aria-label={t.mainNav}>
      <div className="sidebar__head">
        <a
          className="brand"
          href={routeHref('checklist')}
          aria-label={t.brand}
          onClick={() => onNavigate('checklist')}
        >
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path
                d="M10 6 13 5q3 3 6 0l3 1 5 5-3 3-2-1.5V25q0 2-2 2h-2q-2-2-4 0h-2q-2 0-2-2V12.5L8 14l-3-3Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="brand__text">
            <span className="brand__name">{t.brand}</span>
            <span className="brand__tagline">{t.brandTagline}</span>
          </span>
        </a>
        <button
          ref={closeButtonRef}
          type="button"
          className="icon-button sidebar__close"
          onClick={() => onClose(true)}
        >
          <X aria-hidden="true" size={20} />
          <span className="visually-hidden">{t.menuClose}</span>
        </button>
      </div>

      <nav className="sidebar__nav">
        <ul className="nav">
          {PAGES.map((page) => {
            const Icon = PAGE_ICONS[page]
            const current = route.page === page
            return (
              <li key={page} className="nav__item">
                <a
                  className="nav__link"
                  href={routeHref(page)}
                  aria-current={current ? 'page' : undefined}
                  onClick={() => onNavigate(page)}
                >
                  <Icon aria-hidden="true" size={18} className="nav__icon" />
                  <span className="nav__text">
                    <span className="nav__label">{t.nav[page]}</span>
                    <span className="nav__hint">{t.navHint[page]}</span>
                  </span>
                </a>
                {current && sections.length > 0 && (
                  <ul className="subnav">
                    {sections.map((section) => {
                      const SectionIcon = section.icon
                      return (
                        <li key={section.id}>
                          <a
                            className="subnav__link"
                            href={routeHref(page, section.id)}
                            aria-current={activeSection === section.id ? 'location' : undefined}
                            onClick={() => onNavigate(page, section.id)}
                          >
                            {SectionIcon && (
                              <SectionIcon aria-hidden="true" size={15} className="subnav__icon" />
                            )}
                            <span className="subnav__label">{section.label}</span>
                            {section.meta && <span className="subnav__meta">{section.meta}</span>}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar__foot">
        <ThemeSwitch theme={theme} onChange={onThemeChange} />
        <LanguageSwitch />
        <button type="button" className="icon-button" onClick={() => window.print()}>
          <Printer aria-hidden="true" size={18} />
          <span className="visually-hidden">{t.print}</span>
        </button>
      </div>
    </aside>
  )
}
