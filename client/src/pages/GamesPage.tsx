import { GameCard } from '../components/GameCard'
import { PageHeading } from '../components/PageHeading'
import { games } from '../data/games'

export function GamesPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeading description="Small logic games and interactive experiments. Some may be more connected than they first appear.">
        Games
      </PageHeading>

      <section aria-label="Available games" className="grid gap-4 sm:grid-cols-2">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </section>
    </div>
  )
}
