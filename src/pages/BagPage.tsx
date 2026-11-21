import { ArrowRight, Check, Lightbulb } from 'lucide-react'
import { BAG_ICONS } from '../components/icons'
import { PageHeader } from '../components/layout/PageHeader'
import { bagGroups, bagTips, type BagGroup } from '../data/hospitalBag'
import { items } from '../data/items'
import type { IdSet } from '../hooks/useIdSet'
import { interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { BAG_TOTAL, bagEntryId, packedInGroup, packedTotal } from '../lib/bag'
import { routeHref, sectionDomId } from '../router/routes'

const itemCategory = new Map(items.map((item) => [item.id, item.category]))

function BagGroupCard({
  group,
  packed,
  onToggle,
}: {
  readonly group: BagGroup
  readonly packed: ReadonlySet<string>
  readonly onToggle: (id: string) => void
}) {
  const { t, l } = useI18n()
  const Icon = BAG_ICONS[group.icon]
  const done = packedInGroup(group, packed)
  const headingId = `${group.id}-title`

  return (
    <section id={sectionDomId(group.id)} className="card bag-group" aria-labelledby={headingId}>
      <header className="bag-group__head">
        <span className="tip__icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        <h2 id={headingId}>{l(group.title)}</h2>
        <span className="bag-group__count">
          {done}/{group.items.length}
        </span>
      </header>
      <ul className="bag-list">
        {group.items.map((entry) => {
          const id = bagEntryId(group.id, entry.id)
          const isPacked = packed.has(id)
          const name = l(entry.name)
          const category = entry.itemId ? itemCategory.get(entry.itemId) : undefined
          return (
            <li key={entry.id} className={isPacked ? 'is-packed' : undefined}>
              <label className="check">
                <input
                  type="checkbox"
                  checked={isPacked}
                  onChange={() => onToggle(id)}
                  aria-label={interpolate(t.packedLabel, { name })}
                />
                <span className="check__box" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="check__text" aria-hidden="true">
                  <span className="check__label">{name}</span>
                  {entry.note && <span className="check__note">{l(entry.note)}</span>}
                </span>
              </label>
              {category && (
                <a
                  className="arrow-link"
                  href={routeHref('checklist', category)}
                  aria-label={interpolate(t.bagInListLabel, { name })}
                >
                  {t.bagInList}
                  <ArrowRight aria-hidden="true" size={13} />
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function BagPage({ owned: packed, toggle, clear }: IdSet) {
  const { t, l } = useI18n()
  const done = packedTotal(packed)
  const percent = Math.round((done / BAG_TOTAL) * 100)

  return (
    <>
      <PageHeader kicker={t.bagKicker} title={t.bagTitle} lead={t.bagLead}>
        <div className="bag-progress">
          <span id="bag-progress-label" className="progress__label">
            {interpolate(t.bagProgress, { done, total: BAG_TOTAL })}
          </span>
          <progress
            className="progress__bar"
            aria-labelledby="bag-progress-label"
            max={100}
            value={percent}
          >
            {percent}%
          </progress>
          {done > 0 && (
            <button
              type="button"
              className="text-button"
              onClick={() => {
                if (window.confirm(t.confirmClear)) clear()
              }}
            >
              {t.clearOwned}
            </button>
          )}
        </div>
      </PageHeader>

      <article className="card tip">
        <h2 className="tip__title">
          <span className="tip__icon" aria-hidden="true">
            <Lightbulb size={18} />
          </span>
          {t.bagTipsTitle}
        </h2>
        <ul className="tip__list">
          {bagTips.map((tip) => (
            <li key={tip.en}>{l(tip)}</li>
          ))}
        </ul>
      </article>

      <div className="two-col section">
        {bagGroups.map((group) => (
          <BagGroupCard key={group.id} group={group} packed={packed} onToggle={toggle} />
        ))}
      </div>
    </>
  )
}
