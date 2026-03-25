import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ActivityHeatmap from '@/components/stats/activity-heatmap'
import WeeklyBarChart from '@/components/stats/weekly-bar-chart'
import { BarChart3, BookOpen, Brain, Clock } from 'lucide-react'

export default async function StatsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')
  const userId = (session.user as any).id as string

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  thirtyDaysAgo.setHours(0, 0, 0, 0)

  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 91)
  ninetyDaysAgo.setHours(0, 0, 0, 0)

  const [dailyStats, wordCounts, goals] = await Promise.all([
    prisma.dailyStats.findMany({
      where: { userId, date: { gte: ninetyDaysAgo } },
      orderBy: { date: 'asc' },
    }),
    prisma.userWordProgress.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    }),
    prisma.userGoals.findUnique({ where: { userId } }),
  ])

  const statusMap = Object.fromEntries(
    wordCounts.map((w) => [w.status, w._count.status])
  )

  const totalWords = Object.values(statusMap).reduce((a, b) => a + b, 0)
  const masteredWords = statusMap['mastered'] ?? 0

  // Totals across all daily stats
  const totalMinutes = dailyStats.reduce((s, d) => s + d.minutesStudied, 0)
  const totalXp = goals?.totalXp ?? 0
  const totalQuestionsAnswered = dailyStats.reduce((s, d) => s + d.questionsAnswered, 0)
  const totalCorrect = dailyStats.reduce((s, d) => s + d.correctAnswers, 0)
  const accuracy =
    totalQuestionsAnswered > 0
      ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
      : 0

  // Last 7 days for bar chart
  const last7Days = dailyStats.slice(-7)

  // Skill breakdown: listening, reading, writing totals (last 30 days)
  const last30 = dailyStats.filter(
    (d) => new Date(d.date) >= thirtyDaysAgo
  )
  const listeningMins = last30.reduce((s, d) => s + d.listeningMins, 0)
  const readingMins = last30.reduce((s, d) => s + d.readingMins, 0)
  const writingMins = last30.reduce((s, d) => s + d.writingMins, 0)
  const skillTotal = listeningMins + readingMins + writingMins

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">学习统计</h1>
        <p className="text-muted-foreground">追踪你的学习进度和成就</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">已掌握词汇</p>
                <p className="text-2xl font-bold">{masteredWords.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">共 {totalWords} 词</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">累计学习</p>
                <p className="text-2xl font-bold">{totalMinutes}</p>
                <p className="text-xs text-muted-foreground">分钟</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">总经验值</p>
                <p className="text-2xl font-bold">{totalXp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">答题正确率</p>
                <p className="text-2xl font-bold">{accuracy}%</p>
                <p className="text-xs text-muted-foreground">
                  {totalCorrect}/{totalQuestionsAnswered} 题
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">学习活跃度（近 13 周）</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityHeatmap dailyStats={dailyStats.map((d) => ({
            date: d.date instanceof Date ? d.date.toISOString() : String(d.date),
            minutesStudied: d.minutesStudied,
          }))} />
        </CardContent>
      </Card>

      {/* Weekly Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">近 7 天经验值</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyBarChart data={last7Days.map((d) => ({
            date: d.date instanceof Date ? d.date.toISOString() : String(d.date),
            xpEarned: d.xpEarned,
            wordsStudied: d.wordsStudied,
            minutesStudied: d.minutesStudied,
          }))} />
        </CardContent>
      </Card>

      {/* Skill breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">技能分布（近 30 天）</CardTitle>
        </CardHeader>
        <CardContent>
          {skillTotal === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">暂无数据</p>
          ) : (
            <div className="space-y-4">
              {[
                { label: '听力', value: listeningMins, color: 'bg-blue-500' },
                { label: '阅读', value: readingMins, color: 'bg-green-500' },
                { label: '写作', value: writingMins, color: 'bg-purple-500' },
              ].map(({ label, value, color }) => {
                const pct = skillTotal > 0 ? Math.round((value / skillTotal) * 100) : 0
                return (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">
                        {value} 分钟
                        <span className="text-muted-foreground font-normal ml-1 text-xs">
                          ({pct}%)
                        </span>
                      </span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all ${color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
