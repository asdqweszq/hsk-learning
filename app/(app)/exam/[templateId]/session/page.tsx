'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ExamTimer from '@/components/exam/exam-timer'
import QuestionNavigator from '@/components/exam/question-navigator'
import { Flag, ChevronLeft, ChevronRight } from 'lucide-react'

interface Question {
  id: string
  type: string
  content: any
  correctAnswer: string
  explanation?: string
}

type AnswerMap = Record<string, string>
type FlagSet = Set<string>

export default function ExamSessionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const examRecordId = searchParams.get('examRecordId') ?? ''

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [flagged, setFlagged] = useState<FlagSet>(new Set())
  const [durationMins, setDurationMins] = useState(90)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Questions were already fetched during exam start; load from session storage
    const cached = sessionStorage.getItem(`exam_${examRecordId}`)
    if (cached) {
      const { questions: qs, durationMins: dm } = JSON.parse(cached)
      setQuestions(qs)
      setDurationMins(dm ?? 90)
      setLoading(false)
    } else {
      // Fallback: we don't re-fetch here; redirect back
      router.push('/exam')
    }
  }, [examRecordId, router])

  const current = questions[currentIndex]

  async function saveAnswer(questionId: string, answer: string) {
    await fetch('/api/exam/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examRecordId, questionId, answer }),
    })
  }

  async function handleSelect(option: string) {
    if (!current || submitting) return
    const newAnswers = { ...answers, [current.id]: option }
    setAnswers(newAnswers)
    await saveAnswer(current.id, option)
  }

  function handleFlag() {
    if (!current) return
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(current.id)) next.delete(current.id)
      else next.add(current.id)
      return next
    })
  }

  async function handleSubmit() {
    if (submitting) return
    if (!confirm('Submit exam now? You cannot change your answers after submission.')) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examRecordId }),
      })
      const data = await res.json()
      sessionStorage.removeItem(`exam_${examRecordId}`)
      router.push(`/exam/results/${examRecordId}`)
    } catch {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading exam...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-muted-foreground">No questions found for this exam.</p>
        <Button onClick={() => router.push('/exam')}>Back to Exams</Button>
      </div>
    )
  }

  const content =
    current && (typeof current.content === 'string'
      ? (() => { try { return JSON.parse(current.content) } catch { return { text: current.content, question: '', options: [] } } })()
      : current.content)

  const answeredCount = Object.keys(answers).length
  const flaggedIds = Array.from(flagged)

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background shrink-0">
        <p className="font-semibold text-sm">Mock Exam</p>
        <ExamTimer durationMins={durationMins} onExpire={handleSubmit} />
        <Button
          size="sm"
          variant="destructive"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Exam'}
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigator */}
        <div className="w-48 shrink-0 border-r p-3 overflow-y-auto">
          <p className="text-xs text-muted-foreground mb-2">
            {answeredCount}/{questions.length} answered
          </p>
          <QuestionNavigator
            total={questions.length}
            current={currentIndex}
            answers={answers}
            flagged={flaggedIds}
            onSelect={(i) => setCurrentIndex(i)}
            questionIds={questions.map((q) => q.id)}
          />
        </div>

        {/* Main question area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <Button
                size="sm"
                variant={flagged.has(current?.id ?? '') ? 'default' : 'outline'}
                onClick={handleFlag}
                className="gap-1"
              >
                <Flag className="h-3.5 w-3.5" />
                {flagged.has(current?.id ?? '') ? 'Flagged' : 'Flag'}
              </Button>
            </div>

            {current && (
              <Card>
                <CardContent className="pt-4 space-y-4">
                  {/* Passage / audio text */}
                  {(content?.passage || content?.text) && (
                    <div className="bg-muted rounded-md p-3 text-sm leading-relaxed">
                      {content.passage ?? content.text}
                    </div>
                  )}

                  <p className="font-medium">
                    {content?.question ?? content?.sentence ?? ''}
                  </p>

                  <div className="space-y-2">
                    {(content?.options as string[] ?? []).map((opt: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(opt)}
                        className={`w-full text-left px-4 py-2 rounded-md border text-sm transition-colors
                          ${answers[current.id] === opt
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background hover:bg-muted'
                          }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                disabled={currentIndex === questions.length - 1}
                className="gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
