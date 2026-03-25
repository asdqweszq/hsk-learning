import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const HSK_LEVELS = [1, 2, 3, 4, 5, 6] as const
export type HskLevel = typeof HSK_LEVELS[number]

export const HSK_LEVEL_COLORS: Record<number, string> = {
  1: 'bg-green-500 text-white',
  2: 'bg-blue-500 text-white',
  3: 'bg-orange-500 text-white',
  4: 'bg-purple-500 text-white',
  5: 'bg-red-500 text-white',
  6: 'bg-indigo-500 text-white',
}

export const HSK_LEVEL_NAMES: Record<number, string> = {
  1: 'HSK 1',
  2: 'HSK 2',
  3: 'HSK 3',
  4: 'HSK 4',
  5: 'HSK 5',
  6: 'HSK 6',
}

export const HSK_WORD_COUNTS: Record<number, number> = {
  1: 150,
  2: 150,
  3: 300,
  4: 600,
  5: 1300,
  6: 2500,
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (minutes === 0) return `${secs}秒`
  if (secs === 0) return `${minutes}分钟`
  return `${minutes}分${secs}秒`
}

export function getTodayStart(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export function normalizePinyin(pinyin: string): string {
  return pinyin
    .toLowerCase()
    .replace(/[āáǎà]/g, 'a')
    .replace(/[ēéěè]/g, 'e')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ōóǒò]/g, 'o')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[ǖǘǚǜ]/g, 'u')
}

export function getToneNumber(syllable: string): number {
  if (/[āēīōūǖ]/.test(syllable)) return 1
  if (/[áéíóúǘ]/.test(syllable)) return 2
  if (/[ǎěǐǒǔǚ]/.test(syllable)) return 3
  if (/[àèìòùǜ]/.test(syllable)) return 4
  return 5
}

export const TONE_COLORS: Record<number, string> = {
  1: 'text-red-500',
  2: 'text-amber-500',
  3: 'text-green-600',
  4: 'text-blue-600',
  5: 'text-gray-500',
}
