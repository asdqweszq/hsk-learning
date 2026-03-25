'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface ErrorRecord {
  id: string
  sourceType: string
  errorNote?: string
  reviewCount: number
  word?: { hanzi: string; pinyin: string; definitionEn: string } | null
  grammarPoint?: { title: string; titleZh?: string; pattern: string } | null
  question?: { type: string; content: string; correctAnswer: string; explanation?: string } | null
}

const QUALITY_BUTTONS = [
  { label: '再次', labelEn: 'Again', value: 0, className: 'bg-red-500 hover:bg-red-600 text-white' },
  { label: '困难', labelEn: 'Hard', value: 2, className: 'bg-orange-400 hover:bg-orange-500 text-white' },
  { label: '良好', labelEn: 'Good', value: 4, className: 'bg-blue-500 hover:bg-blue-600 text-white' },
  { label: '简单', labelEn: 'Easy', value: 5, className: 'bg-green-500 hover:bg-green-600 text-white' },
]

export default function ErrorBookReviewPage() {
  const router = useRouter()
  const [items, setItems] = useState<ErrorRecord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)
  const [masteredCount, setMasteredCount] = useState(0)

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)
      try {
        const res = await fetch('/api/errors/review?count=20')
        const data = await res.json()
        setItems(data)
      } catch {
        console.error('Failed to fetch review items')
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const current = items[currentIndex]

  async function handleQuality(quality: number) {
    if (!current) return

    try {
      const res = await fetch('/api/errors/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errorId: current.id, quality }),
      })
      const data = await res.json()
      if (data.mastered) setMasteredCount((c) => c + 1)
    } catch {
      console.error('Failed to update review')
    }

    if (currentIndex + 1 >= items.length) {
      setDone(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setRevealed(false)
    }
  }

  function getCardContent(item: ErrorRecord) {
    if (item.word) {
      return {
        front: item.word.hanzi,
        back: `${item.word.pinyin}\n${item.word.definitionEn}`,
      }
    }
    if (item.grammarPoint) {
      return {
        front: item.grammarPoint.title,
        back: `${item.grammarPoint.titleZh ?? ''}\n${item.grammarPoint.pattern}`,
      }
    }
    if (item.question) {
      let qContent: any = {}
      try { qContent = JSON.parse(item.question.content) } catch { qContent = { question: item.question.content } }
      return {
        front: qContent.question ?? item.question.content,
        back: `Correct answer: ${item.question.correctAnswer}\n${item.question.explanation ?? ''}`,
      }
    }
    return { front: 'Review Item', back: item.errorNote ?? '' }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading review items...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <p className="text-2xl">🎉</p>
        <p className="font-semibold">No items due for review!</p>
        <p className="text-muted-foreground text-sm">Check back later for more reviews.</p>
        <Button onClick={() => router.push('/error-book')}>Back to Error Book</Button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Review Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-4xl font-bold">{items.length}</p>
            <p className="text-muted-foreground">Items reviewed</p>
            {masteredCount > 0 && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {masteredCount} items mastered!
              </Badge>
            )}
            <div className="flex gap-2 justify-center">
              <Button onClick={() => router.push('/error-book')}>Error Book</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0)
                  setDone(false)
                  setRevealed(false)
                  setMasteredCount(0)
                }}
              >
                Review Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const content = getCardContent(current)

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Spaced Review</h1>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {items.length}
        </span>
      </div>

      <Progress value={(currentIndex / items.length) * 100} className="h-2" />

      {/* Flashcard */}
      <Card className="min-h-[200px]">
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
          <Badge variant="outline" className="capitalize">
            {current.sourceType}
          </Badge>

          <p className="text-2xl font-bold text-center">{content.front}</p>

          {!revealed ? (
            <Button variant="outline" onClick={() => setRevealed(true)}>
              Show Answer
            </Button>
          ) : (
            <div className="text-center space-y-1">
              {content.back.split('\n').map((line, i) => (
                <p key={i} className={i === 0 ? 'font-medium' : 'text-sm text-muted-foreground'}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {revealed && (
        <div className="space-y-2">
          <p className="text-sm text-center text-muted-foreground">How well did you recall this?</p>
          <div className="grid grid-cols-4 gap-2">
            {QUALITY_BUTTONS.map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleQuality(btn.value)}
                className={`rounded-md py-2 text-sm font-medium transition-opacity ${btn.className}`}
              >
                <p>{btn.label}</p>
                <p className="text-xs opacity-75">{btn.labelEn}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
