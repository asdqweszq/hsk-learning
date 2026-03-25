import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import GrammarExample from '@/components/grammar/grammar-example'
import GrammarExercise from '@/components/grammar/grammar-exercise'

export const dynamic = 'force-dynamic'

interface Props {
  params: { pointId: string }
}

export default async function GrammarDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const grammarPoint = await prisma.grammarPoint.findUnique({
    where: { id: params.pointId },
    include: { examples: true },
  })

  if (!grammarPoint) notFound()

  const regularExamples = grammarPoint.examples.filter((e) => !e.isExercise)
  const exerciseExamples = grammarPoint.examples.filter((e) => e.isExercise)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/grammar"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Grammar
      </Link>

      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-bold">{grammarPoint.title}</h1>
          {grammarPoint.titleZh && (
            <span className="text-xl text-muted-foreground">{grammarPoint.titleZh}</span>
          )}
          <Badge variant="outline">HSK {grammarPoint.hskLevel}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted rounded-md px-4 py-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
            {grammarPoint.pattern}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Explanation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{grammarPoint.explanation}</p>
        </CardContent>
      </Card>

      {regularExamples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {regularExamples.map((example) => (
              <GrammarExample
                key={example.id}
                sentence={example.sentence}
                pinyin={example.pinyin}
                translation={example.translation}
                notes={example.notes ?? undefined}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {exerciseExamples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Exercises
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {exerciseExamples.map((exercise) => (
              <GrammarExercise
                key={exercise.id}
                pointId={params.pointId}
                exampleId={exercise.id}
                sentence={exercise.sentence}
                pinyin={exercise.pinyin}
                translation={exercise.translation}
                blankOptions={exercise.blankOptions ? JSON.parse(exercise.blankOptions) : []}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
