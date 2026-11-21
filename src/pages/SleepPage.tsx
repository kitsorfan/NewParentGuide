import { CircleX, MapPin, Thermometer } from 'lucide-react'
import { CheckListCard, PageSection, RedFlags, TipCard } from '../components/ContentBlocks'
import { CARD_ICON_MAP } from '../components/icons'
import { PageHeader } from '../components/layout/PageHeader'
import { PageSources } from '../components/SourceLink'
import {
  bedSharing,
  parentCards,
  roomTips,
  safeSleepDonts,
  safeSleepDos,
  safeSleepRules,
  settlingCards,
  sleepBands,
  sleepRedFlags,
  togBands,
} from '../data/sleep'
import { sources } from '../data/sources'
import { useI18n } from '../i18n/useI18n'
import { currentRangeId } from '../lib/age'

const sleepSources = sources.filter((source) => source.topic === 'sleep')

interface Props {
  readonly birthDate: string | undefined
  readonly today: Date
}

export function SleepPage({ birthDate, today }: Props) {
  const { lang, t, l } = useI18n()
  const s = t.sleepPage
  const current = currentRangeId(sleepBands, birthDate, today)
  const decimal = new Intl.NumberFormat(lang === 'el' ? 'el-GR' : 'en-GB')

  return (
    <>
      <PageHeader kicker={s.kicker} title={s.title} lead={s.lead} />

      <PageSection id="safe" title={s.safeTitle} lead={s.safeLead}>
        <ol className="pillars">
          {safeSleepRules.map((rule) => {
            const Icon = CARD_ICON_MAP[rule.icon]
            return (
              <li key={rule.id} className="card pillar">
                <span className="pillar__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3 className="pillar__title">{l(rule.title)}</h3>
                <p className="pillar__text">{l(rule.text)}</p>
              </li>
            )
          })}
        </ol>

        <div className="two-col block">
          <CheckListCard kind="do" title={s.dosTitle} points={safeSleepDos} />
          <CheckListCard kind="dont" title={s.dontsTitle} points={safeSleepDonts} />
        </div>

        <aside className="card callout block" aria-labelledby="bed-sharing-title">
          <h3 id="bed-sharing-title" className="callout__title">
            {l(bedSharing.title)}
          </h3>
          <p>{l(bedSharing.lead)}</p>
          <ul className="callout__list">
            {bedSharing.points.map((point) => (
              <li key={point.en}>{l(point)}</li>
            ))}
          </ul>
          <p className="callout__never">
            <CircleX aria-hidden="true" size={16} />
            {s.bedSharingNever}
          </p>
          <ul className="callout__list callout__list--never">
            {bedSharing.never.map((point) => (
              <li key={point.en}>{l(point)}</li>
            ))}
          </ul>
        </aside>
      </PageSection>

      <PageSection id="how-much" title={s.howMuchTitle} lead={s.howMuchLead}>
        <ol className="age-cards">
          {sleepBands.map((band) => {
            const isCurrent = band.id === current
            return (
              <li key={band.id} className={`card age-card${isCurrent ? ' is-current' : ''}`}>
                <div className="age-card__head">
                  <h3 className="age-card__age">{l(band.age)}</h3>
                  {isCurrent && (
                    <span className="here-badge">
                      <MapPin aria-hidden="true" size={13} />
                      {t.youAreHere}
                    </span>
                  )}
                </div>
                <dl className="facts">
                  <div>
                    <dt>{s.totalLabel}</dt>
                    <dd>{l(band.total)}</dd>
                  </div>
                  <div>
                    <dt>{s.napsLabel}</dt>
                    <dd>{l(band.naps)}</dd>
                  </div>
                  <div>
                    <dt>{s.awakeLabel}</dt>
                    <dd>{l(band.awake)}</dd>
                  </div>
                </dl>
                <p className="age-card__note">{l(band.note)}</p>
              </li>
            )
          })}
        </ol>
      </PageSection>

      <PageSection id="room" title={s.roomTitle} lead={s.roomLead}>
        <ul className="tog-grid">
          {togBands.map((band) => (
            <li key={band.id} className="tog" data-temp={band.id}>
              <span className="tog__room">
                <Thermometer aria-hidden="true" size={15} />
                {l(band.room)}
              </span>
              <span className="tog__value">
                <span className="visually-hidden">{s.togLabel}: </span>
                {decimal.format(band.tog)} <small>TOG</small>
              </span>
              <span className="tog__wear">
                <span className="visually-hidden">{s.wearLabel}: </span>
                {l(band.wear)}
              </span>
            </li>
          ))}
        </ul>
        <ul className="tip__list block">
          {roomTips.map((tip) => (
            <li key={tip.en}>{l(tip)}</li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="settling" title={s.settlingTitle}>
        <div className="card-grid card-grid--wide">
          {settlingCards.map((card) => (
            <TipCard key={card.id} tip={card} />
          ))}
        </div>
      </PageSection>

      <PageSection id="parents" title={s.parentsTitle}>
        <div className="card-grid card-grid--wide">
          {parentCards.map((card) => (
            <TipCard key={card.id} tip={card} />
          ))}
        </div>
        <RedFlags title={s.redFlagsTitle} flags={sleepRedFlags} />
      </PageSection>

      <PageSources sources={sleepSources} />
    </>
  )
}
