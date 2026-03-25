import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getTodayStart } from '@/lib/utils'
import StatsOverview from '@/components/dashboard/stats-overview'
import DailyGoalCard from '@/components/dashboard/daily-goal-card'
import LevelProgressCard from '@/components/dashboard/level-progress-card'
import RecentActivityCard from '@/components/dashboard/recent-activity-card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')
  const userId = (session.user as any).id as string

  const [goals, todayStats, wordCounts] = await Promise.all([
    prisma.userGoals.findUnique({ where: { userId } }),
    prisma.dailyStats.findFirst({ where: { userId, date: getTodayStart() } }),
    prisma.userWordProgress.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    }),
  ])

  const recentExams = await prisma.examRecord.findMany({
    where: { userId, status: 'completed' },
    orderBy: { submittedAt: 'desc' },
    take: 3,
    include: { template: true },
  })

  // Build status count map
  const statusMap = Object.fromEntries(
    wordCounts.map((w) => [w.status, w._count.status])
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            你好，{session.user.name || session.user.email}！
          </h1>
          <p className="text-muted-foreground">继续你的 HSK 学习旅程</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/vocabulary/study">开始学习</Link>
          </Button>
          <Button asChild>
            <Link href="/exam">模拟考试</Link>
          </Button>
        </div>
      </div>

      <StatsOverview goals={goals} todayStats={todayStats} statusMap={statusMap} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyGoalCard goals={goals} todayStats={todayStats} />
        <LevelProgressCard userId={userId} goals={goals} statusMap={statusMap} />
      </div>

      <RecentActivityCard recentExams={recentExams} />
    </div>
  )
}
