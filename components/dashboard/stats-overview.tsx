'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Flame, Star, BookOpen, Clock } from 'lucide-react'

interface UserGoals {
  currentStreak: number
  totalXp: number
  dailyWordsTarget: number
  dailyMinutesTarget: number
  targetHskLevel: number
  longestStreak: number
}

interface DailyStats {
  wordsStudied: number
  minutesStudied: number
  xpEarned: number
  questionsAnswered: number
  correctAnswers: number
}

interface StatsOverviewProps {
  goals: UserGoals | null
  todayStats: DailyStats | null
  statusMap: Record<string, number>
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  subLabel?: string
  iconColor?: string
}

function StatCard({ icon, label, value, subLabel, iconColor = 'text-primary' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full bg-muted ${iconColor}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subLabel && (
              <p className="text-xs text-muted-foreground truncate">{subLabel}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function StatsOverview({ goals, todayStats, statusMap }: StatsOverviewProps) {
  const streak = goals?.currentStreak ?? 0
  const totalXp = goals?.totalXp ?? 0
  const mastered = statusMap['mastered'] ?? 0
  const minutesStudied = todayStats?.minutesStudied ?? 0

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Flame className="h-5 w-5" />}
        label="连续天数"
        value={streak}
        subLabel={goals?.longestStreak ? `最长 ${goals.longestStreak} 天` : '开始你的连续记录！'}
        iconColor="text-orange-500"
      />
      <StatCard
        icon={<Star className="h-5 w-5" />}
        label="总经验值"
        value={totalXp.toLocaleString()}
        subLabel="XP"
        iconColor="text-yellow-500"
      />
      <StatCard
        icon={<BookOpen className="h-5 w-5" />}
        label="已掌握词汇"
        value={mastered.toLocaleString()}
        subLabel={`学习中: ${statusMap['learning'] ?? 0}`}
        iconColor="text-green-500"
      />
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        label="今日学习"
        value={`${minutesStudied} 分钟`}
        subLabel={`今日学词: ${todayStats?.wordsStudied ?? 0}`}
        iconColor="text-blue-500"
      />
    </div>
  )
}
