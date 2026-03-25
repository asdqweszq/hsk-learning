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
    const { examRecordId } = body as { examRecordId: string }

    if (!examRecordId) {
      return NextResponse.json({ error: 'Missing examRecordId' }, { status: 400 })
    }

    const examRecord = await prisma.examRecord.findFirst({
      where: { id: examRecordId, userId },
      include: {
        template: true,
        answers: {
          include: { question: true },
        },
      },
    })

    if (!examRecord) {
      return NextResponse.json({ error: 'Exam record not found' }, { status: 404 })
    }

    if (examRecord.status === 'submitted') {
      return NextResponse.json({ error: 'Exam already submitted' }, { status: 400 })
    }

    // Score each answer
    let totalScore = 0
    let listeningScore = 0
    let readingScore = 0
    let writingScore = 0

    const scoredAnswers = []
    const errorRecordsToCreate = []

    const questionCount = examRecord.answers.length
    const pointsPerQuestion = questionCount > 0
      ? Math.floor(examRecord.template.totalScore / questionCount)
      : 0

    for (const ans of examRecord.answers) {
      const isCorrect = ans.userAnswer.trim() === ans.question.correctAnswer.trim()
      const score = isCorrect ? pointsPerQuestion : 0

      totalScore += score

      const qType = ans.question.type
      if (qType.startsWith('listening')) listeningScore += score
      else if (qType.startsWith('reading')) readingScore += score
      else if (qType.startsWith('writing')) writingScore += score

      scoredAnswers.push({
        id: ans.id,
        isCorrect,
        score,
      })

      if (!isCorrect) {
        const existing = await prisma.errorRecord.findFirst({
          where: { userId, questionId: ans.questionId, sourceType: 'exam' },
        })
        if (!existing) {
          errorRecordsToCreate.push({
            userId,
            sourceType: 'exam',
            questionId: ans.questionId,
            errorNote: `Exam error: answered ${ans.userAnswer}, correct: ${ans.question.correctAnswer}`,
          })
        }
      }
    }

    const passed = totalScore >= examRecord.template.passScore

    // Update all answers in a transaction
    await prisma.$transaction([
      ...scoredAnswers.map((ans) =>
        prisma.examAnswer.update({
          where: { id: ans.id },
          data: { isCorrect: ans.isCorrect, score: ans.score },
        })
      ),
      prisma.examRecord.update({
        where: { id: examRecordId },
        data: {
          status: 'submitted',
          submittedAt: new Date(),
          totalScore,
          listeningScore,
          readingScore,
          writingScore,
          passed,
          timeSpentSecs: Math.floor(
            (Date.now() - examRecord.startedAt.getTime()) / 1000
          ),
        },
      }),
      ...(errorRecordsToCreate.length > 0
        ? [prisma.errorRecord.createMany({ data: errorRecordsToCreate })]
        : []),
    ])

    // Record DailyStats
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const correctCount = scoredAnswers.filter((a) => a.isCorrect).length
    const xp = passed ? 100 : 30

    await prisma.dailyStats.upsert({
      where: { userId_date: { userId, date: today } },
      create: {
        userId,
        date: today,
        questionsAnswered: questionCount,
        correctAnswers: correctCount,
        xpEarned: xp,
      },
      update: {
        questionsAnswered: { increment: questionCount },
        correctAnswers: { increment: correctCount },
        xpEarned: { increment: xp },
      },
    })

    return NextResponse.json({
      examRecordId,
      totalScore,
      listeningScore,
      readingScore,
      writingScore,
      passScore: examRecord.template.passScore,
      passed,
      answers: scoredAnswers,
    })
  } catch (error) {
    console.error('Exam submit error:', error)
    return NextResponse.json({ error: 'Failed to submit exam' }, { status: 500 })
  }
}
