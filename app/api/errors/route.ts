import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const masteredParam = searchParams.get('mastered')

  try {
    const where: Record<string, unknown> = { userId }
    if (type) where.sourceType = type
    if (masteredParam !== null) where.mastered = masteredParam === 'true'

    const errors = await prisma.errorRecord.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        word: { select: { hanzi: true, pinyin: true, definitionEn: true, hskLevel: true } },
        grammarPoint: { select: { title: true, titleZh: true, hskLevel: true } },
        question: { select: { type: true, content: true, correctAnswer: true } },
      },
    })

    return NextResponse.json(errors)
  } catch (error) {
    console.error('Error records fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch error records' }, { status: 500 })
  }
}
