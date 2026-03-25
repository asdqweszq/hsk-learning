'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Target } from 'lucide-react'

interface UserGoals {
  dailyWordsTarget: number
  dailyMinutesTarget: number
}

interface DailyStats {
  wordsStudied: number
  minutesStudied: number
}

interface DailyGoalCardProps {
  goals: UserGoals | null
  todayStats: DailyStats | null
}

interface GoalRowProps {
  label: string
  current: number
  target: number
  unit: string
  color?: string
}

function GoalRow({ label, current, target, unit, color = 'bg-primary' }: GoalRowProps) {
  const clamped = Math.min(current, target)
  const percent = target > 0 ? Math.round((clamped / target) * 100) : 0
  const done = current >= target

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={done ? 'font-semibold text-green-500' : 'font-medium'}>
          {current} / {target} {unit}
          {done && ' ✓'}
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-right">{percent}% 完成</p>
    </div>
  )
}

export default function DailyGoalCard({ goals, todayStats }: DailyGoalCardProps) {
  const wordsTarget = goals?.dailyWordsTarget ?? 10
  const minutesTarget = goals?.dailyMinutesTarget ?? 20
  const wordsStudied = todayStats?.wordsStudied ?? 0
  const minutesStudied = todayStats?.minutesStudied ?? 0

  const wordsDone = wordsStudied >= wordsTarget
  const minutesDone = minutesStudied >= minutesTarget
  const allDone = wordsDone && minutesDone

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Target className="h-4 w-4 text-primary" />
          今日目标
          {allDone && (
            <span className="ml-auto text-xs text-green-500 font-normal">
              全部完成！
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <GoalRow
          label="学习词汇"
          current={wordsStudied}
          target={wordsTarget}
          unit="词"
          color="bg-blue-500"
        />
        <GoalRow
          label="学习时长"
          current={minutesStudied}
          target={minutesTarget}
          unit="分钟"
          color="bg-green-500"
        />
        {allDone && (
          <p className="text-center text-sm text-muted-foreground pt-1">
            太棒了！今天的目标已全部完成 🎉
          </p>
        )}
        {!allDone && (
          <p className="text-center text-sm text-muted-foreground pt-1">
            加油！继续努力，达成今日目标
          </p>
        )}
      </CardContent>
    </Card>
  )
}
