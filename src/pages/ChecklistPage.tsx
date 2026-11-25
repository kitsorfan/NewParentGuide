import { Info } from 'lucide-react'
import { BudgetSummary } from '../components/BudgetSummary'
import { CategorySection } from '../components/CategorySection'
import { AvoidSection, TipCard } from '../components/ContentBlocks'
import { PageHeader } from '../components/layout/PageHeader'
import { PriorityBadge } from '../components/PriorityBadge'
import { Toolbar } from '../components/Toolbar'
import { categories } from '../data/categories'
import { items } from '../data/items'
import { REFERENCE_ORDER_TOTAL, referenceOrder } from '../data/referenceOrder'
import { groupByCategory, itemsByCategory, references } from '../lib/catalog'
import { tips } from '../data/tips'
import { PRIORITIES, type Item } from '../data/types'
import type { OwnedItems } from '../hooks/useOwnedItems'
import { useI18n } from '../i18n/useI18n'
import type { ItemFilters } from '../lib/filter'
import { sectionDomId } from '../router/routes'

const shoppingTips = tips.filter((tip) => tip.page === 'checklist')

interface Props extends OwnedItems {
  readonly filters: ItemFilters
  readonly onFiltersChange: (filters: ItemFilters) => void
  readonly visible: readonly Item[]
}

export function ChecklistPage({
  counts,
  skipped,
  setCount,
  setSkipped,
  clear,
  filters,
  onFiltersChange,
  visible,
}: Props) {
  const { t } = useI18n()
  const visibleByCategory = groupByCategory(visible)

  return (
    <>
      <PageHeader kicker={t.checklistKicker} title={t.checklistTitle} lead={t.checklistLead}>
        <ul className="legend">
          {PRIORITIES.map((priority) => (
            <li key={priority}>
              <PriorityBadge priority={priority} />
              <span>{t.priorityDescription[priority]}</span>
            </li>
          ))}
        </ul>
      </PageHeader>

      <BudgetSummary
        items={items}
        counts={counts}
        skipped={skipped}
        referenceTotal={REFERENCE_ORDER_TOTAL}
        referenceCount={referenceOrder.length}
        onClearOwned={clear}
      />

      <p className="hint-banner">
        <Info aria-hidden="true" size={16} />
        {t.legendHint}
      </p>

      <Toolbar
        filters={filters}
        onChange={onFiltersChange}
        visibleCount={visible.length}
        totalCount={items.length}
      />

      {categories.map((category) => {
        const categoryItems = visibleByCategory.get(category.id)
        if (!categoryItems) return null
        return (
          <CategorySection
            key={category.id}
            category={category}
            items={categoryItems}
            allItems={itemsByCategory.get(category.id) ?? []}
            references={references}
            counts={counts}
            skipped={skipped}
            onCountChange={setCount}
            onSkipChange={setSkipped}
          />
        )
      })}
      {visible.length === 0 && <p className="empty">{t.noResults}</p>}

      <AvoidSection />

      <section id={sectionDomId('tips')} className="section" aria-labelledby="tips-title">
        <header className="section-head section-head--plain">
          <div className="section-head__text">
            <h2 id="tips-title">{t.shoppingTipsTitle}</h2>
          </div>
        </header>
        <div className="card-grid card-grid--wide">
          {shoppingTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </section>
    </>
  )
}
