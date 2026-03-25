import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ClipboardList } from 'lucide-react'

export const dynamic = 'force-dynamic'

const LEVEL_LABELS: Record<number, string> = {
  1: 'HSK 1 — 150 words',
  2: 'HSK 2 — 300 words',
  3: 'HSK 3 — 600 words',
  4: 'HSK 4 — 1200 words',
  5: 'HSK 5 — 2500 words',
  6: 'HSK 6 — 5000+ words',
}

export default async function ExamPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = (session.user as any).id

  const templates = await prisma.examTemplate.findMany({
    orderBy: { hskLevel: 'asc' },
  })

  // Get last exam record per template
  const lastRecords = await prisma.examRecord.findMany({
    where: {
      userId,
      status: 'submitted',
      templateId: { in: templates.map((t) => t.id) },
    },
    orderBy: { submittedAt: 'desc' },
  })

  const lastByTemplate = lastRecords.reduce<Record<string, (typeof lastRecords)[0]>>(
    (acc, r) => {
      if (!acc[r.templateId]) acc[r.templateId] = r
      return acc
    },
    {}
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
          <ClipboardList className="h-6 w-6 text-purple-600 dark:text-purple-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Mock Exam</h1>
          <p className="text-muted-foreground text-sm">模拟考试 — Test your HSK level readiness</p>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No exam templates available yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => {
            const last = lastByTemplate[template.id]
            return (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary">HSK {template.hskLevel}</Badge>
                  </div>
                  {template.description && (
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="font-semibold">{template.durationMins}m</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    <div>
                      <p className="font-semibold">{template.totalScore}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div>
                      <p className="font-semibold">{template.passScore}</p>
                      <p className="text-xs text-muted-foreground">Pass</p>
                    </div>
                  </div>

                  {last && (
                    <div
                      className={`rounded-md px-3 py-2 text-xs text-center ${
                        last.passed
                          ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                          : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                      }`}
                    >
                      Last score: {last.totalScore} — {last.passed ? 'Passed' : 'Failed'}
                    </div>
                  )}

                  <Link href={`/exam/${template.id}`}>
                    <Button className="w-full">开始考试</Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
