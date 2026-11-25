import { useMemo } from 'react'
import type { Item } from '../data/types'
import { formatEuro, formatEuroRange, interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { budgetTiers, sumRemaining } from '../lib/budget'
import { completeIds, type OwnedCounts } from '../lib/owned'

interface Props {
  readonly items: readonly Item[]
  /** How many of each item the user has. */
  readonly counts: OwnedCounts
  readonly referenceTotal: number
  readonly referenceCount: number
  readonly onClearOwned: () => void
}

export function BudgetSummary({
  items,
  counts,
  referenceTotal,
  referenceCount,
  onClearOwned,
}: Props) {
  const { lang, t } = useI18n()
  const tiers = useMemo(() => budgetTiers(items), [items])
  const remaining = useMemo(() => sumRemaining(items, counts), [items, counts])
  const tierLabels = [t.budgetEssentials, t.budgetRecommended, t.budgetAll]
  const done = useMemo(() => completeIds(items, counts).size, [items, counts])
  const started = Object.keys(counts).length > 0
  const percent = items.length === 0 ? 0 : Math.round((done / items.length) * 100)

  return (
    <section className="budget" aria-labelledby="budget-title">
      <h2 id="budget-title" className="visually-hidden">
        {t.budgetTitle}
      </h2>
      <ul className="budget__tiles">
        {tiers.map((tier, index) => (
          <li key={tier.upTo} className="stat" data-priority={tier.upTo}>
            <span className="stat__label">
              <span className="badge__dot" aria-hidden="true" />
              {tierLabels[index]}
            </span>
            <span className="stat__value">
              {formatEuroRange(tier.estimate.min, tier.estimate.max, lang)}
            </span>
            <span className="stat__sub">
              {interpolate(t.budgetTypical, {
                amount: formatEuro(Math.round(tier.estimate.typical), lang),
              })}{' '}
              · {interpolate(t.budgetItems, { count: tier.itemCount })}
            </span>
          </li>
        ))}
        <li className="stat stat--reference">
          <span className="stat__label">{t.referenceTitle}</span>
          <span className="stat__value">{formatEuro(referenceTotal, lang)}</span>
          <span className="stat__sub">
            {interpolate(t.referenceBody, { count: referenceCount })}
          </span>
        </li>
      </ul>

      <div className="progress">
        <div className="progress__text">
          <span id="progress-label" className="progress__label">
            {interpolate(t.progressLabel, { done, total: items.length })}
          </span>
          <span className="progress__remaining">
            {interpolate(t.progressRemaining, {
              amount: formatEuro(Math.round(remaining.typical), lang),
            })}
          </span>
          {started && (
            <button
              type="button"
              className="text-button"
              onClick={() => {
                if (window.confirm(t.confirmClear)) onClearOwned()
              }}
            >
              {t.clearOwned}
            </button>
          )}
        </div>
        <progress
          className="progress__bar"
          aria-labelledby="progress-label"
          max={100}
          value={percent}
        >
          {percent}%
        </progress>
      </div>
    </section>
  )
}
