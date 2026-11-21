import { Menu } from 'lucide-react'
import { useI18n } from '../../i18n/useI18n'
import type { PageId } from '../../router/routes'

interface Props {
  readonly page: PageId
  readonly menuOpen: boolean
  readonly sidebarId: string
  readonly onOpenMenu: () => void
}

/** Shown on small screens only: page name and a button that opens the sidebar. */
export function TopBar({ page, menuOpen, sidebarId, onOpenMenu }: Props) {
  const { t } = useI18n()
  return (
    <div className="topbar">
      <button
        type="button"
        className="icon-button"
        aria-expanded={menuOpen}
        aria-controls={sidebarId}
        onClick={onOpenMenu}
      >
        <Menu aria-hidden="true" size={20} />
        <span className="visually-hidden">{t.menuOpen}</span>
      </button>
      <span className="topbar__title">{t.nav[page]}</span>
    </div>
  )
}
