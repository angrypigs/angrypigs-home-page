import type { ReactNode } from 'react'

type PageHeadingProps = {
  children: ReactNode
  description: string
  eyebrow?: string
}

export function PageHeading({ children, description, eyebrow }: PageHeadingProps) {
  return (
    <header>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-widest text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{children}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-copy-muted">{description}</p>
    </header>
  )
}
