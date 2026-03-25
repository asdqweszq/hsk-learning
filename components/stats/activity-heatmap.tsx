'use client'

import { cn } from '@/lib/utils'

interface DayStat {
  date: string
  minutesStudied: number
}

interface ActivityHeatmapProps {
  dailyStats: DayStat[]
}

function getIntensityClass(minutes: number): string {
  if (minutes === 0) return 'bg-muted'
  if (minutes <= 5) return 'bg-green-200 dark:bg-green-900'
  if (minutes <= 15) return 'bg-green-400 dark:bg-green-700'
  if (minutes <= 30) return 'bg-green-600 dark:bg-green-500'
  return 'bg-green-800 dark:bg-green-300'
}

function getIntensityLabel(minutes: number): string {
  if (minutes === 0) return '未学习'
  if (minutes <= 5) return `${minutes} 分钟（轻度）`
  if (minutes <= 15) return `${minutes} 分钟（一般）`
  if (minutes <= 30) return `${minutes} 分钟（良好）`
  return `${minutes} 分钟（优秀）`
}

const DAYS_OF_WEEK = ['日', '一', '二', '三', '四', '五', '六']
const WEEKS = 13

export default function ActivityHeatmap({ dailyStats }: ActivityHeatmapProps) {
  // Build a map of dateString -> minutesStudied
  const statsMap = new Map<string, number>()
  for (const stat of dailyStats) {
    const d = new Date(stat.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    statsMap.set(key, stat.minutesStudied)
  }

  // Build grid: start from (13*7) days ago, aligned to a Sunday
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find the most recent Sunday on or before today
  const endSunday = new Date(today)
  endSunday.setDate(today.getDate() + (6 - today.getDay()))

  // Start date is WEEKS * 7 days before end Sunday
  const startDate = new Date(endSunday)
  startDate.setDate(endSunday.getDate() - WEEKS * 7 + 1)

  // Build the grid: 7 rows (days of week), WEEKS columns
  // grid[col][row] = date cell
  const grid: Array<Array<{ date: Date; key: string; minutes: number }>> = []

  for (let col = 0; col < WEEKS; col++) {
    const week: Array<{ date: Date; key: string; minutes: number }> = []
    for (let row = 0; row < 7; row++) {
      const d = new Date(startDate)
      d.setDate(startDate.getDate() + col * 7 + row)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const minutes = statsMap.get(key) ?? 0
      week.push({ date: d, key, minutes })
    }
    grid.push(week)
  }

  // Build month labels
  const monthLabels: Array<{ label: string; col: number }> = []
  let lastMonth = -1
  for (let col = 0; col < WEEKS; col++) {
    const month = grid[col][0].date.getMonth()
    if (month !== lastMonth) {
      const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月']
      monthLabels.push({ label: monthNames[month], col })
      lastMonth = month
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-max">
        {/* Month labels */}
        <div className="flex mb-1 ml-7">
          {Array.from({ length: WEEKS }, (_, col) => {
            const label = monthLabels.find((m) => m.col === col)
            return (
              <div key={col} className="w-4 mr-0.5 text-xs text-muted-foreground">
                {label ? label.label : ''}
              </div>
            )
          })}
        </div>

        <div className="flex gap-0.5">
          {/* Day of week labels */}
          <div className="flex flex-col gap-0.5 mr-1">
            {DAYS_OF_WEEK.map((d, i) => (
              <div key={i} className="h-4 w-5 text-xs text-muted-foreground flex items-center justify-end pr-0.5">
                {i % 2 === 1 ? d : ''}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {grid.map((week, col) => (
            <div key={col} className="flex flex-col gap-0.5">
              {week.map(({ date, key, minutes }) => {
                const isFuture = date > today
                return (
                  <div
                    key={key}
                    title={isFuture ? '' : `${key}：${getIntensityLabel(minutes)}`}
                    className={cn(
                      'h-4 w-4 rounded-sm transition-colors',
                      isFuture
                        ? 'bg-muted opacity-30'
                        : getIntensityClass(minutes)
                    )}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 ml-7 text-xs text-muted-foreground">
          <span>少</span>
          {['bg-muted', 'bg-green-200 dark:bg-green-900', 'bg-green-400 dark:bg-green-700',
            'bg-green-600 dark:bg-green-500', 'bg-green-800 dark:bg-green-300'].map((cls, i) => (
            <div key={i} className={cn('h-3.5 w-3.5 rounded-sm', cls)} />
          ))}
          <span>多</span>
        </div>
      </div>
    </div>
  )
}
