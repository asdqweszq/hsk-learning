import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const PAGE_SIZE = 20

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const level = parseInt(searchParams.get('level') || '1')
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const pageSize = parseInt(searchParams.get('pageSize') || String(PAGE_SIZE))

  const where: any = {
    hskLevel: level,
  }

  if (search) {
    where.OR = [
      { hanzi: { contains: search } },
      { pinyinNormalized: { contains: search.toLowerCase() } },
      { definitionEn: { contains: search } },
    ]
  }

  const [words, total] = await Promise.all([
    prisma.vocabularyWord.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { frequency: 'asc' },
    }),
    prisma.vocabularyWord.count({ where }),
  ])

  return NextResponse.json({
    words,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  })
}
