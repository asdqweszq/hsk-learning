import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookMarked, RotateCcw } from 'lucide-react'

export const dynamic = 'force-dynamic'

const SOURCE_LABELS: Record<string, string> = {
  vocabulary: 'Vocabulary',
  grammar: 'Grammar',
  training: 'Training',
  exam: 'Exam',
}

interface SearchParams {
  type?: string
  mastered?: string
}

interface Props {
  searchParams: SearchParams
}

export default async function ErrorBookPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = (session.user as any).id

  const where: Record<string, unknown> = { userId }
  if (searchParams.type) where.sourceType = searchParams.type
  if (searchParams.mastered !== undefined) {
    where.mastered = searchParams.mastered === 'true'
  }

  const errors = await prisma.errorRecord.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      word: { select: { hanzi: true, pinyin: true, definitionEn: true, hskLevel: true } },
      grammarPoint: { select: { title: true, titleZh: true, hskLevel: true } },
      question: { select: { type: true, content: true, correctAnswer: true } },
    },
  })

  const now = new Date()
  const dueCount = await prisma.errorRecord.count({
    where: { userId, mastered: false, nextReviewAt: { lte: now } },
  })

  const totalCount = await prisma.errorRecord.count({ where: { userId } })
  const masteredCount = await prisma.errorRecord.count({ where: { userId, mastered: true } })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900">
            <BookMarked className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Error Book</h1>
            <p className="text-muted-foreground text-sm">错题本 — Review your mistakes</p>
          </div>
        </div>

        {dueCount > 0 && (
          <Link href="/error-book/review">
            <Button className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Review ({dueCount} due)
            </Button>
          </Link>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="text-center py-3">
            <p className="text-2xl font-bold">{totalCount}</p>
            <p className="text-xs text-muted-foreground">Total Errors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-3">
            <p className="text-2xl font-bold text-amber-500">{dueCount}</p>
            <p className="text-xs text-muted-foreground">Due for Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-3">
            <p className="text-2xl font-bold text-green-500">{masteredCount}</p>
            <p className="text-xs text-muted-foreground">Mastered</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        <Link href="/error-book">
          <Badge
            variant={!searchParams.type && searchParams.mastered === undefined ? 'default' : 'outline'}
            className="cursor-pointer"
          >
            All
          </Badge>
        </Link>
        {['vocabulary', 'grammar', 'training', 'exam'].map((t) => (
          <Link key={t} href={`/error-book?type=${t}`}>
            <Badge
              variant={searchParams.type === t ? 'default' : 'outline'}
              className="cursor-pointer capitalize"
            >
              {SOURCE_LABELS[t]}
            </Badge>
          </Link>
        ))}
        <Link href="/error-book?mastered=false">
          <Badge
            variant={searchParams.mastered === 'false' ? 'default' : 'outline'}
            className="cursor-pointer"
          >
            Unmastered
          </Badge>
        </Link>
        <Link href="/error-book?mastered=true">
          <Badge
            variant={searchParams.mastered === 'true' ? 'default' : 'outline'}
            className="cursor-pointer"
          >
            Mastered
          </Badge>
        </Link>
      </div>

      {/* Error list */}
      {errors.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No errors found. Keep studying!
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {errors.map((err) => (
            <Card key={err.id} className={err.mastered ? 'opacity-60' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {SOURCE_LABELS[err.sourceType] ?? err.sourceType}
                  </Badge>
                  {err.mastered && (
                    <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Mastered
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                {err.word && (
                  <div>
                    <span className="text-lg font-bold">{err.word.hanzi}</span>
                    <span className="text-sm text-muted-foreground ml-2">{err.word.pinyin}</span>
                    <p className="text-sm text-muted-foreground">{err.word.definitionEn}</p>
                  </div>
                )}
                {err.grammarPoint && (
                  <div>
                    <p className="font-medium">{err.grammarPoint.title}</p>
                    {err.grammarPoint.titleZh && (
                      <p className="text-sm text-muted-foreground">{err.grammarPoint.titleZh}</p>
                    )}
                  </div>
                )}
                {err.question && (
                  <div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {err.question.type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Correct: {err.question.correctAnswer}
                    </p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Reviews: {err.reviewCount} ·{' '}
                  Next: {new Date(err.nextReviewAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
