import { Ban, CircleCheck, CircleX, PiggyBank, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { avoidList } from '../data/avoid'
import type { AvoidEntry, InfoCard } from '../data/types'
import type { Localized } from '../i18n/types'
import { useI18n } from '../i18n/useI18n'
import { sectionDomId } from '../router/routes'
import { CARD_ICON_MAP } from './icons'

/** A page section with a plain heading; `id` is the route section (`#/page/<id>`). */
export function PageSection({
  id,
  title,
  lead,
  children,
}: {
  readonly id: string
  readonly title: string
  readonly lead?: string
  readonly children: ReactNode
}) {
  const headingId = `${id}-title`
  return (
    <section id={sectionDomId(id)} className="section" aria-labelledby={headingId}>
      <header className="section-head section-head--plain">
        <div className="section-head__text">
          <h2 id={headingId}>{title}</h2>
          {lead && <p>{lead}</p>}
        </div>
      </header>
      {children}
    </section>
  )
}

/** "Call the paediatrician if…" */
export function RedFlags({
  title,
  flags,
}: {
  readonly title: string
  readonly flags: readonly Localized[]
}) {
  const { l } = useI18n()
  return (
    <aside className="red-flags" aria-label={title}>
      <h3 className="red-flags__title">
        <TriangleAlert aria-hidden="true" size={16} />
        {title}
      </h3>
      <ul>
        {flags.map((flag) => (
          <li key={flag.en}>{l(flag)}</li>
        ))}
      </ul>
    </aside>
  )
}

/** A card with a list of do's (ticks) or don'ts (crosses). */
export function CheckListCard({
  kind,
  title,
  points,
}: {
  readonly kind: 'do' | 'dont'
  readonly title: string
  readonly points: readonly Localized[]
}) {
  const { l } = useI18n()
  const Icon = kind === 'do' ? CircleCheck : CircleX
  return (
    <div className="card check-card" data-kind={kind}>
      <h3 className="check-card__title">
        <Icon aria-hidden="true" size={18} />
        {title}
      </h3>
      <ul className="check-card__list">
        {points.map((point) => (
          <li key={point.en}>
            <Icon aria-hidden="true" size={16} />
            <span>{l(point)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AvoidColumn({
  kind,
  title,
}: {
  readonly kind: AvoidEntry['kind']
  readonly title: string
}) {
  const { l } = useI18n()
  const Icon = kind === 'safety' ? Ban : PiggyBank
  return (
    <div className="card avoid" data-kind={kind}>
      <h3 className="avoid__title">
        <Icon aria-hidden="true" size={18} />
        {title}
      </h3>
      <ul className="avoid__list">
        {avoidList
          .filter((entry) => entry.kind === kind)
          .map((entry) => (
            <li key={entry.id}>
              <strong>{l(entry.name)}</strong>
              <span>{l(entry.why)}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export function AvoidSection() {
  const { t } = useI18n()
  return (
    <section id={sectionDomId('avoid')} className="section" aria-labelledby="avoid-title">
      <header className="section-head section-head--plain">
        <div className="section-head__text">
          <h2 id="avoid-title">{t.avoidTitle}</h2>
          <p>{t.avoidLead}</p>
        </div>
      </header>
      <div className="two-col">
        <AvoidColumn kind="safety" title={t.avoidSafety} />
        <AvoidColumn kind="money" title={t.avoidMoney} />
      </div>
    </section>
  )
}

export function TipCard({ tip }: { readonly tip: InfoCard }) {
  const { l } = useI18n()
  const Icon = CARD_ICON_MAP[tip.icon]
  return (
    <article className="card tip">
      <h3 className="tip__title">
        <span className="tip__icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        {l(tip.title)}
      </h3>
      <ul className="tip__list">
        {tip.points.map((point) => (
          <li key={point.en}>{l(point)}</li>
        ))}
      </ul>
    </article>
  )
}
