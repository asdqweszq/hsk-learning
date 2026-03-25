'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserGoals {
  targetHskLevel: number
}

interface LevelProgressCardProps {
  userId: string
  goals: UserGoals | null
  statusMap: Record<string, number>
}

interface StatusRowProps {
  label: string
  count: number
  total: number
  colorClass: string
  bgClass: string
}

function StatusRow({ label, count, total, colorClass, bgClass }: StatusRowProps) {
  const percent = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={cn('inline-block h-2.5 w-2.5 rounded-full', colorClass)} />
          <span className="text-muted-foreground">{label}</span>
        </div>
        <span className="font-medium">
          {count.toLocaleString()}
          {total > 0 && (
            <span className="text-muted-foreground font-normal ml-1 text-xs">
              ({percent}%)
            </span>
          )}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn('h-full rounded-full transition-all', bgClass)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default function LevelProgressCard({ userId, goals, statusMap }: LevelProgressCardProps) {
  const targetLevel = goals?.targetHskLevel ?? 3

  const newCount = statusMap['new'] ?? 0
  const learningCount = statusMap['learning'] ?? 0
  const reviewingCount = statusMap['reviewing'] ?? 0
  const masteredCount = statusMap['mastered'] ?? 0
  const total = newCount + learningCount + reviewingCount + masteredCount

  const masteryPercent = total > 0 ? Math.round((masteredCount / total) * 100) : 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <TrendingUp className="h-4 w-4 text-primary" />
          词汇掌握情况
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          目标等级：HSK {targetLevel} &nbsp;·&nbsp; 总掌握率 {masteryPercent}%
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatusRow
          label="未学习 (new)"
          count={newCount}
          total={total}
          colorClass="bg-gray-400"
          bgClass="bg-gray-400"
        />
        <StatusRow
          label="学习中 (learning)"
          count={learningCount}
          total={total}
          colorClass="bg-blue-500"
          bgClass="bg-blue-500"
        />
        <StatusRow
          label="复习中 (reviewing)"
          count={reviewingCount}
          total={total}
          colorClass="bg-amber-500"
          bgClass="bg-amber-500"
        />
        <StatusRow
          label="已掌握 (mastered)"
          count={masteredCount}
          total={total}
          colorClass="bg-green-500"
          bgClass="bg-green-500"
        />
        {total === 0 && (
          <p className="text-center text-sm text-muted-foreground py-2">
            还没有学习任何词汇，开始学习吧！
          </p>
        )}
      </CardContent>
    </Card>
  )
}
