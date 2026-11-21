import { Moon, MoonStar, Sun, SunMoon, type LucideIcon } from 'lucide-react'
import { useI18n } from '../../i18n/useI18n'
import { THEMES, type Theme } from '../../theme/theme'

const ICONS: Record<Theme, LucideIcon> = {
  auto: SunMoon,
  light: Sun,
  dark: Moon,
  night: MoonStar,
}

interface Props {
  readonly theme: Theme
  readonly onChange: (theme: Theme) => void
}

export function ThemeSwitch({ theme, onChange }: Props) {
  const { t } = useI18n()
  return (
    <fieldset className="segmented segmented--icons">
      <legend className="visually-hidden">{t.themeLabel}</legend>
      {THEMES.map((option) => {
        const Icon = ICONS[option]
        return (
          <button
            key={option}
            type="button"
            className="segmented__option"
            aria-pressed={theme === option}
            aria-label={t.themes[option]}
            title={t.themes[option]}
            onClick={() => onChange(option)}
          >
            <Icon aria-hidden="true" size={16} />
          </button>
        )
      })}
    </fieldset>
  )
}
