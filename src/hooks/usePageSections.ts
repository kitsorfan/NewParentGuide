import {
  Ban,
  BookOpen,
  Camera,
  CircleAlert,
  FileText,
  Lightbulb,
  ListChecks,
  Sparkles,
  Syringe,
} from 'lucide-react'
import { useMemo } from 'react'
import { BAG_ICONS, CATEGORY_ICONS } from '../components/icons'
import type { NavSection } from '../components/layout/Sidebar'
import { categories } from '../data/categories'
import { paperwork } from '../data/health'
import { bagGroups } from '../data/hospitalBag'
import { stages } from '../data/stages'
import type { Item } from '../data/types'
import { useI18n } from '../i18n/useI18n'
import { packedInGroup } from '../lib/bag'
import { itemsByCategory } from '../lib/catalog'
import type { PageId } from '../router/routes'

/** The sub-sections of a page, shown under it in the sidebar. */
export function usePageSections(
  page: PageId,
  owned: ReadonlySet<string>,
  packed: ReadonlySet<string>,
  visible: readonly Item[],
): readonly NavSection[] {
  const { t, l } = useI18n()

  return useMemo(() => {
    switch (page) {
      case 'checklist': {
        const visibleCategories = new Set(visible.map((item) => item.category))
        return [
          ...categories
            .filter((category) => visibleCategories.has(category.id))
            .map((category) => {
              const list = itemsByCategory.get(category.id) ?? []
              const done = list.filter((item) => owned.has(item.id)).length
              return {
                id: category.id,
                label: l(category.name),
                icon: CATEGORY_ICONS[category.id],
                meta: `${done}/${list.length}`,
              }
            }),
          { id: 'avoid', label: t.sectionLabels.avoid, icon: Ban },
          { id: 'tips', label: t.sectionLabels.tips, icon: Lightbulb },
        ]
      }
      case 'bag':
        return bagGroups.map((group) => ({
          id: group.id,
          label: l(group.title),
          icon: BAG_ICONS[group.icon],
          meta: `${packedInGroup(group, packed)}/${group.items.length}`,
        }))
      case 'guide':
        return [
          ...stages.map((stage) => ({ id: stage.id, label: l(stage.ageLabel) })),
          { id: 'always', label: t.sectionLabels.always, icon: Sparkles },
        ]
      case 'health':
        return [
          { id: 'timeline', label: t.sectionLabels.timeline, icon: ListChecks },
          { id: 'vaccines', label: t.sectionLabels.vaccines, icon: Syringe },
          ...(paperwork.length > 0
            ? [{ id: 'paperwork', label: t.sectionLabels.paperwork, icon: FileText }]
            : []),
        ]
      case 'sources':
        return [
          { id: 'guidance', label: t.sectionLabels.guidance, icon: BookOpen },
          { id: 'photos', label: t.sectionLabels.photos, icon: Camera },
          { id: 'notes', label: t.sectionLabels.notes, icon: CircleAlert },
        ]
    }
  }, [page, owned, packed, visible, t, l])
}
