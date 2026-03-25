import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? ''
  const levelParam = searchParams.get('level')
  const countParam = searchParams.get('count')

  const level = levelParam ? parseInt(levelParam) : undefined
  const count = countParam ? parseInt(countParam) : 10

  try {
    const where: Record<string, unknown> = {}
    if (type) where.type = type
    if (level) where.hskLevel = level

    const questions = await prisma.question.findMany({
      where,
      take: count,
      orderBy: { createdAt: 'desc' },
    })

    // Parse content field from JSON string
    const parsed = questions.map((q) => {
      let content: unknown = q.content
      try {
        content = JSON.parse(q.content)
      } catch {
        // leave as string
      }
      return { ...q, content }
    })

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Training questions fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}
