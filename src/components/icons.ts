import {
  Baby,
  Bath,
  BookOpen,
  CalendarHeart,
  Car,
  FileText,
  Heart,
  HeartPulse,
  Hospital,
  Lightbulb,
  Luggage,
  Milk,
  Moon,
  Phone,
  Pill,
  Puzzle,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smile,
  Snowflake,
  Sparkles,
  Stethoscope,
  Syringe,
  TestTube,
  Users,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import type { BagGroupIcon } from '../data/hospitalBag'
import type { StageTopicId } from '../data/stages'
import type { CategoryId, TipIcon } from '../data/types'
import type { PageId } from '../router/routes'

export const PAGE_ICONS: Record<PageId, LucideIcon> = {
  checklist: ShoppingBag,
  bag: Luggage,
  guide: CalendarHeart,
  health: Syringe,
  sources: BookOpen,
}

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  sleep: Moon,
  travel: Car,
  feeding: Milk,
  diapering: Baby,
  bath: Bath,
  health: Stethoscope,
  clothing: Shirt,
  mom: Heart,
  play: Puzzle,
}

export const TIP_ICON_MAP: Record<TipIcon, LucideIcon> = {
  sleep: Moon,
  winter: Snowflake,
  hospital: Hospital,
  smart: Lightbulb,
  health: Phone,
}

export const TOPIC_ICONS: Record<StageTopicId, LucideIcon> = {
  feeding: Utensils,
  sleep: Moon,
  development: Smile,
  care: HeartPulse,
  safety: ShieldCheck,
  parents: Sparkles,
}

export const HEALTH_KIND_ICONS = {
  vaccine: Syringe,
  screening: TestTube,
  checkup: Stethoscope,
  supplement: Pill,
  paperwork: FileText,
} as const satisfies Record<string, LucideIcon>

export const BAG_ICONS: Record<BagGroupIcon, LucideIcon> = {
  documents: FileText,
  labour: HeartPulse,
  mum: Heart,
  baby: Baby,
  partner: Users,
  home: Car,
}
