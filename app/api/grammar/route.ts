import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const levelParam = searchParams.get('level')

  try {
    const where = levelParam ? { hskLevel: parseInt(levelParam) } : {}

    const grammarPoints = await prisma.grammarPoint.findMany({
      where,
      orderBy: [{ hskLevel: 'asc' }, { difficulty: 'asc' }],
      select: {
        id: true,
        hskLevel: true,
        title: true,
        titleZh: true,
        pattern: true,
        explanation: true,
        difficulty: true,
      },
    })

    return NextResponse.json(grammarPoints)
  } catch (error) {
    console.error('Grammar fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch grammar points' }, { status: 500 })
  }
}
