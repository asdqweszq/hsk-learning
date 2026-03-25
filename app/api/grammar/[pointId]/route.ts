import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { pointId: string } }
) {
  try {
    const grammarPoint = await prisma.grammarPoint.findUnique({
      where: { id: params.pointId },
      include: {
        examples: true,
      },
    })

    if (!grammarPoint) {
      return NextResponse.json({ error: 'Grammar point not found' }, { status: 404 })
    }

    return NextResponse.json(grammarPoint)
  } catch (error) {
    console.error('Grammar point fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch grammar point' }, { status: 500 })
  }
}
