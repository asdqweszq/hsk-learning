import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PenLine } from 'lucide-react'

const WRITING_OPTIONS = [
  {
    id: 'stroke-order',
    title: '笔顺练习',
    titleEn: 'Stroke Order',
    description: 'Learn the correct stroke order for Chinese characters with animated guidance.',
    href: '/training/writing/session?mode=stroke',
  },
  {
    id: 'composition',
    title: '汉字识别',
    titleEn: 'Character Recognition',
    description: 'Practice identifying and writing characters from their components.',
    href: '/training/writing/session?mode=composition',
  },
]

export default async function WritingPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
          <PenLine className="h-6 w-6 text-orange-600 dark:text-orange-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Writing Practice</h1>
          <p className="text-muted-foreground text-sm">书写练习 — Master Chinese character writing</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {WRITING_OPTIONS.map((opt) => (
          <Card key={opt.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{opt.title}</CardTitle>
              <CardDescription>{opt.titleEn}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{opt.description}</p>
              <Link href={opt.href}>
                <Button className="w-full">开始练习</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-4 space-y-1 text-sm text-muted-foreground">
          <p>• Uses animated stroke-order visualization</p>
          <p>• Quiz mode: click strokes in the correct order</p>
          <p>• Covers HSK 1-6 characters</p>
        </CardContent>
      </Card>
    </div>
  )
}
