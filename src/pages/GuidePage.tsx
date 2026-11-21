import { ArrowRight, MapPin } from 'lucide-react'
import { BirthDateCard } from '../components/BirthDateCard'
import { RedFlags, TipCard } from '../components/ContentBlocks'
import { TOPIC_ICONS } from '../components/icons'
import { PageHeader } from '../components/layout/PageHeader'
import { stages, type Stage, type StageTopicId } from '../data/stages'
import { tips } from '../data/tips'
import { interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { currentRangeId } from '../lib/age'
import { routeHref, sectionDomId, type PageId } from '../router/routes'

const guideTips = tips.filter((tip) => tip.page === 'guide')

/** Topics that have a page of their own. */
const TOPIC_PAGES: Partial<Record<StageTopicId, PageId>> = {
  sleep: 'sleep',
  feeding: 'breastfeeding',
}

interface Props {
  readonly birthDate: string | undefined
  readonly onBirthDateChange: (date: string | undefined) => void
  readonly today: Date
}

function StageSection({ stage, current }: { readonly stage: Stage; readonly current: boolean }) {
  const { t, l } = useI18n()
  const headingId = `${stage.id}-title`
  return (
    <section
      id={sectionDomId(stage.id)}
      className={`section stage${current ? ' is-current' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="stage__rail" aria-hidden="true">
        <span className="stage__dot" />
      </div>
      <div className="stage__content">
        <header className="stage__head">
          <span className="stage__age">{l(stage.ageLabel)}</span>
          {current && (
            <span className="stage__here">
              <MapPin aria-hidden="true" size={14} />
              {t.youAreHere}
            </span>
          )}
          <h2 id={headingId}>{l(stage.title)}</h2>
          <p>{l(stage.intro)}</p>
        </header>

        <div className="topic-grid">
          {stage.topics.map((topic) => {
            const Icon = TOPIC_ICONS[topic.id]
            const page = TOPIC_PAGES[topic.id]
            return (
              <div key={topic.id} className="card topic">
                <h3 className="topic__title">
                  <Icon aria-hidden="true" size={16} />
                  {t.topics[topic.id]}
                </h3>
                <ul>
                  {topic.points.map((point) => (
                    <li key={point.en}>{l(point)}</li>
                  ))}
                </ul>
                {page && (
                  <a className="arrow-link topic__more" href={routeHref(page)}>
                    {interpolate(t.moreInGuide, { page: t.nav[page] })}
                    <ArrowRight aria-hidden="true" size={13} />
                  </a>
                )}
              </div>
            )
          })}
        </div>

        <RedFlags title={t.redFlagsTitle} flags={stage.redFlags} />
      </div>
    </section>
  )
}

export function GuidePage({ birthDate, onBirthDateChange, today }: Props) {
  const { t } = useI18n()
  const current = currentRangeId(stages, birthDate, today)

  return (
    <>
      <PageHeader kicker={t.guideKicker} title={t.guideTitle} lead={t.guideLead}>
        <BirthDateCard birthDate={birthDate} onChange={onBirthDateChange} today={today} />
      </PageHeader>

      <div className="timeline">
        {stages.map((stage) => (
          <StageSection key={stage.id} stage={stage} current={stage.id === current} />
        ))}
      </div>

      <section id={sectionDomId('always')} className="section" aria-labelledby="always-title">
        <header className="section-head section-head--plain">
          <div className="section-head__text">
            <h2 id="always-title">{t.alwaysTitle}</h2>
          </div>
        </header>
        <div className="card-grid card-grid--wide">
          {guideTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </section>
    </>
  )
}
