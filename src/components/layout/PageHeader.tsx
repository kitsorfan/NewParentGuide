import type { ReactNode } from 'react'

interface Props {
  readonly kicker: string
  readonly title: string
  readonly lead: string
  readonly children?: ReactNode
}

/** The top of every page. The `h1` receives focus on navigation (see `useRoute`). */
export function PageHeader({ kicker, title, lead, children }: Props) {
  return (
    <header className="page-header">
      <p className="page-header__kicker">{kicker}</p>
      <h1 id="page-title" className="page-header__title" tabIndex={-1}>
        {title}
      </h1>
      <p className="page-header__lead">{lead}</p>
      {children}
    </header>
  )
}
