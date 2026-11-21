import { Ban, PiggyBank } from 'lucide-react'
import { avoidList } from '../data/avoid'
import type { AvoidEntry, Tip } from '../data/types'
import { useI18n } from '../i18n/useI18n'
import { sectionDomId } from '../router/routes'
import { TIP_ICON_MAP } from './icons'

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

export function TipCard({ tip }: { readonly tip: Tip }) {
  const { l } = useI18n()
  const Icon = TIP_ICON_MAP[tip.icon]
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
