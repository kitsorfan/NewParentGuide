import { CalendarDays } from 'lucide-react'
import { useId } from 'react'
import { useI18n } from '../i18n/useI18n'
import { describeAge } from '../lib/age'

interface Props {
  readonly birthDate: string | undefined
  readonly onChange: (date: string | undefined) => void
  readonly today: Date
}

export function BirthDateCard({ birthDate, onChange, today }: Props) {
  const { t } = useI18n()
  const inputId = useId()
  const hintId = useId()

  return (
    <div className="card birth-date">
      <span className="birth-date__icon" aria-hidden="true">
        <CalendarDays size={20} />
      </span>
      <div className="birth-date__field">
        <label htmlFor={inputId}>{t.birthDateLabel}</label>
        <div className="birth-date__row">
          <input
            id={inputId}
            type="date"
            className="input"
            value={birthDate ?? ''}
            aria-describedby={hintId}
            onChange={(event) => onChange(event.target.value || undefined)}
          />
          {birthDate && (
            <button type="button" className="text-button" onClick={() => onChange(undefined)}>
              {t.birthDateClear}
            </button>
          )}
        </div>
        <p id={hintId} className="birth-date__hint">
          {t.birthDateHint}
        </p>
      </div>
      {birthDate && (
        <p className="birth-date__age" aria-live="polite">
          {describeAge(birthDate, today, t)}
        </p>
      )}
    </div>
  )
}
