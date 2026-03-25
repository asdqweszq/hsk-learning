import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Clock, Trophy, Target } from 'lucide-react'
import StartExamButton from './start-exam-button'

export const dynamic = 'force-dynamic'

interface Props {
  params: { templateId: string }
}

export default async function ExamInstructionsPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const template = await prisma.examTemplate.findUnique({
    where: { id: params.templateId },
  })

  if (!template) notFound()

  let structure: { type: string; count: number; description?: string }[] = []
  try {
    structure = JSON.parse(template.structure)
  } catch {
    structure = []
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{template.name}</h1>
          <Badge variant="secondary">HSK {template.hskLevel}</Badge>
        </div>
        {template.description && (
          <p className="text-muted-foreground">{template.description}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-4 gap-1">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="text-xl font-bold">{template.durationMins}</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-4 gap-1">
            <Trophy className="h-5 w-5 text-muted-foreground" />
            <p className="text-xl font-bold">{template.totalScore}</p>
            <p className="text-xs text-muted-foreground">Total Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-4 gap-1">
            <Target className="h-5 w-5 text-muted-foreground" />
            <p className="text-xl font-bold">{template.passScore}</p>
            <p className="text-xs text-muted-foreground">Pass Score</p>
          </CardContent>
        </Card>
      </div>

      {structure.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exam Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Section</th>
                  <th className="text-right py-2 font-medium">Questions</th>
                </tr>
              </thead>
              <tbody>
                {structure.map((section, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 capitalize">
                      {section.description ?? section.type.replace(/_/g, ' ')}
                    </td>
                    <td className="text-right py-2">{section.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800">
        <CardContent className="pt-4 space-y-1 text-sm text-amber-800 dark:text-amber-300">
          <p className="font-medium">Before you begin:</p>
          <p>• Once started, the timer cannot be paused</p>
          <p>• You can navigate between questions freely</p>
          <p>• Your answers are auto-saved as you go</p>
          <p>• Submit before time runs out</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/exam">
          <Button variant="outline">Back</Button>
        </Link>
        <StartExamButton templateId={params.templateId} />
      </div>
    </div>
  )
}
