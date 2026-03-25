import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = (session.user as any).id as string

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    thirtyDaysAgo.setHours(0, 0, 0, 0)

    const [dailyStats, wordCounts, goals] = await Promise.all([
      prisma.dailyStats.findMany({
        where: { userId, date: { gte: thirtyDaysAgo } },
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
    const currentStreak = goals?.currentStreak ?? 0

    return NextResponse.json({
      dailyStats,
      totals: {
        totalWords,
        masteredWords,
        currentStreak,
        totalXp: goals?.totalXp ?? 0,
        longestStreak: goals?.longestStreak ?? 0,
      },
      statusMap,
    })
  } catch (error) {
    console.error('[GET /api/stats]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
