import { prisma } from '@/lib/prisma'
import { getTodayStart } from '@/lib/utils'

export async function recordDailyStats(
  userId: string,
  updates: {
    wordsStudied?: number
    wordsLearned?: number
    minutesStudied?: number
    xpEarned?: number
    questionsAnswered?: number
    correctAnswers?: number
    listeningMins?: number
    readingMins?: number
    writingMins?: number
  }
) {
  const today = getTodayStart()

  await prisma.dailyStats.upsert({
    where: { userId_date: { userId, date: today } },
    create: { userId, date: today, ...updates },
    update: {
      wordsStudied: { increment: updates.wordsStudied ?? 0 },
      wordsLearned: { increment: updates.wordsLearned ?? 0 },
      minutesStudied: { increment: updates.minutesStudied ?? 0 },
      xpEarned: { increment: updates.xpEarned ?? 0 },
      questionsAnswered: { increment: updates.questionsAnswered ?? 0 },
      correctAnswers: { increment: updates.correctAnswers ?? 0 },
      listeningMins: { increment: updates.listeningMins ?? 0 },
      readingMins: { increment: updates.readingMins ?? 0 },
      writingMins: { increment: updates.writingMins ?? 0 },
    },
  })

  // Update streak
  const goals = await prisma.userGoals.findUnique({ where: { userId } })
  if (goals) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const lastStudy = goals.lastStudyDate ? new Date(goals.lastStudyDate) : null
    if (lastStudy) lastStudy.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let newStreak = goals.currentStreak
    if (!lastStudy || lastStudy.getTime() === yesterday.getTime()) {
      newStreak = lastStudy ? goals.currentStreak + 1 : 1
    } else if (lastStudy.getTime() === today.getTime()) {
      // already studied today, no change
    } else {
      newStreak = 1
    }

    await prisma.userGoals.update({
      where: { userId },
      data: {
        lastStudyDate: new Date(),
        currentStreak: newStreak,
        longestStreak: Math.max(goals.longestStreak, newStreak),
        totalXp: { increment: updates.xpEarned ?? 0 },
      },
    })
  }
}

export const XP_REWARDS = {
  wordStudied: 2,
  wordMastered: 10,
  questionCorrect: 5,
  examCompleted: 50,
  streakBonus: 20,
  dailyGoalMet: 30,
}
