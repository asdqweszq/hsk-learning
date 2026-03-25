import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import VocabularyBrowser from '@/components/vocabulary/vocabulary-browser'

const PAGE_SIZE = 20

export default async function VocabularyPage({
  searchParams,
}: {
  searchParams: { level?: string; page?: string; search?: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const userId = (session.user as any).id

  const level = parseInt(searchParams.level || '1')
  const page = parseInt(searchParams.page || '1')
  const search = searchParams.search || ''

  const where = {
    hskLevel: level,
    ...(search
      ? {
          OR: [
            { hanzi: { contains: search } },
            { pinyinNormalized: { contains: search.toLowerCase() } },
            { definitionEn: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const [words, total, userProgress] = await Promise.all([
    prisma.vocabularyWord.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { frequency: 'asc' },
    }),
    prisma.vocabularyWord.count({ where }),
    prisma.userWordProgress.findMany({
      where: { userId, word: { hskLevel: level } },
      select: { wordId: true, status: true },
    }),
  ])

  const progressMap = Object.fromEntries(userProgress.map((p) => [p.wordId, p.status]))

  return (
    <VocabularyBrowser
      words={words}
      total={total}
      page={page}
      pageSize={PAGE_SIZE}
      level={level}
      search={search}
      progressMap={progressMap}
      userId={userId}
    />
  )
}
