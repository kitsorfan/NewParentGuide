import { Camera, CircleAlert } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { SourceLink } from '../components/SourceLink'
import { healthSources } from '../data/health'
import { items } from '../data/items'
import { photos } from '../data/photos'
import { sources } from '../data/sources'
import { SOURCE_TOPICS, type Source } from '../data/types'
import { interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { sectionDomId } from '../router/routes'

type TopicId = keyof ReturnType<typeof useI18n>['t']['sourceTopics']

const GROUPS: readonly { id: TopicId; list: readonly Source[] }[] = [
  ...SOURCE_TOPICS.map((topic): { id: TopicId; list: readonly Source[] } => ({
    id: topic,
    list: sources.filter((source) => source.topic === topic),
  })),
  { id: 'schedule' as const, list: healthSources },
].filter((group) => group.list.length > 0)

const credits = items.flatMap((item) => {
  const photo = photos[item.id]
  return photo ? [{ item, photo }] : []
})

export function SourcesPage() {
  const { t, l } = useI18n()

  return (
    <>
      <PageHeader kicker={t.sourcesKicker} title={t.sourcesTitle} lead={t.sourcesLead} />

      <section id={sectionDomId('guidance')} className="section" aria-label={t.sourcesTitle}>
        <div className="source-groups">
          {GROUPS.map((group) => (
            <div key={group.id} className="source-group">
              <h2 className="source-group__title">{t.sourceTopics[group.id]}</h2>
              <ul className="source-list">
                {group.list.map((source) => (
                  <SourceLink key={source.id} source={source} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id={sectionDomId('photos')} className="section" aria-labelledby="photos-title">
        <header className="section-head section-head--plain">
          <span className="section-head__icon" aria-hidden="true">
            <Camera size={20} />
          </span>
          <div className="section-head__text">
            <h2 id="photos-title">{t.photoCreditsTitle}</h2>
            <p>{t.photoCreditsLead}</p>
          </div>
        </header>
        {credits.length > 0 && (
          <ul className="credits">
            {credits.map(({ item, photo }) => (
              <li key={item.id}>
                <span className="credits__item">{l(item.name)}</span>
                <span className="credits__text">
                  <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {interpolate(t.photoBy, { title: photo.title, creator: photo.creator })}
                  </a>{' '}
                  ·{' '}
                  {photo.licenseUrl ? (
                    <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license">
                      {photo.license}
                    </a>
                  ) : (
                    <span>{photo.license}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id={sectionDomId('notes')} className="section" aria-labelledby="notes-title">
        <div className="card notice">
          <CircleAlert aria-hidden="true" size={20} className="notice__icon" />
          <div>
            <h2 id="notes-title" className="notice__title">
              {t.disclaimerTitle}
            </h2>
            <p>{interpolate(t.disclaimer, { date: t.priceDate })}</p>
          </div>
        </div>
      </section>
    </>
  )
}
