import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Headphones } from 'lucide-react'

const HSK_LEVELS = [1, 2, 3, 4, 5, 6]

export default async function ListeningPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
          <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Listening Practice</h1>
          <p className="text-muted-foreground text-sm">听力练习 — Train your listening comprehension</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">About this exercise</CardTitle>
          <CardDescription>
            Listen to dialogues and conversations, then answer comprehension questions.
            Audio is generated using text-to-speech synthesis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <p>• 10 questions per session</p>
          <p>• Multiple-choice answers</p>
          <p>• Adjustable playback speed</p>
          <p>• Wrong answers added to your Error Book</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
          Select Level
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {HSK_LEVELS.map((level) => (
            <Link key={level} href={`/training/listening/session?level=${level}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    HSK {level}
                  </Badge>
                  <p className="text-xs text-muted-foreground text-center">
                    {level <= 2 ? 'Beginner' : level <= 4 ? 'Intermediate' : 'Advanced'}
                  </p>
                  <Button size="sm" className="mt-1 w-full">
                    开始练习
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
