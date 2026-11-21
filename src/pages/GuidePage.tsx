import { MapPin, TriangleAlert } from 'lucide-react'
import { BirthDateCard } from '../components/BirthDateCard'
import { TipCard } from '../components/ContentBlocks'
import { TOPIC_ICONS } from '../components/icons'
import { PageHeader } from '../components/layout/PageHeader'
import { stages, type Stage } from '../data/stages'
import { tips } from '../data/tips'
import { useI18n } from '../i18n/useI18n'
import { currentStageId } from '../lib/age'
import { sectionDomId } from '../router/routes'

const guideTips = tips.filter((tip) => tip.page === 'guide')

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
              </div>
            )
          })}
        </div>

        <aside className="red-flags" aria-label={t.redFlagsTitle}>
          <h3 className="red-flags__title">
            <TriangleAlert aria-hidden="true" size={16} />
            {t.redFlagsTitle}
          </h3>
          <ul>
            {stage.redFlags.map((flag) => (
              <li key={flag.en}>{l(flag)}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

export function GuidePage({ birthDate, onBirthDateChange, today }: Props) {
  const { t } = useI18n()
  const current = currentStageId(stages, birthDate, today)

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
