import type { LiquidColor } from './utils/liquidColors'

export type Point = {
  x: number
  y: number
}

export type VialFill =
  | readonly []
  | readonly [LiquidColor]
  | readonly [LiquidColor, LiquidColor]
  | readonly [LiquidColor, LiquidColor, LiquidColor]
  | readonly [LiquidColor, LiquidColor, LiquidColor, LiquidColor]

export type VialData = {
  id: string
  width: number
  height: number
  fill: VialFill
}

export type PositionedVial = VialData & Point

export type VialAction = 'lift' | 'rotate'

export type VialHandle = {
  play: (action: VialAction) => Promise<void>
}
