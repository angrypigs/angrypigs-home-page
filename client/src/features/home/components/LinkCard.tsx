import { Link } from 'react-router'

type LinkCardProps = {
  description: string
  href: string
  title: string
  external?: boolean
}

const cardClassName =
  'block rounded-card border border-line bg-surface p-5 transition-transform duration-200 hover:scale-105 transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

const content = (title: string, description: string) => (
  <>
    <h3 className="font-semibold text-copy">{title}</h3>
    <p className="mt-1 text-sm leading-6 text-copy-muted">{description}</p>
  </>
)

export function LinkCard({ description, external = false, href, title }: LinkCardProps) {
  if (external) {
    return (
      <a href={href} className={cardClassName}>
        {content(title, description)}
      </a>
    )
  }

  return (
    <Link to={href} className={cardClassName}>
      {content(title, description)}
    </Link>
  )
}
