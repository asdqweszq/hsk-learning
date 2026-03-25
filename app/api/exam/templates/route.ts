import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.examTemplate.findMany({
      orderBy: { hskLevel: 'asc' },
    })

    const parsed = templates.map((t) => {
      let structure: unknown = t.structure
      try {
        structure = JSON.parse(t.structure)
      } catch {}
      return { ...t, structure }
    })

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Exam templates fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch exam templates' }, { status: 500 })
  }
}
