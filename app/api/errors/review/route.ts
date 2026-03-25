import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sm2 } from '@/lib/spaced-repetition'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id
  const { searchParams } = new URL(request.url)
  const countParam = searchParams.get('count')
  const count = countParam ? parseInt(countParam) : 20

  try {
    const now = new Date()
    const errors = await prisma.errorRecord.findMany({
      where: {
        userId,
        mastered: false,
        nextReviewAt: { lte: now },
      },
      take: count,
      orderBy: { nextReviewAt: 'asc' },
      include: {
        word: { select: { hanzi: true, pinyin: true, definitionEn: true, hskLevel: true } },
        grammarPoint: { select: { title: true, titleZh: true, pattern: true, hskLevel: true } },
        question: { select: { type: true, content: true, correctAnswer: true, explanation: true } },
      },
    })

    return NextResponse.json(errors)
  } catch (error) {
    console.error('Error review fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch review items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id

  try {
    const body = await request.json()
    const { errorId, quality } = body as { errorId: string; quality: number }

    if (!errorId || quality === undefined) {
      return NextResponse.json({ error: 'Missing errorId or quality' }, { status: 400 })
    }

    const errorRecord = await prisma.errorRecord.findFirst({
      where: { id: errorId, userId },
    })

    if (!errorRecord) {
      return NextResponse.json({ error: 'Error record not found' }, { status: 404 })
    }

    const result = sm2({
      easeFactor: errorRecord.easeFactor,
      interval: errorRecord.interval,
      repetitions: errorRecord.repetitions,
      quality,
    })

    const mastered = quality >= 4 && result.repetitions >= 3

    const updated = await prisma.errorRecord.update({
      where: { id: errorId },
      data: {
        easeFactor: result.easeFactor,
        interval: result.interval,
        repetitions: result.repetitions,
        nextReviewAt: result.dueDate,
        reviewCount: { increment: 1 },
        mastered,
      },
    })

    return NextResponse.json({ success: true, mastered, nextReviewAt: updated.nextReviewAt })
  } catch (error) {
    console.error('Error review update error:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}
