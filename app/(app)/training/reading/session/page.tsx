'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, XCircle } from 'lucide-react'

interface FillBlankContent {
  sentence: string
  options: string[]
}

interface ComprehensionContent {
  passage: string
  question: string
  options: string[]
}

interface Question {
  id: string
  type: string
  hskLevel: number
  content: FillBlankContent | ComprehensionContent | string
  correctAnswer: string
  explanation?: string
}

interface FeedbackInfo {
  correct: boolean
  correctAnswer: string
  explanation: string
}

function parsedContent(q: Question): FillBlankContent | ComprehensionContent {
  if (typeof q.content === 'string') {
    try {
      return JSON.parse(q.content)
    } catch {
      return { sentence: q.content, options: [] }
    }
  }
  return q.content as FillBlankContent | ComprehensionContent
}

function isFillBlank(c: FillBlankContent | ComprehensionContent): c is FillBlankContent {
  return 'sentence' in c
}

export default function ReadingSessionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const level = searchParams.get('level') ?? '3'

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string>('')
  const [feedback, setFeedback] = useState<FeedbackInfo | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/training/questions?type=reading&level=${level}&count=10`
        )
        const data = await res.json()
        setQuestions(data)
      } catch {
        console.error('Failed to fetch questions')
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [level])

  const current = questions[currentIndex]

  async function handleSubmit() {
    if (!selected || feedback || submitting) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/training/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: current.id,
          answer: selected,
          sessionType: 'reading',
        }),
      })
      const data = await res.json()
      setFeedback(data)
      setResults((prev) => [...prev, data.correct])
    } catch {
      setFeedback({ correct: false, correctAnswer: '', explanation: '' })
    } finally {
      setSubmitting(false)
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected('')
      setFeedback(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4">
        <p className="text-muted-foreground">No reading questions available for HSK {level}.</p>
        <Button variant="outline" onClick={() => router.push('/training/reading')}>
          Back
        </Button>
      </div>
    )
  }

  if (done) {
    const correct = results.filter(Boolean).length
    const total = results.length
    const pct = Math.round((correct / total) * 100)
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Session Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="text-4xl font-bold">{pct}%</div>
            <p className="text-muted-foreground">
              {correct} / {total} correct
            </p>
            <Progress value={pct} className="h-3" />
            <div className="flex gap-2 justify-center pt-2">
              <Button onClick={() => router.push('/training/reading')}>Choose Level</Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/training/reading/session?level=${level}`)}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const content = parsedContent(current)

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline">HSK {level}</Badge>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <Progress value={(currentIndex / questions.length) * 100} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">
            {isFillBlank(content) ? 'Fill in the blank' : 'Reading Comprehension'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isFillBlank(content) ? (
            <div className="space-y-3">
              <p className="text-base font-medium">
                {content.sentence.replace('____', '______')}
              </p>
              <Select value={selected} onValueChange={setSelected} disabled={!!feedback}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the correct word..." />
                </SelectTrigger>
                <SelectContent>
                  {content.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted rounded-md p-4">
                <p className="text-sm leading-relaxed">{(content as ComprehensionContent).passage}</p>
              </div>
              <p className="font-medium">{(content as ComprehensionContent).question}</p>
              <div className="space-y-2">
                {(content as ComprehensionContent).options.map((option, i) => {
                  let extraClass = ''
                  if (feedback) {
                    if (option === feedback.correctAnswer) {
                      extraClass = 'border-green-500 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200'
                    } else if (option === selected && !feedback.correct) {
                      extraClass = 'border-red-500 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200'
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !feedback && setSelected(option)}
                      disabled={!!feedback}
                      className={`w-full text-left px-4 py-2 rounded-md border text-sm transition-colors
                        ${extraClass || (selected === option ? 'bg-secondary border-secondary-foreground/20' : 'bg-background hover:bg-muted')}
                        disabled:cursor-default`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {feedback && (
        <div
          className={`rounded-md px-4 py-3 flex items-start gap-2 text-sm ${
            feedback.correct
              ? 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200'
              : 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200'
          }`}
        >
          {feedback.correct ? (
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-medium">
              {feedback.correct ? 'Correct!' : `Incorrect. Answer: ${feedback.correctAnswer}`}
            </p>
            {feedback.explanation && (
              <p className="mt-1 opacity-80">{feedback.explanation}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        {!feedback ? (
          <Button onClick={handleSubmit} disabled={!selected || submitting}>
            {submitting ? 'Checking...' : 'Submit'}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  )
}
