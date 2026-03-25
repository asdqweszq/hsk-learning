import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = (session.user as any).id

  const favorites = await prisma.userFavoriteWord.findMany({
    where: { userId },
    select: { wordId: true },
  })

  return NextResponse.json({ favoriteIds: favorites.map((f) => f.wordId) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = (session.user as any).id

  const body = await req.json()
  const { wordId } = body as { wordId: string }

  if (!wordId) {
    return NextResponse.json({ error: 'wordId is required' }, { status: 400 })
  }

  // Check if favorite exists
  const existing = await prisma.userFavoriteWord.findUnique({
    where: { userId_wordId: { userId, wordId } },
  })

  if (existing) {
    // Toggle off
    await prisma.userFavoriteWord.delete({
      where: { userId_wordId: { userId, wordId } },
    })
    return NextResponse.json({ isFavorite: false, wordId })
  } else {
    // Toggle on
    await prisma.userFavoriteWord.create({
      data: { userId, wordId },
    })
    return NextResponse.json({ isFavorite: true, wordId })
  }
}
