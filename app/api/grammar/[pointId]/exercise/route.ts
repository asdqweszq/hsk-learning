import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { pointId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id

  try {
    const body = await request.json()
    const { exampleId, answer } = body as { exampleId: string; answer: string }

    if (!exampleId || answer === undefined) {
      return NextResponse.json({ error: 'Missing exampleId or answer' }, { status: 400 })
    }

    const example = await prisma.grammarExample.findUnique({
      where: { id: exampleId },
      include: { grammarPoint: true },
    })

    if (!example) {
      return NextResponse.json({ error: 'Example not found' }, { status: 404 })
    }

    // Parse blank options: stored as JSON array of strings, first is correct
    const options: string[] = example.blankOptions ? JSON.parse(example.blankOptions) : []
    const correctAnswer = options[0] ?? ''
    const isCorrect = answer.trim() === correctAnswer.trim()

    // Record error if wrong
    if (!isCorrect) {
      const existing = await prisma.errorRecord.findFirst({
        where: {
          userId,
          grammarPointId: params.pointId,
          sourceType: 'grammar',
        },
      })

      if (!existing) {
        await prisma.errorRecord.create({
          data: {
            userId,
            sourceType: 'grammar',
            grammarPointId: params.pointId,
            errorNote: `Exercise error on: ${example.sentence}`,
          },
        })
      }
    }

    return NextResponse.json({
      correct: isCorrect,
      correctAnswer,
      explanation: example.notes ?? '',
    })
  } catch (error) {
    console.error('Grammar exercise error:', error)
    return NextResponse.json({ error: 'Failed to check exercise' }, { status: 500 })
  }
}
