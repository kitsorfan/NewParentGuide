import { LANGS, type Lang } from '../../i18n/types'
import { useI18n } from '../../i18n/useI18n'

const LANG_LABELS: Record<Lang, { short: string; full: string }> = {
  el: { short: 'ΕΛ', full: 'Ελληνικά' },
  en: { short: 'EN', full: 'English' },
}

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()
  return (
    <fieldset className="segmented">
      <legend className="visually-hidden">{t.languageLabel}</legend>
      {LANGS.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          className="segmented__option"
          aria-pressed={lang === option}
          aria-label={LANG_LABELS[option].full}
          onClick={() => setLang(option)}
        >
          {LANG_LABELS[option].short}
        </button>
      ))}
    </fieldset>
  )
}
