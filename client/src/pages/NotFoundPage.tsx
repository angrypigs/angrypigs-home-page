import { Link } from 'react-router'
import { PageHeading } from '../components/PageHeading'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-start gap-8">
      <PageHeading eyebrow="404" description="The requested signal could not be located.">
        Nothing here
      </PageHeading>
      <Link
        to="/"
        className="rounded-md bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Return home
      </Link>
    </div>
  )
}
