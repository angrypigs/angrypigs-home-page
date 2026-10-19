import type { ReactNode } from 'react'
import { Link } from 'react-router'

type ButtonLinkProps = {
  children: ReactNode
  to: string
}

export function ButtonLink({ children, to }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex rounded-md bg-(image:--gradient-accent) px-4 py-2 text-sm font-semibold text-white transition-[filter] hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {children}
    </Link>
  )
}
