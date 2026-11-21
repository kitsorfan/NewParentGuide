import { ArrowUpRight } from 'lucide-react'
import type { Source } from '../data/types'
import { useI18n } from '../i18n/useI18n'

/** One official source: title (opens in a new tab), publisher and language. */
export function SourceLink({ source }: { readonly source: Source }) {
  const { t, l } = useI18n()
  return (
    <li className="source">
      <a className="source__link" href={source.url} target="_blank" rel="noopener noreferrer">
        <span className="source__title">{l(source.title)}</span>
        <ArrowUpRight aria-hidden="true" size={16} className="source__arrow" />
        <span className="visually-hidden"> {t.opensInNewTab}</span>
      </a>
      <span className="source__meta">
        {source.publisher} · {source.lang === 'el' ? t.sourceLangGreek : t.sourceLangEnglish}
      </span>
    </li>
  )
}

/** The sources a page is based on, at the bottom of that page. */
export function PageSources({ sources }: { readonly sources: readonly Source[] }) {
  const { t } = useI18n()
  return (
    <section className="section page-sources" aria-labelledby="page-sources-title">
      <h2 id="page-sources-title" className="source-group__title">
        {t.pageSourcesTitle}
      </h2>
      <ul className="source-list source-list--columns">
        {sources.map((source) => (
          <SourceLink key={source.id} source={source} />
        ))}
      </ul>
    </section>
  )
}
