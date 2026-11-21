import { bagGroups, type BagGroup } from '../data/hospitalBag'

/** Bag entries are namespaced by group so ids stay unique across groups. */
export function bagEntryId(groupId: string, itemId: string): string {
  return `${groupId}/${itemId}`
}

export const BAG_TOTAL = bagGroups.reduce((sum, group) => sum + group.items.length, 0)

export function packedInGroup(group: BagGroup, packed: ReadonlySet<string>): number {
  return group.items.filter((entry) => packed.has(bagEntryId(group.id, entry.id))).length
}

export function packedTotal(packed: ReadonlySet<string>): number {
  return bagGroups.reduce((sum, group) => sum + packedInGroup(group, packed), 0)
}
