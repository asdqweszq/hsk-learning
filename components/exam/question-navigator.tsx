'use client'

interface QuestionNavigatorProps {
  total: number
  current: number
  answers: Record<string, string>
  flagged: string[]
  questionIds: string[]
  onSelect: (index: number) => void
}

export default function QuestionNavigator({
  total,
  current,
  answers,
  flagged,
  questionIds,
  onSelect,
}: QuestionNavigatorProps) {
  return (
    <div className="grid grid-cols-4 gap-1">
      {Array.from({ length: total }, (_, i) => {
        const qid = questionIds[i]
        const isAnswered = qid ? !!answers[qid] : false
        const isFlagged = qid ? flagged.includes(qid) : false
        const isCurrent = i === current

        let className = 'h-7 w-full rounded text-xs font-medium transition-colors '

        if (isCurrent) {
          className += 'ring-2 ring-primary '
        }

        if (isFlagged) {
          className += 'bg-yellow-400 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100'
        } else if (isAnswered) {
          className += 'bg-blue-500 text-white dark:bg-blue-600'
        } else {
          className += 'bg-muted text-muted-foreground hover:bg-muted/80'
        }

        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={className}
            title={`Question ${i + 1}${isAnswered ? ' (answered)' : ''}${isFlagged ? ' (flagged)' : ''}`}
          >
            {i + 1}
          </button>
        )
      })}

      <div className="col-span-4 mt-3 space-y-1 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-muted" />
          <span className="text-muted-foreground">Unanswered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-blue-500" />
          <span className="text-muted-foreground">Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-yellow-400" />
          <span className="text-muted-foreground">Flagged</span>
        </div>
      </div>
    </div>
  )
}
