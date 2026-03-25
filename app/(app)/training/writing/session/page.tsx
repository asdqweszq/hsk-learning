'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'

const StrokeOrderCanvas = dynamic(
  () => import('@/components/training/writing/stroke-order-canvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p className="text-muted-foreground text-sm">Loading character writer...</p>
      </div>
    ),
  }
)

// Sample characters for practice when no API data
const SAMPLE_CHARS = ['你', '好', '我', '是', '中', '国', '人', '学', '生', '了']

export default function WritingSessionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get('mode') ?? 'stroke'

  const [characters, setCharacters] = useState<string[]>(SAMPLE_CHARS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quizInput, setQuizInput] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = characters[currentIndex]

  function handleNext() {
    if (currentIndex + 1 >= characters.length) {
      setDone(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setQuizInput('')
      setFeedback(null)
    }
  }

  function handleQuizSubmit() {
    if (!quizInput.trim()) return
    const isCorrect = quizInput.trim() === current
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setScore((s) => s + 1)
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Practice Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode === 'composition' && (
              <div className="text-4xl font-bold">{score} / {characters.length}</div>
            )}
            <p className="text-muted-foreground">Great job practicing your characters!</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => router.push('/training/writing')}>Back</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0)
                  setScore(0)
                  setDone(false)
                  setFeedback(null)
                  setQuizInput('')
                }}
              >
                Practice Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          {mode === 'stroke' ? 'Stroke Order' : 'Composition'}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {characters.length}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">
            {mode === 'stroke' ? 'Animated Stroke Order' : 'Write this character'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StrokeOrderCanvas
            character={current}
            quizMode={mode === 'composition'}
          />

          {mode === 'composition' && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Type the character shown above:</p>
              <div className="flex gap-2">
                <Input
                  value={quizInput}
                  onChange={(e) => setQuizInput(e.target.value)}
                  placeholder="Type character..."
                  maxLength={1}
                  className="w-24 text-center text-lg"
                  disabled={!!feedback}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuizSubmit()}
                />
                {!feedback ? (
                  <Button onClick={handleQuizSubmit} disabled={!quizInput.trim()}>
                    Check
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {currentIndex + 1 >= characters.length ? 'Finish' : 'Next'}
                  </Button>
                )}
              </div>
              {feedback && (
                <p
                  className={`text-sm font-medium ${
                    feedback === 'correct' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {feedback === 'correct' ? '✓ Correct!' : `✗ The character was: ${current}`}
                </p>
              )}
            </div>
          )}

          {mode === 'stroke' && (
            <Button onClick={handleNext} className="w-full">
              {currentIndex + 1 >= characters.length ? 'Finish' : 'Next Character'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
