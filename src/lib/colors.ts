export const SUBJECT_COLORS = {
  math: 'oklch(0.65 0.20 300)',
  science: 'oklch(0.70 0.18 50)',
  coding: 'oklch(0.70 0.18 280)',
  arabic: 'oklch(0.68 0.16 30)',
} as const

export const ACTIVITY_COLORS = {
  purple: 'oklch(0.70 0.18 280)',
  blue: 'oklch(0.70 0.18 200)',
  cyan: 'oklch(0.65 0.20 200)',
  green: 'oklch(0.65 0.18 140)',
  yellow: 'oklch(0.70 0.18 50)',
  orange: 'oklch(0.70 0.18 300)',
  pink: 'oklch(0.65 0.20 250)',
} as const

export type SubjectColor = keyof typeof SUBJECT_COLORS
export type ActivityColor = keyof typeof ACTIVITY_COLORS
