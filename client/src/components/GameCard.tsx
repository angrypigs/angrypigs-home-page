import type { Game } from '../data/games'
import { ButtonLink } from './ButtonLink'

type GameCardProps = {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="rounded-card border border-line bg-surface p-6">
      <h2 className="mt-3 text-xl font-bold tracking-tight">{game.title}</h2>
      <p className="mt-2 leading-7 text-copy-muted">{game.description}</p>

      <div className="mt-6">
        <ButtonLink to={`/games/${game.slug}`}>Play game</ButtonLink>
      </div>
    </article>
  )
}
