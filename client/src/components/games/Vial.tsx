import {
  useId,
  useImperativeHandle,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
} from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { liquidColors, type LiquidColor } from '../../utils/liquidColors'

export type Point = {
  x: number
  y: number
}

export type VialData = {
  id: string
  width: number
  height: number
  fill: VialFill
}

export type VialFill =
  | readonly []
  | readonly [LiquidColor]
  | readonly [LiquidColor, LiquidColor]
  | readonly [LiquidColor, LiquidColor, LiquidColor]
  | readonly [LiquidColor, LiquidColor, LiquidColor, LiquidColor]

export type PositionedVial = VialData & Point

// Polecenia, które rodzic może wysłać do fiolki.
export type VialAction = 'lift' | 'rotate'

// Publiczna metoda udostępniana rodzicowi przez ref.
export type VialHandle = {
  play: (action: VialAction) => Promise<void>
}

type VialProps = PositionedVial & {
  onClick?: (id: string) => void
  ref?: Ref<VialHandle>
}

function createVialPath(vial: PositionedVial, closed = false) {
  const left = vial.x - vial.width / 2 + 5
  const right = vial.x + vial.width / 2 - 5
  const bottom = vial.y + vial.height - 5
  const radius = vial.width / 2

  return [
    `M ${left} ${vial.y}`,
    `V ${bottom - radius}`,
    `Q ${left} ${bottom} ${vial.x} ${bottom}`,
    `Q ${right} ${bottom} ${right} ${bottom - radius}`,
    `V ${vial.y}`,
    closed ? `H ${left} Z` : '',
  ].join(' ')
}

export function Vial({ onClick, ref, ...vial }: VialProps) {
  const controls = useAnimationControls()
  // Kolejka należy do fiolki, nie do gry. Kolejne wywołania play() czekają na poprzednie.
  const animationQueue = useRef<Promise<void>>(Promise.resolve())
  const clipId = `vial-${useId().replaceAll(':', '')}`
  const inset = 7
  const innerWidth = vial.width - inset * 2
  const innerBottom = vial.y + vial.height - inset
  const layerHeight = (vial.height - inset * 2) / 4

  // Animacje są uruchamiane po jednej, nigdy równocześnie.
  function runAnimation(action: VialAction): Promise<void> {
    switch (action) {
      case 'lift':
        return controls.start({
          y: [0, -35, 0],
          rotate: 0,
          transition: {
            duration: 0.8,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          },
        })

      case 'rotate':
        return controls.start({
          y: 0,
          rotate: [0, 65, 0],
          transition: {
            duration: 1.4,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          },
        })
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      play(action: VialAction) {
        // Nie uruchamiamy animacji od razu: dokładamy ją za poprzednią.
        const next = animationQueue.current.then(() => runAnimation(action))

        // Błąd jednej animacji nie może zatrzymać całej kolejki.
        animationQueue.current = next.catch(() => {})

        // Wywołujący może użyć await, by zaczekać na SWOJĄ animację.
        return next
      },
    }),
    [controls],
  )

  function handleClick() {
    onClick?.(vial.id)
  }

  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  function handleMouseDown(event: MouseEvent<SVGGElement>) {
    event.preventDefault()
  }

  return (
    <>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={createVialPath(vial, true)} />
        </clipPath>
      </defs>

      <motion.g
        animate={controls}
        aria-label={`Fiolka ${vial.id}`}
        initial={{ rotate: 0, y: 0 }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        role="button"
        style={{
          cursor: 'pointer',
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
        tabIndex={0}
      >
        <g clipPath={`url(#${clipId})`}>
          {vial.fill.map((color, index) => (
            <rect
              fill={liquidColors[color]}
              height={layerHeight + 1}
              key={`${index}-${color}`}
              width={innerWidth}
              x={vial.x - innerWidth / 2}
              y={innerBottom - (index + 1) * layerHeight}
            />
          ))}
        </g>
        <path
          d={createVialPath(vial)}
          fill="rgb(255 255 255 / 0.025)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
      </motion.g>
    </>
  )
}
