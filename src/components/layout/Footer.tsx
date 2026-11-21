import { useI18n } from '../../i18n/useI18n'
import { routeHref } from '../../router/routes'

const AUTHOR = 'Kitsos Orfanopoulos'
const CONTRIBUTOR = 'Michalis'
const AUTHOR_SITE = 'https://www.kitsorfan.com'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="site-footer">
      <span>{t.footerNote}</span>
      <a href={routeHref('sources')}>{t.footerSources}</a>
      <p className="site-footer__credit">
        {t.footerMadeBy} {AUTHOR} · {t.footerCredits} {CONTRIBUTOR} ·{' '}
        <a href={AUTHOR_SITE} target="_blank" rel="noopener noreferrer">
          www.kitsorfan.com
        </a>
      </p>
    </footer>
  )
}
