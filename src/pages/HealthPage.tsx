import { CircleAlert } from 'lucide-react'
import { BirthDateCard } from '../components/BirthDateCard'
import { HEALTH_KIND_ICONS } from '../components/icons'
import { PageHeader } from '../components/layout/PageHeader'
import {
  healthVisits,
  paperwork,
  vaccineColumns,
  vaccineRows,
  type HealthEvent,
  type HealthVisit,
} from '../data/health'
import { useI18n } from '../i18n/useI18n'
import { addAge, daysBetween, formatDate, parseIsoDate } from '../lib/dates'
import { sectionDomId } from '../router/routes'

interface Props {
  readonly birthDate: string | undefined
  readonly onBirthDateChange: (date: string | undefined) => void
  readonly today: Date
}

function EventLine({ event }: { readonly event: HealthEvent }) {
  const { t, l } = useI18n()
  const Icon = HEALTH_KIND_ICONS[event.kind]
  return (
    <li className="event" data-kind={event.kind}>
      <span className="event__kind">
        <Icon aria-hidden="true" size={14} />
        {t.eventKinds[event.kind]}
      </span>
      <span className="event__text">
        <strong>{l(event.title)}</strong>
        {event.detail && <span>{l(event.detail)}</span>}
      </span>
    </li>
  )
}

export function HealthPage({ birthDate, onBirthDateChange, today }: Props) {
  const { lang, t, l } = useI18n()
  const birth = birthDate ? parseIsoDate(birthDate) : undefined
  /** "12 Mar 2027", or "15 Oct – 17 Dec 2026" for a window. */
  const dateLabel = (visit: HealthVisit) => {
    if (!birth) return undefined
    const start = formatDate(addAge(birth, visit.offset), lang)
    return visit.until ? `${start} – ${formatDate(addAge(birth, visit.until), lang)}` : start
  }
  // The first visit (or window) that hasn't ended yet.
  const nextVisit = birth
    ? healthVisits.find(
        (visit) => daysBetween(today, addAge(birth, visit.until ?? visit.offset)) >= 0,
      )?.id
    : undefined

  return (
    <>
      <PageHeader kicker={t.healthKicker} title={t.healthTitle} lead={t.healthLead}>
        <BirthDateCard birthDate={birthDate} onChange={onBirthDateChange} today={today} />
      </PageHeader>

      <section id={sectionDomId('timeline')} className="section" aria-labelledby="timeline-title">
        <header className="section-head section-head--plain">
          <div className="section-head__text">
            <h2 id="timeline-title">{t.sectionLabels.timeline}</h2>
          </div>
        </header>
        <ol className="visits">
          {healthVisits.map((visit) => {
            const date = dateLabel(visit)
            const isNext = visit.id === nextVisit
            return (
              <li key={visit.id} className={`card visit${isNext ? ' is-next' : ''}`}>
                <div className="visit__when">
                  <span className="visit__age">{l(visit.age)}</span>
                  {date && <span className="visit__date">{date}</span>}
                  {isNext && <span className="visit__next">{t.nextUp}</span>}
                </div>
                <ul className="visit__events">
                  {visit.events.map((event) => (
                    <EventLine key={event.id} event={event} />
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      </section>

      <section id={sectionDomId('vaccines')} className="section" aria-labelledby="vaccines-title">
        <header className="section-head section-head--plain">
          <div className="section-head__text">
            <h2 id="vaccines-title">{t.vaccineMatrixTitle}</h2>
          </div>
        </header>
        {/* Scrollable on small screens, so it must be reachable with the keyboard. */}
        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <section className="table-scroll" aria-labelledby="vaccines-title" tabIndex={0}>
          <table className="matrix">
            <thead>
              <tr>
                <th scope="col">{t.vaccineColumn}</th>
                {vaccineColumns.map((column) => (
                  <th key={column.id} scope="col">
                    {l(column.label)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vaccineRows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">
                    <span className="matrix__name">{l(row.name)}</span>
                    <span className="matrix__abbr">{row.abbreviation}</span>
                    {row.note && <span className="matrix__note">{l(row.note)}</span>}
                  </th>
                  {vaccineColumns.map((column) => (
                    <td key={column.id}>
                      {row.doses.includes(column.id) ? (
                        <>
                          <span className="matrix__dose" aria-hidden="true" />
                          <span className="visually-hidden">{t.doseLabel}</span>
                        </>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>

      {paperwork.length > 0 && (
        <section
          id={sectionDomId('paperwork')}
          className="section"
          aria-labelledby="paperwork-title"
        >
          <header className="section-head section-head--plain">
            <div className="section-head__text">
              <h2 id="paperwork-title">{t.sectionLabels.paperwork}</h2>
            </div>
          </header>
          <ul className="card-grid card-grid--wide paperwork">
            {paperwork.map((event) => (
              <li key={event.id} className="card">
                <ul className="visit__events">
                  <EventLine event={event} />
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="notice notice--inline">
        <CircleAlert aria-hidden="true" size={16} />
        {t.healthDisclaimer}
      </p>
    </>
  )
}
