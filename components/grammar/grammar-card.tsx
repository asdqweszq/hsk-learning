import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

interface GrammarCardProps {
  id: string
  title: string
  titleZh?: string
  hskLevel: number
  pattern: string
  explanation: string
}

export default function GrammarCard({
  id,
  title,
  titleZh,
  hskLevel,
  pattern,
  explanation,
}: GrammarCardProps) {
  return (
    <Link href={`/grammar/${id}`} className="block group">
      <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5 flex-1 min-w-0">
              <p className="font-semibold truncate">{title}</p>
              {titleZh && (
                <p className="text-sm text-muted-foreground truncate">{titleZh}</p>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Badge variant="secondary" className="text-xs">
                HSK {hskLevel}
              </Badge>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <pre className="bg-muted rounded px-2 py-1 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
            {pattern}
          </pre>
          <p className="text-sm text-muted-foreground line-clamp-2">{explanation}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
