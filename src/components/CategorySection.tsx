import { lookFor } from '../data/lookFor'
import { photos } from '../data/photos'
import type { Category, Item, ReferencePurchase } from '../data/types'
import { formatEuro, interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { sumEstimates } from '../lib/budget'
import { sectionDomId } from '../router/routes'
import { CATEGORY_ICONS } from './icons'
import { ItemCard } from './ItemCard'

interface Props {
  readonly category: Category
  /** Items of this category that pass the current filters. */
  readonly items: readonly Item[]
  /** Every item of this category, for the subtotal. */
  readonly allItems: readonly Item[]
  readonly references: ReadonlyMap<string, ReferencePurchase>
  readonly owned: ReadonlySet<string>
  readonly onToggle: (id: string) => void
}

export function CategorySection({ category, items, allItems, references, owned, onToggle }: Props) {
  const { lang, t, l } = useI18n()
  const headingId = `${category.id}-title`
  const subtotal = sumEstimates(allItems)
  const Icon = CATEGORY_ICONS[category.id]

  return (
    <section
      id={sectionDomId(category.id)}
      className="section category"
      aria-labelledby={headingId}
    >
      <header className="section-head">
        <span className="section-head__icon" aria-hidden="true">
          <Icon size={20} />
        </span>
        <div className="section-head__text">
          <h2 id={headingId}>{l(category.name)}</h2>
          <p>{l(category.intro)}</p>
        </div>
        <p className="section-head__meta">
          <span>{interpolate(t.categoryCount, { count: allItems.length })}</span>
          <span>
            {interpolate(t.categoryEstimate, {
              amount: formatEuro(Math.round(subtotal.typical), lang),
            })}
          </span>
        </p>
      </header>
      <div className="card-grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            reference={references.get(item.id)}
            photo={photos[item.id]}
            features={lookFor[item.id]}
            owned={owned.has(item.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  )
}
