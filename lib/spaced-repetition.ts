// SM-2 Spaced Repetition Algorithm
// Quality: 0-5
// 0: complete blackout
// 1: incorrect response; the correct one remembered
// 2: incorrect response; but upon seeing the correct answer it seemed easy
// 3: correct response recalled with serious difficulty
// 4: correct response after a hesitation
// 5: perfect response

export interface SM2Input {
  easeFactor: number
  interval: number
  repetitions: number
  quality: number // 0-5
}

export interface SM2Output {
  easeFactor: number
  interval: number
  repetitions: number
  dueDate: Date
}

export function sm2(input: SM2Input): SM2Output {
  const { quality } = input
  let { easeFactor, interval, repetitions } = input

  if (quality < 3) {
    // Incorrect answer: reset
    repetitions = 0
    interval = 1
  } else {
    // Correct answer
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + interval)

  return { easeFactor, interval, repetitions, dueDate }
}

// Map 4-button UI to SM-2 quality
export const REVIEW_QUALITY = {
  again: 0,
  hard: 2,
  good: 4,
  easy: 5,
} as const

export type ReviewQuality = keyof typeof REVIEW_QUALITY

export function getStatusFromSm2(repetitions: number, interval: number): string {
  if (repetitions === 0) return 'new'
  if (repetitions < 3) return 'learning'
  if (interval < 21) return 'reviewing'
  return 'mastered'
}
