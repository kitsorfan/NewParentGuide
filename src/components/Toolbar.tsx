import { Search, X } from 'lucide-react'
import { useId } from 'react'
import { PRIORITIES } from '../data/types'
import { interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { DEFAULT_FILTERS, isFiltering, togglePriority, type ItemFilters } from '../lib/filter'

interface Props {
  readonly filters: ItemFilters
  readonly onChange: (filters: ItemFilters) => void
  readonly visibleCount: number
  readonly totalCount: number
}

export function Toolbar({ filters, onChange, visibleCount, totalCount }: Props) {
  const { t } = useI18n()
  const searchId = useId()

  return (
    <div className="toolbar">
      <div className="search">
        <label htmlFor={searchId} className="visually-hidden">
          {t.searchLabel}
        </label>
        <Search aria-hidden="true" size={16} className="search__icon" />
        <input
          id={searchId}
          type="search"
          className="search__input"
          placeholder={t.searchPlaceholder}
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          autoComplete="off"
        />
      </div>

      <fieldset className="chips">
        <legend className="visually-hidden">{t.filterPriority}</legend>
        {PRIORITIES.map((priority) => (
          <button
            key={priority}
            type="button"
            className="chip"
            data-priority={priority}
            aria-pressed={filters.priorities.includes(priority)}
            onClick={() =>
              onChange({ ...filters, priorities: togglePriority(filters.priorities, priority) })
            }
          >
            <span className="badge__dot" aria-hidden="true" />
            {t.priority[priority]}
          </button>
        ))}
      </fieldset>

      <label className="switch">
        <input
          type="checkbox"
          checked={filters.hideOwned}
          onChange={(event) => onChange({ ...filters, hideOwned: event.target.checked })}
        />
        <span className="switch__track" aria-hidden="true" />
        <span>{t.hideOwned}</span>
      </label>

      <div className="toolbar__end">
        <p className="toolbar__count" aria-live="polite">
          {interpolate(t.resultsCount, { count: visibleCount, total: totalCount })}
        </p>
        {isFiltering(filters) && (
          <button type="button" className="text-button" onClick={() => onChange(DEFAULT_FILTERS)}>
            <X aria-hidden="true" size={14} />
            {t.resetFilters}
          </button>
        )}
      </div>
    </div>
  )
}
