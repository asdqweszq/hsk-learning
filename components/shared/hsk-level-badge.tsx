import { cn } from '@/lib/utils'

const colors: Record<number, string> = {
  1: 'bg-green-100 text-green-800',
  2: 'bg-blue-100 text-blue-800',
  3: 'bg-orange-100 text-orange-800',
  4: 'bg-purple-100 text-purple-800',
  5: 'bg-red-100 text-red-800',
  6: 'bg-indigo-100 text-indigo-800',
}

export function HskLevelBadge({ level }: { level: number }) {
  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded-full text-xs font-semibold',
        colors[level as keyof typeof colors]
      )}
    >
      HSK {level}
    </span>
  )
}
