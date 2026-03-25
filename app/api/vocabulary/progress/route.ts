import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sm2, getStatusFromSm2 } from '@/lib/spaced-repetition'
import { recordDailyStats, XP_REWARDS } from '@/lib/stats'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = (session.user as any).id

  const { searchParams } = new URL(req.url)
  const level = parseInt(searchParams.get('level') || '1')

  const progress = await prisma.userWordProgress.findMany({
    where: {
      userId,
      word: { hskLevel: level },
    },
    select: {
      wordId: true,
      status: true,
      correctCount: true,
      incorrectCount: true,
      easeFactor: true,
      interval: true,
      repetitions: true,
      dueDate: true,
      lastReviewedAt: true,
    },
  })

  return NextResponse.json({ progress })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = (session.user as any).id

  const body = await req.json()
  const { reviews } = body as {
    reviews: { wordId: string; quality: number }[]
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return NextResponse.json({ error: 'Invalid reviews payload' }, { status: 400 })
  }

  let wordsStudied = 0
  let wordsLearned = 0
  let xpEarned = 0

  for (const review of reviews) {
    const { wordId, quality } = review

    // Fetch existing progress or use defaults
    const existing = await prisma.userWordProgress.findUnique({
      where: { userId_wordId: { userId, wordId } },
    })

    const sm2Input = {
      easeFactor: existing?.easeFactor ?? 2.5,
      interval: existing?.interval ?? 1,
      repetitions: existing?.repetitions ?? 0,
      quality,
    }

    const sm2Output = sm2(sm2Input)
    const newStatus = getStatusFromSm2(sm2Output.repetitions, sm2Output.interval)
    const isCorrect = quality >= 3

    await prisma.userWordProgress.upsert({
      where: { userId_wordId: { userId, wordId } },
      create: {
        userId,
        wordId,
        status: newStatus,
        easeFactor: sm2Output.easeFactor,
        interval: sm2Output.interval,
        repetitions: sm2Output.repetitions,
        dueDate: sm2Output.dueDate,
        lastReviewedAt: new Date(),
        correctCount: isCorrect ? 1 : 0,
        incorrectCount: isCorrect ? 0 : 1,
      },
      update: {
        status: newStatus,
        easeFactor: sm2Output.easeFactor,
        interval: sm2Output.interval,
        repetitions: sm2Output.repetitions,
        dueDate: sm2Output.dueDate,
        lastReviewedAt: new Date(),
        correctCount: isCorrect ? { increment: 1 } : undefined,
        incorrectCount: !isCorrect ? { increment: 1 } : undefined,
      },
    })

    wordsStudied++
    xpEarned += XP_REWARDS.wordStudied

    if (newStatus === 'mastered' && (!existing || existing.status !== 'mastered')) {
      wordsLearned++
      xpEarned += XP_REWARDS.wordMastered
    }
  }

  // Record daily stats
  await recordDailyStats(userId, {
    wordsStudied,
    wordsLearned,
    xpEarned,
  })

  return NextResponse.json({ updated: wordsStudied, xpEarned })
}
