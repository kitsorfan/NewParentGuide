import type { Priority } from '../data/types'
import { useI18n } from '../i18n/useI18n'

export function PriorityBadge({ priority }: { readonly priority: Priority }) {
  const { t } = useI18n()
  return (
    <span className="badge" data-priority={priority}>
      <span className="badge__dot" aria-hidden="true" />
      {t.priority[priority]}
    </span>
  )
}
