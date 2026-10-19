import { LinkCard } from './components/LinkCard'

const links = [
  {
    title: 'YouTube',
    description: 'My music and releases.',
    href: 'https://www.youtube.com/@angrypigs_71830',
    external: true,
  },
  {
    title: 'GitHub',
    description: 'My projects and repositories.',
    href: 'https://github.com/angrypigs',
    external: true,
  },
  {
    title: 'Games',
    description: 'Logic games, experiments and other strange signals.',
    href: '/games',
  },
]

export function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src="/profile.png"
          alt="Angry Pigs avatar"
          className="h-28 w-28 rounded-2xl object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Angry Pigs</h1>
          <p className="mt-3 max-w-xl text-lg leading-8 text-copy-muted">
            Computer science, music, games and various things I make on the internet.
          </p>
        </div>
      </header>

      <section aria-labelledby="links-heading">
        <h2
          id="links-heading"
          className="mb-4 text-sm font-semibold tracking-wider text-copy-faint uppercase"
        >
          Links
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <LinkCard key={link.href} {...link} />
          ))}
        </div>
      </section>
    </div>
  )
}
