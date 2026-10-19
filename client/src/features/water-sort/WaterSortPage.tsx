import { useRef } from 'react'
import { Vial } from './components/Vial'
import type { Point, PositionedVial, VialAction, VialData, VialHandle } from './types'

const canvas = {
  width: 960,
  height: 360,
}

const vialArea = {
  left: 40,
  right: 520,
  top: 70,
}

const vials: VialData[] = [
  { id: 'vial-1', width: 64, height: 210, fill: ['cyan', 'cyan', 'magenta', 'blue'] },
  { id: 'vial-2', width: 64, height: 210, fill: ['violet', 'magenta'] },
  { id: 'vial-3', width: 64, height: 210, fill: ['blue', 'yellow', 'green'] },
  { id: 'vial-4', width: 64, height: 210, fill: [] },
]

function layoutVials(vials: VialData[]): PositionedVial[] {
  const areaWidth = vialArea.right - vialArea.left
  const slotWidth = areaWidth / vials.length

  return vials.map((vial, index) => ({
    ...vial,
    x: vialArea.left + slotWidth * (index + 0.5),
    y: vialArea.top,
  }))
}

function getVialPoints(vial: PositionedVial) {
  return {
    mouth: { x: vial.x, y: vial.y },
    leftLip: { x: vial.x - vial.width / 2, y: vial.y },
    rightLip: { x: vial.x + vial.width / 2, y: vial.y },
    center: { x: vial.x, y: vial.y + vial.height / 2 },
    bottom: { x: vial.x, y: vial.y + vial.height },
  }
}

const positionedVials = layoutVials(vials)
const lastVial = positionedVials.at(-1)

if (!lastVial) {
  throw new Error('At least one vial is required.')
}

const lastVialPoints = getVialPoints(lastVial)
const curveStart: Point = {
  x: lastVialPoints.rightLip.x + 88,
  y: lastVialPoints.rightLip.y + 30,
}
const curveControl: Point = { x: curveStart.x + 190, y: curveStart.y - 30 }
const curveEnd: Point = { x: curveStart.x + 260, y: curveStart.y + 180 }

export function WaterSortPage() {
  const vialRefs = useRef<Record<string, VialHandle | null>>({})
  const gameBusy = useRef(false)

  async function handleVialClick(id: string) {
    if (gameBusy.current) return

    const vial = vialRefs.current[id]
    if (!vial) return

    gameBusy.current = true

    try {
      const action: VialAction[] = Math.random() < 0.5 ? ['lift'] : ['lift', 'rotate']
      for (const item of action) {
        await vial.play(item)
      }
    } catch (error) {
      console.error('Nie udało się odtworzyć animacji fiolki:', error)
    } finally {
      gameBusy.current = false
    }
  }

  const curvePath = [
    `M ${curveStart.x} ${curveStart.y}`,
    `Q ${curveControl.x} ${curveControl.y} ${curveEnd.x} ${curveEnd.y}`,
  ].join(' ')

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Water Sort Puzzle</h1>
        <p className="mt-3 max-w-2xl leading-7 text-copy-muted">
          Prosty sandbox do zbudowania animacji przelewania krok po kroku.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <svg
          aria-label="Klikalne fiolki i kwadratowa krzywa Béziera"
          className="w-full rounded-card border border-line bg-surface select-none"
          role="img"
          viewBox={`0 0 ${canvas.width} ${canvas.height}`}
        >
          {positionedVials.map((vial) => (
            <Vial
              key={vial.id}
              {...vial}
              ref={(instance) => {
                vialRefs.current[vial.id] = instance
              }}
              onClick={handleVialClick}
            />
          ))}

          <path d={curvePath} fill="none" stroke="#d946ef" strokeLinecap="round" strokeWidth="7" />
          <circle cx={curveStart.x} cy={curveStart.y} fill="#d946ef" r="7" />
          <circle cx={curveEnd.x} cy={curveEnd.y} fill="#d946ef" r="7" />
          <text x={curveStart.x - 24} y={curveStart.y - 14} fill="currentColor" fontSize="18">
            A
          </text>
          <text x={curveEnd.x + 14} y={curveEnd.y + 6} fill="currentColor" fontSize="18">
            B
          </text>
        </svg>

        <p className="text-sm text-copy-muted">
          Kliknij fiolkę: 50% szans na podniesienie i 50% na obrót. Podczas animacji gra ignoruje
          kolejne kliknięcia.
        </p>
      </div>
    </div>
  )
}
