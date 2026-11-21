import { ArrowUpRight, Droplet, MapPin, Phone, Stethoscope } from 'lucide-react'
import type { CSSProperties } from 'react'
import { CheckListCard, PageSection, RedFlags, TipCard } from '../components/ContentBlocks'
import { CARD_ICON_MAP } from '../components/icons'
import { PageHeader } from '../components/layout/PageHeader'
import { PageSources } from '../components/SourceLink'
import {
  breastfeedingRedFlags,
  enoughSigns,
  expressingCards,
  feedingPositions,
  feedingProblems,
  firstDaysCards,
  latchSigns,
  latchSteps,
  milkStorage,
  motherCards,
  nappyChart,
  stomachSizes,
  supportContacts,
} from '../data/breastfeeding'
import { sources } from '../data/sources'
import { interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { currentRangeId } from '../lib/age'

const feedingSources = sources.filter((source) => source.topic === 'breastfeeding')

interface Props {
  readonly birthDate: string | undefined
  readonly today: Date
}

export function BreastfeedingPage({ birthDate, today }: Props) {
  const { t, l } = useI18n()
  const f = t.feedingPage
  const currentNappyRow = currentRangeId(nappyChart, birthDate, today)

  return (
    <>
      <PageHeader kicker={f.kicker} title={f.title} lead={f.lead} />

      <PageSection id="first-days" title={f.firstDaysTitle}>
        <div className="card-grid card-grid--wide">
          {firstDaysCards.map((card) => (
            <TipCard key={card.id} tip={card} />
          ))}
        </div>

        <figure className="card stomach block">
          <figcaption className="stomach__caption">
            <strong>{f.stomachTitle}</strong>
            <span>{f.stomachLead}</span>
          </figcaption>
          <ol className="stomach__sizes">
            {stomachSizes.map((size) => (
              <li
                key={size.id}
                className="stomach__size"
                style={{ '--size': `${size.size}px` } as CSSProperties}
              >
                <span
                  className="stomach__ball"
                  data-shape={size.id === 'month-1' ? 'egg' : 'round'}
                  aria-hidden="true"
                />
                <span className="stomach__age">{l(size.age)}</span>
                <span className="stomach__like">{l(size.like)}</span>
                <span className="stomach__volume">{size.volume}</span>
              </li>
            ))}
          </ol>
        </figure>
      </PageSection>

      <PageSection id="latch" title={f.latchTitle} lead={f.latchLead}>
        <div className="two-col">
          <div className="card steps-card">
            <h3 className="check-card__title">{f.stepsTitle}</h3>
            <ol className="steps">
              {latchSteps.map((step) => (
                <li key={step.en}>{l(step)}</li>
              ))}
            </ol>
          </div>
          <CheckListCard kind="do" title={f.signsTitle} points={latchSigns} />
        </div>

        <h3 className="sub-title">{f.positionsTitle}</h3>
        <ul className="positions">
          {feedingPositions.map((position) => (
            <li key={position.id} className="card position">
              <h4 className="position__name">{l(position.name)}</h4>
              <p>{l(position.text)}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="enough" title={f.enoughTitle} lead={f.enoughLead}>
        <ol className="nappies">
          {nappyChart.map((row) => {
            const isCurrent = row.id === currentNappyRow
            return (
              <li key={row.id} className={`card nappy${isCurrent ? ' is-current' : ''}`}>
                <div className="nappy__age">
                  <h3>{l(row.age)}</h3>
                  {isCurrent && (
                    <span className="here-badge">
                      <MapPin aria-hidden="true" size={13} />
                      {t.youAreHere}
                    </span>
                  )}
                </div>
                <div className="nappy__cell">
                  <span className="nappy__label">{f.wetLabel}</span>
                  <span className="nappy__drops" aria-hidden="true">
                    {Array.from({ length: row.wet }, (_, index) => (
                      <Droplet key={index} size={15} />
                    ))}
                  </span>
                  <span className="nappy__text">{l(row.wetText)}</span>
                </div>
                <div className="nappy__cell">
                  <span className="nappy__label">{f.pooLabel}</span>
                  <span className="nappy__poo">
                    <span className="nappy__swatch" data-poo={row.poo} aria-hidden="true" />
                    <span className="nappy__text">{l(row.pooText)}</span>
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
        <p className="section-note">{f.nappyNote}</p>

        <div className="block">
          <CheckListCard kind="do" title={f.alsoTitle} points={enoughSigns} />
        </div>
      </PageSection>

      <PageSection id="problems" title={f.problemsTitle} lead={f.problemsLead}>
        <div className="card-grid card-grid--wide">
          {feedingProblems.map((problem) => (
            <article key={problem.id} className="card problem">
              <h3 className="problem__title">{l(problem.title)}</h3>
              <p className="problem__label">{f.signsLabel}</p>
              <p className="problem__signs">{l(problem.signs)}</p>
              <p className="problem__label">{f.helpsLabel}</p>
              <ul className="tip__list">
                {problem.helps.map((help) => (
                  <li key={help.en}>{l(help)}</li>
                ))}
              </ul>
              {problem.doctor && (
                <p className="problem__doctor">
                  <Stethoscope aria-hidden="true" size={15} />
                  <span>{l(problem.doctor)}</span>
                </p>
              )}
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="expressing" title={f.expressingTitle} lead={f.expressingLead}>
        <ul className="storage">
          {milkStorage.map((rule) => {
            const Icon = CARD_ICON_MAP[rule.icon]
            return (
              <li key={rule.id} className="card storage__tile">
                <span className="storage__icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <span className="storage__place">{l(rule.place)}</span>
                <strong className="storage__time">{l(rule.time)}</strong>
                <span className="storage__temp">{l(rule.temperature)}</span>
                {rule.note && <span className="storage__note">{l(rule.note)}</span>}
              </li>
            )
          })}
        </ul>
        <div className="card-grid card-grid--wide block">
          {expressingCards.map((card) => (
            <TipCard key={card.id} tip={card} />
          ))}
        </div>
      </PageSection>

      <PageSection id="mum" title={f.mumTitle}>
        <div className="card-grid card-grid--wide">
          {motherCards.map((card) => (
            <TipCard key={card.id} tip={card} />
          ))}
        </div>
      </PageSection>

      <PageSection id="help" title={f.helpTitle}>
        <ul className="support">
          {supportContacts.map((contact) => {
            const name = l(contact.name)
            return (
              <li key={contact.id} className="card support__item">
                <h3 className="support__name">{name}</h3>
                <p className="support__detail">{l(contact.detail)}</p>
                {(contact.phone || contact.url) && (
                  <div className="support__actions">
                    {contact.phone && (
                      <a
                        className="support__phone"
                        href={`tel:${contact.phone}`}
                        aria-label={interpolate(f.callLabel, { phone: contact.phone, name })}
                      >
                        <Phone aria-hidden="true" size={16} />
                        {contact.phone}
                      </a>
                    )}
                    {contact.url && (
                      <a
                        className="arrow-link"
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={interpolate(f.websiteAria, { name })}
                      >
                        {f.websiteLabel}
                        <ArrowUpRight aria-hidden="true" size={15} />
                      </a>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
        <RedFlags title={f.redFlagsTitle} flags={breastfeedingRedFlags} />
      </PageSection>

      <PageSources sources={feedingSources} />
    </>
  )
}
