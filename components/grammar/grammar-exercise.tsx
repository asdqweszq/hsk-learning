'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface GrammarExerciseProps {
  pointId: string
  exampleId: string
  sentence: string
  pinyin: string
  translation: string
  blankOptions: string[]
}

type FeedbackState = 'idle' | 'correct' | 'wrong'

export default function GrammarExercise({
  pointId,
  exampleId,
  sentence,
  pinyin,
  translation,
  blankOptions,
}: GrammarExerciseProps) {
  const [selected, setSelected] = useState<string>('')
  const [feedback, setFeedback] = useState<FeedbackState>('idle')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [explanation, setExplanation] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // Split sentence on ___blank___
  const parts = sentence.split('___blank___')

  async function handleSubmit() {
    if (!selected) return
    setLoading(true)
    try {
      const res = await fetch(`/api/grammar/${pointId}/exercise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exampleId, answer: selected }),
      })
      const data = await res.json()
      setFeedback(data.correct ? 'correct' : 'wrong')
      setCorrectAnswer(data.correctAnswer)
      setExplanation(data.explanation)
    } catch {
      setFeedback('wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setSelected('')
    setFeedback('idle')
    setCorrectAnswer('')
    setExplanation('')
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1 text-base">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center gap-1">
            <span>{part}</span>
            {i < parts.length - 1 && (
              <span className="inline-block">
                {feedback === 'idle' ? (
                  <Select value={selected} onValueChange={setSelected} disabled={loading}>
                    <SelectTrigger className="h-8 min-w-[100px] text-base">
                      <SelectValue placeholder="____" />
                    </SelectTrigger>
                    <SelectContent>
                      {blankOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span
                    className={`px-2 py-0.5 rounded font-medium ${
                      feedback === 'correct'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {feedback === 'correct' ? selected : correctAnswer}
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{pinyin}</p>
      <p className="text-sm italic text-muted-foreground">{translation}</p>

      {feedback !== 'idle' && (
        <div
          className={`rounded-md px-3 py-2 text-sm ${
            feedback === 'correct'
              ? 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200'
              : 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200'
          }`}
        >
          {feedback === 'correct' ? '✓ Correct!' : `✗ Incorrect. Correct answer: ${correctAnswer}`}
          {explanation && <p className="mt-1 text-xs opacity-80">{explanation}</p>}
        </div>
      )}

      <div className="flex gap-2">
        {feedback === 'idle' ? (
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!selected || loading}
          >
            {loading ? 'Checking...' : 'Submit'}
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={handleReset}>
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}
