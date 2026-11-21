import { useI18n } from '../../i18n/useI18n'
import { routeHref } from '../../router/routes'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="site-footer">
      <span>{t.footerNote}</span>
      <a href={routeHref('sources')}>{t.footerSources}</a>
    </footer>
  )
}
