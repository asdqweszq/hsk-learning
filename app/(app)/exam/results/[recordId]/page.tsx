import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: { recordId: string }
}

export default async function ExamResultsPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = (session.user as any).id

  const examRecord = await prisma.examRecord.findFirst({
    where: { id: params.recordId, userId },
    include: {
      template: true,
      answers: {
        include: { question: true },
        orderBy: { answeredAt: 'asc' },
      },
    },
  })

  if (!examRecord) notFound()

  const passScore = examRecord.template.passScore
  const totalScore = examRecord.totalScore ?? 0
  const passed = examRecord.passed ?? false

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Exam Results</h1>
        <p className="text-muted-foreground">{examRecord.template.name}</p>
      </div>

      {/* Score card */}
      <Card className={passed
        ? 'border-green-400 dark:border-green-700'
        : 'border-red-400 dark:border-red-700'
      }>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-5xl font-bold">{totalScore}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Score</p>
            </div>
            <div className="text-muted-foreground text-2xl">/</div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-muted-foreground">
                {examRecord.template.totalScore}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Maximum</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Badge
              className={`text-base px-4 py-1 ${
                passed
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {passed ? '通过 Passed' : '未通过 Not Passed'} — Pass: {passScore}
            </Badge>
          </div>

          {/* Section scores */}
          {(examRecord.listeningScore !== null || examRecord.readingScore !== null) && (
            <div className="grid grid-cols-3 gap-2 text-center text-sm border-t pt-4">
              {examRecord.listeningScore !== null && (
                <div>
                  <p className="font-semibold">{examRecord.listeningScore}</p>
                  <p className="text-xs text-muted-foreground">Listening</p>
                </div>
              )}
              {examRecord.readingScore !== null && (
                <div>
                  <p className="font-semibold">{examRecord.readingScore}</p>
                  <p className="text-xs text-muted-foreground">Reading</p>
                </div>
              )}
              {examRecord.writingScore !== null && (
                <div>
                  <p className="font-semibold">{examRecord.writingScore}</p>
                  <p className="text-xs text-muted-foreground">Writing</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Per-question review */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Question Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {examRecord.answers.map((ans, i) => {
            let content: any = {}
            try { content = JSON.parse(ans.question.content) } catch { content = { question: ans.question.content, options: [] } }

            return (
              <div key={ans.id} className="border rounded-md p-3 space-y-1">
                <div className="flex items-start gap-2">
                  {ans.isCorrect === true ? (
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  ) : ans.isCorrect === false ? (
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  ) : (
                    <MinusCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">Q{i + 1}</p>
                    <p className="text-sm font-medium">
                      {content.question ?? content.sentence ?? ''}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1 text-xs">
                      <span className="text-muted-foreground">
                        Your answer:{' '}
                        <span
                          className={
                            ans.isCorrect ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {ans.userAnswer || '(no answer)'}
                        </span>
                      </span>
                      {!ans.isCorrect && (
                        <span className="text-muted-foreground">
                          Correct:{' '}
                          <span className="text-green-600">{ans.question.correctAnswer}</span>
                        </span>
                      )}
                    </div>
                    {ans.question.explanation && !ans.isCorrect && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        {ans.question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/exam">
          <Button>Back to Exams</Button>
        </Link>
        <Link href="/error-book">
          <Button variant="outline">View Error Book</Button>
        </Link>
      </div>
    </div>
  )
}
