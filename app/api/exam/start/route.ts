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
    const { templateId } = body as { templateId: string }

    if (!templateId) {
      return NextResponse.json({ error: 'Missing templateId' }, { status: 400 })
    }

    const template = await prisma.examTemplate.findUnique({ where: { id: templateId } })
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    // Parse structure to determine question counts
    let structure: { type: string; count: number }[] = []
    try {
      structure = JSON.parse(template.structure)
    } catch {
      structure = [{ type: 'listening_dialogue', count: 15 }, { type: 'reading', count: 20 }]
    }

    // Fetch questions for each section
    const questionIds: string[] = []
    const allQuestions: any[] = []

    for (const section of structure) {
      const questions = await prisma.question.findMany({
        where: { type: section.type, hskLevel: template.hskLevel },
        take: section.count,
        orderBy: { createdAt: 'desc' },
      })
      for (const q of questions) {
        if (!questionIds.includes(q.id)) {
          questionIds.push(q.id)
          let content: unknown = q.content
          try { content = JSON.parse(q.content) } catch {}
          allQuestions.push({ ...q, content })
        }
      }
    }

    // Create ExamRecord
    const examRecord = await prisma.examRecord.create({
      data: {
        userId,
        templateId,
        status: 'in_progress',
        questionIds: JSON.stringify(questionIds),
      },
    })

    return NextResponse.json({
      examRecordId: examRecord.id,
      questions: allQuestions,
      durationMins: template.durationMins,
    })
  } catch (error) {
    console.error('Exam start error:', error)
    return NextResponse.json({ error: 'Failed to start exam' }, { status: 500 })
  }
}
