import { ArrowUpRight, Check, ChevronDown, ListChecks } from 'lucide-react'
import { memo } from 'react'
import type { Item, PhotoCredit, ReferencePurchase } from '../data/types'
import type { Localized } from '../i18n/types'
import { formatEuro, formatEuroRange, formatQuantity, interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { itemEstimate } from '../lib/budget'
import { skroutzSearchUrl } from '../lib/links'
import { CATEGORY_ICONS } from './icons'
import { InfoHint } from './InfoHint'
import { PriorityBadge } from './PriorityBadge'

interface Props {
  readonly item: Item
  readonly reference: ReferencePurchase | undefined
  readonly photo: PhotoCredit | undefined
  /** What to look for when buying. */
  readonly features: readonly Localized[] | undefined
  readonly owned: boolean
  readonly onToggle: (id: string) => void
}

export const ItemCard = memo(function ItemCard({
  item,
  reference,
  photo,
  features,
  owned,
  onToggle,
}: Props) {
  const { lang, t, l } = useI18n()
  const name = l(item.name)
  const units = t.units[item.unit]
  const unitLabel = item.quantity.max === 1 ? units.one : units.other
  const estimate = itemEstimate(item)
  const showTotal = item.quantity.max > 1
  const PlaceholderIcon = CATEGORY_ICONS[item.category]

  const hint = (
    <>
      <p className="hint__title">{t.whyTitle}</p>
      <p>{l(item.why)}</p>
      {item.tip && (
        <>
          <p className="hint__title">{t.tipTitle}</p>
          <p>{l(item.tip)}</p>
        </>
      )}
    </>
  )

  return (
    <article
      className={`card item-card${owned ? ' is-owned' : ''}`}
      data-priority={item.priority}
      data-testid={`item-${item.id}`}
    >
      <div className={`item-card__media${photo ? '' : ' item-card__media--empty'}`}>
        {photo ? (
          <img
            src={`${import.meta.env.BASE_URL}${photo.file}`}
            alt=""
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <PlaceholderIcon
            aria-hidden="true"
            className="item-card__placeholder"
            strokeWidth={1.25}
          />
        )}
        <PriorityBadge priority={item.priority} />
      </div>

      <div className="item-card__body">
        <InfoHint label={interpolate(t.showWhy, { name })} content={hint}>
          <h3 className="item-card__name">{name}</h3>
        </InfoHint>

        <div className="item-card__tags">
          <span className="tag">
            <span className="visually-hidden">{t.whenLabel}: </span>
            {t.timing[item.timing]}
          </span>
          {item.countInBudget === false && <span className="tag tag--muted">{t.notInBudget}</span>}
        </div>

        {item.condition && <p className="item-card__condition">{l(item.condition)}</p>}

        <dl className="item-card__facts">
          <div>
            <dt>{t.quantityLabel}</dt>
            <dd>
              {formatQuantity(item.quantity.min, item.quantity.max)} {unitLabel}
            </dd>
          </div>
          <div>
            <dt>{showTotal ? t.priceLabel : t.priceSingleLabel}</dt>
            <dd>{formatEuroRange(item.price.min, item.price.max, lang)}</dd>
          </div>
          {showTotal && (
            <div>
              <dt>{t.totalLabel}</dt>
              <dd>~{formatEuro(Math.round(estimate.typical), lang)}</dd>
            </div>
          )}
        </dl>

        {item.priceNote && <p className="item-card__note">{l(item.priceNote)}</p>}

        {features && (
          <details className="look-for">
            <summary className="look-for__summary">
              <ListChecks aria-hidden="true" size={15} />
              {t.lookForTitle}
              <span className="look-for__count">{features.length}</span>
              <ChevronDown aria-hidden="true" size={15} className="look-for__chevron" />
            </summary>
            <ul className="look-for__list">
              {features.map((feature) => (
                <li key={feature.en}>
                  <Check aria-hidden="true" size={13} strokeWidth={2.5} />
                  {l(feature)}
                </li>
              ))}
            </ul>
          </details>
        )}

        {reference && (
          <div className="item-card__ref">
            <span className="item-card__ref-label">{t.referenceLabel}</span>
            <span className="item-card__ref-product">{l(reference.product)}</span>
            <span className="item-card__ref-price">
              {reference.quantity > 1
                ? `${reference.quantity} × ${formatEuro(reference.unitPrice, lang)} = ${formatEuro(reference.lineTotal, lang)}`
                : formatEuro(reference.lineTotal, lang)}
            </span>
          </div>
        )}

        <div className="item-card__footer">
          <label className="own-toggle">
            <input
              type="checkbox"
              checked={owned}
              onChange={() => onToggle(item.id)}
              aria-label={interpolate(t.ownedLabel, { name })}
            />
            <span className="own-toggle__box" aria-hidden="true">
              <Check size={14} strokeWidth={3} />
            </span>
            <span aria-hidden="true">{t.ownedShort}</span>
          </label>
          <a
            className="arrow-link"
            href={skroutzSearchUrl(item.searchTerm)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={interpolate(t.skroutzLinkLabel, { name })}
          >
            {t.skroutzLink}
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </article>
  )
})
