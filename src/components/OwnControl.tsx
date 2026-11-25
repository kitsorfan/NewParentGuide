import { Check, Minus, Plus } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import type { Item } from '../data/types'
import { formatQuantity, interpolate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import {
  MAX_COUNT,
  clampCount,
  extraCount,
  hasEnough,
  isCountable,
  neededQuantity,
} from '../lib/owned'

interface Props {
  readonly item: Item
  /** Localised item name, for the labels. */
  readonly name: string
  readonly count: number
  readonly onCountChange: (id: string, count: number) => void
}

/**
 * "I have it": a large tick button for one-off items, a − / number / + counter for items you need
 * several of (bodysuits, bottles…).
 */
export function OwnControl(props: Props) {
  return isCountable(props.item) ? <CountStepper {...props} /> : <OwnPill {...props} />
}

function OwnPill({ item, name, count, onCountChange }: Props) {
  const { t } = useI18n()
  const owned = hasEnough(item, count)
  return (
    <label className="own-pill" data-on={owned}>
      <input
        type="checkbox"
        checked={owned}
        onChange={(event) =>
          onCountChange(item.id, event.target.checked ? neededQuantity(item) : 0)
        }
        aria-label={interpolate(t.ownedLabel, { name })}
      />
      <span className="own-pill__box" aria-hidden="true">
        <Check size={14} strokeWidth={3} />
      </span>
      <span aria-hidden="true">{t.ownedShort}</span>
    </label>
  )
}

function CountStepper({ item, name, count, onCountChange }: Props) {
  const { t } = useI18n()
  // What the user is typing; `null` shows the saved count.
  const [draft, setDraft] = useState<string | null>(null)
  // Only announce counts the user changed, not every card on a language switch.
  const [touched, setTouched] = useState(false)

  const need = neededQuantity(item)
  const range = formatQuantity(item.quantity.min, item.quantity.max)
  const enough = hasEnough(item, count)
  const extra = extraCount(item, count)
  const missing = need - count
  const state = count === 0 ? 'none' : extra > 0 ? 'extra' : enough ? 'enough' : 'partial'
  const fill = { '--qty-fill': `${Math.min(1, count / need) * 100}%` } as CSSProperties

  const caption =
    state === 'partial'
      ? interpolate(t.countMissing, { count: missing })
      : state === 'extra'
        ? interpolate(t.countExtra, { count: extra })
        : ''
  const status = `${interpolate(t.countStatus, { count, need: range })}${caption && ` · ${caption}`}`

  const step = (delta: number) => {
    setTouched(true)
    onCountChange(item.id, clampCount(count + delta))
  }

  return (
    // The counter clips its fill, so the tooltip sits beside it in a wrapper.
    <div className="qty-wrap">
      <fieldset
        className="qty"
        data-state={state}
        style={fill}
        aria-label={interpolate(t.countGroupLabel, { name })}
      >
        <button
          type="button"
          className="qty__button"
          onClick={() => step(-1)}
          disabled={count === 0}
          aria-label={interpolate(t.countLess, { name })}
        >
          <Minus aria-hidden="true" size={16} strokeWidth={2.5} />
        </button>
        <span className="qty__value">
          {enough && <Check aria-hidden="true" className="qty__check" size={14} strokeWidth={3} />}
          <input
            className="qty__input"
            type="number"
            inputMode="numeric"
            min={0}
            max={MAX_COUNT}
            value={draft ?? String(count)}
            onFocus={(event) => event.target.select()}
            onChange={(event) => {
              const value = event.target.value
              setDraft(value)
              if (value.trim() !== '') onCountChange(item.id, clampCount(Number(value)))
            }}
            onBlur={() => setDraft(null)}
            aria-label={interpolate(t.countInputLabel, { name, need: range })}
          />
          <span className="qty__need" aria-hidden="true">
            / {range}
          </span>
        </span>
        <button
          type="button"
          className="qty__button"
          onClick={() => step(1)}
          disabled={count >= MAX_COUNT}
          aria-label={interpolate(t.countMore, { name })}
        >
          <Plus aria-hidden="true" size={16} strokeWidth={2.5} />
        </button>
        <span className="visually-hidden" aria-live="polite">
          {touched ? status : ''}
        </span>
      </fieldset>
      {/* Shown on hover/focus so the footer stays one line; screen readers get the live status. */}
      {caption && (
        <span className="qty-tip" data-state={state} aria-hidden="true">
          {caption}
        </span>
      )}
    </div>
  )
}
