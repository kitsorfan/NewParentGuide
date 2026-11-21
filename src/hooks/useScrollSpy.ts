import { useEffect, useState } from 'react'
import { sectionDomId } from '../router/routes'

/**
 * Returns the section currently in view (for highlighting it in the sidebar).
 * Without IntersectionObserver (old browsers, tests) it simply returns `undefined`.
 */
export function useScrollSpy(sections: readonly string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(undefined)
  const key = sections.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const ids = key === '' ? [] : key.split('|')
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target.id.replace(/^sec-/, '')
          if (entry.isIntersecting) visible.add(section)
          else visible.delete(section)
        }
        // The first section (in page order) that is inside the "reading band" wins.
        setActive(ids.find((id) => visible.has(id)))
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    for (const id of ids) {
      const element = document.getElementById(sectionDomId(id))
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [key])

  return active
}
