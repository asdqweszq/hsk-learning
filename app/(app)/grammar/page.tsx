import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GrammarCard from '@/components/grammar/grammar-card'

export const dynamic = 'force-dynamic'

export default async function GrammarPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const grammarPoints = await prisma.grammarPoint.findMany({
    orderBy: [{ hskLevel: 'asc' }, { difficulty: 'asc' }],
  })

  // Group by level
  const byLevel = grammarPoints.reduce<Record<number, typeof grammarPoints>>(
    (acc, gp) => {
      if (!acc[gp.hskLevel]) acc[gp.hskLevel] = []
      acc[gp.hskLevel].push(gp)
      return acc
    },
    {}
  )

  const levels = Object.keys(byLevel)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">语法点 Grammar</h1>
        <p className="text-muted-foreground mt-1">Browse grammar patterns grouped by HSK level</p>
      </div>

      {levels.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No grammar points available yet.
        </div>
      ) : (
        <Tabs defaultValue={String(levels[0])}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            {levels.map((level) => (
              <TabsTrigger key={level} value={String(level)}>
                HSK {level}
              </TabsTrigger>
            ))}
          </TabsList>

          {levels.map((level) => (
            <TabsContent key={level} value={String(level)} className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {byLevel[level].map((gp) => (
                  <GrammarCard
                    key={gp.id}
                    id={gp.id}
                    title={gp.title}
                    titleZh={gp.titleZh ?? undefined}
                    hskLevel={gp.hskLevel}
                    pattern={gp.pattern}
                    explanation={gp.explanation}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
