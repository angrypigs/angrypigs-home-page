export const liquidColors = {
  blue: '#2563eb',
  cyan: '#38bdf8',
  green: '#22c55e',
  magenta: '#d946ef',
  orange: '#f97316',
  red: '#ef4444',
  violet: '#8b5cf6',
  yellow: '#facc15',
} as const

export type LiquidColor = keyof typeof liquidColors
