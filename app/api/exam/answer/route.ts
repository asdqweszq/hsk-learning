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
    const { examRecordId, questionId, answer } = body as {
      examRecordId: string
      questionId: string
      answer: string
    }

    if (!examRecordId || !questionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify ownership
    const examRecord = await prisma.examRecord.findFirst({
      where: { id: examRecordId, userId },
    })

    if (!examRecord) {
      return NextResponse.json({ error: 'Exam record not found' }, { status: 404 })
    }

    if (examRecord.status !== 'in_progress') {
      return NextResponse.json({ error: 'Exam already submitted' }, { status: 400 })
    }

    // Upsert answer without scoring yet
    await prisma.examAnswer.upsert({
      where: { examRecordId_questionId: { examRecordId, questionId } },
      create: {
        examRecordId,
        questionId,
        userAnswer: answer ?? '',
      },
      update: {
        userAnswer: answer ?? '',
        answeredAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Exam answer error:', error)
    return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 })
  }
}
