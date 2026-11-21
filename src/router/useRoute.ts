import { useEffect, useRef, useSyncExternalStore } from 'react'
import { parseHash, sectionDomId, type Route } from './routes'

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

/** Scrolls to a section of the current page, or to the top when there is none. */
export function scrollToSection(section: string | undefined): void {
  const target = section ? document.getElementById(sectionDomId(section)) : null
  if (target) {
    target.scrollIntoView?.({ block: 'start' })
    return
  }
  window.scrollTo?.({ top: 0 })
}

/**
 * The current route. On navigation it scrolls to the requested section (or the top), and when the
 * page changes it moves focus to the page heading so screen-reader users hear the new page.
 */
export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getHash, () => '')
  const route = parseHash(hash)
  const previousPage = useRef(route.page)

  useEffect(() => {
    const pageChanged = previousPage.current !== route.page
    previousPage.current = route.page
    // Wait a frame so the new page is in the DOM before scrolling.
    const frame = requestAnimationFrame(() => {
      scrollToSection(route.section)
      if (pageChanged) document.getElementById('page-title')?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [route.page, route.section])

  return route
}
