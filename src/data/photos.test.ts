import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { items } from './items'
import { photos } from './photos'

const itemIds = new Set(items.map((item) => item.id))
const entries = Object.entries(photos)

describe('item photos', () => {
  it('belong to real items and point to files that exist', () => {
    const problems = entries.flatMap(([id, photo]) => {
      if (!photo) return [`${id}: empty entry`]
      const issues: string[] = []
      if (!itemIds.has(id)) issues.push(`${id}: unknown item`)
      if (photo.file !== `images/items/${id}.webp`) issues.push(`${id}: unexpected path`)
      if (!existsSync(join(process.cwd(), 'public', photo.file))) issues.push(`${id}: missing file`)
      return issues
    })
    expect(problems).toEqual([])
  })

  it('credit every photo with an https source and a licence', () => {
    const problems = entries.flatMap(([id, photo]) =>
      photo &&
      new URL(photo.sourceUrl).protocol === 'https:' &&
      photo.license.trim() !== '' &&
      photo.creator.trim() !== ''
        ? []
        : [id],
    )
    expect(problems).toEqual([])
  })
})
