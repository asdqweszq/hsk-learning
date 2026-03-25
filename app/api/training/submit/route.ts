import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id

  try {
    const body = await request.json()
    const { questionId, answer, sessionType } = body as {
      questionId: string
      answer: string
      sessionType: string
    }

    if (!questionId || answer === undefined) {
      return NextResponse.json({ error: 'Missing questionId or answer' }, { status: 400 })
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } })
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    const isCorrect = answer.trim() === question.correctAnswer.trim()

    // Create ErrorRecord if wrong
    if (!isCorrect) {
      const existing = await prisma.errorRecord.findFirst({
        where: { userId, questionId, sourceType: 'training' },
      })
      if (!existing) {
        await prisma.errorRecord.create({
          data: {
            userId,
            sourceType: 'training',
            questionId,
          },
        })
      }
    }

    // Record DailyStats
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const statsUpdate: Record<string, unknown> = {
      questionsAnswered: { increment: 1 },
    }
    if (isCorrect) {
      statsUpdate.correctAnswers = { increment: 1 }
      statsUpdate.xpEarned = { increment: 5 }
    }

    // Increment session-type-specific minutes
    if (sessionType === 'listening') {
      statsUpdate.listeningMins = { increment: 0 }
    } else if (sessionType === 'reading') {
      statsUpdate.readingMins = { increment: 0 }
    } else if (sessionType === 'writing') {
      statsUpdate.writingMins = { increment: 0 }
    }

    await prisma.dailyStats.upsert({
      where: { userId_date: { userId, date: today } },
      create: {
        userId,
        date: today,
        questionsAnswered: 1,
        correctAnswers: isCorrect ? 1 : 0,
        xpEarned: isCorrect ? 5 : 0,
      },
      update: statsUpdate,
    })

    return NextResponse.json({
      correct: isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation ?? '',
    })
  } catch (error) {
    console.error('Training submit error:', error)
    return NextResponse.json({ error: 'Failed to submit answer' }, { status: 500 })
  }
}
