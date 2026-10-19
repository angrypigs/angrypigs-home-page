import { NavLink, Outlet } from 'react-router'

const navigation = [
  { label: 'Home', to: '/', end: true },
  { label: 'Games', to: '/games', end: false },
]

export function SiteLayout() {
  return (
    <div className="min-h-dvh bg-page text-copy">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-accent px-4 py-2 font-semibold text-zinc-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>

      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-6">
        <header className="flex items-center justify-between border-b border-line py-5">
          <NavLink
            to="/"
            className="font-bold tracking-tight transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Angry Pigs
          </NavLink>

          <nav aria-label="Main navigation">
            <ul className="flex gap-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        isActive ? 'bg-surface-hover text-copy' : 'text-copy-muted hover:text-copy'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main id="main-content" className="flex-1 py-12 sm:py-16">
          <Outlet />
        </main>

        <footer className="border-t border-line py-6 text-sm text-copy-faint">
          © {new Date().getFullYear()} Angry Pigs
        </footer>
      </div>
    </div>
  )
}
