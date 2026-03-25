'use client'

import { useState, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react'

interface StudyWord {
  id: string
  hanzi: string
  pinyin: string
  partOfSpeech: string
  definitionEn: string
  definitionZh: string | null
  exampleSentence: string | null
  examplePinyin: string | null
  exampleTranslation: string | null
}

interface QuizSessionProps {
  words: StudyWord[]
  onComplete: () => void
}

interface QuizQuestion {
  word: StudyWord
  options: string[]
  correctIndex: number
}

function buildQuestions(words: StudyWord[]): QuizQuestion[] {
  return words.map((word) => {
    const otherDefs = words
      .filter((w) => w.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.definitionEn)

    const correctIndex = Math.floor(Math.random() * 4)
    const options = [...otherDefs]
    options.splice(correctIndex, 0, word.definitionEn)

    return { word, options, correctIndex }
  })
}

export default function QuizSession({ words, onComplete }: QuizSessionProps) {
  const questions = useMemo(() => buildQuestions(words), [words])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState<StudyWord[]>([])

  const current = questions[currentIndex]
  const progress = (currentIndex / questions.length) * 100
  const isAnswered = selectedIndex !== null

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (isAnswered) return
      setSelectedIndex(optionIndex)

      const isCorrect = optionIndex === current.correctIndex
      if (isCorrect) {
        setScore((s) => s + 1)
      } else {
        setWrongAnswers((wa) => [...wa, current.word])
      }
    },
    [isAnswered, current]
  )

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setCompleted(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedIndex(null)
    }
  }

  function getOptionClassName(index: number) {
    if (!isAnswered) {
      return 'border-border hover:border-primary hover:bg-accent'
    }
    if (index === current.correctIndex) {
      return 'border-green-400 bg-green-50 text-green-800'
    }
    if (index === selectedIndex && index !== current.correctIndex) {
      return 'border-red-400 bg-red-50 text-red-800'
    }
    return 'border-border opacity-50'
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Trophy
              className={cn(
                'h-16 w-16',
                percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-blue-500' : 'text-gray-400'
              )}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-1">测验完成！</h2>
            <p className="text-muted-foreground">共 {questions.length} 道题</p>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <p className="text-5xl font-bold mb-1">{percentage}%</p>
            <p className="text-muted-foreground">
              答对 {score} / {questions.length} 题
            </p>
          </div>

          {wrongAnswers.length > 0 && (
            <div className="text-left">
              <p className="text-sm font-medium text-muted-foreground mb-2">答错的词汇：</p>
              <div className="space-y-1">
                {wrongAnswers.map((w) => (
                  <div key={w.id} className="flex items-center gap-3 text-sm p-2 rounded bg-red-50">
                    <span className="font-serif font-bold text-base">{w.hanzi}</span>
                    <span className="text-muted-foreground">{w.pinyin}</span>
                    <span className="text-muted-foreground">— {w.definitionEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onComplete} className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              重新开始
            </Button>
            <Button onClick={() => (window.location.href = '/vocabulary')} className="flex-1">
              返回词汇表
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            {currentIndex + 1} / {questions.length}
          </span>
          <span>
            得分：{score}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="rounded-xl border bg-card shadow-sm p-6 mb-6 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">选择正确的释义</p>
        <span className="font-serif text-5xl font-bold">{current.word.hanzi}</span>
        <div className="mt-2">
          <span className="text-sm text-muted-foreground">{current.word.pinyin}</span>
          <span className="text-xs text-muted-foreground mx-2">·</span>
          <span className="text-xs bg-muted rounded px-1.5 py-0.5">{current.word.partOfSpeech}</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {current.options.map((option, index) => (
          <button
            key={index}
            className={cn(
              'w-full text-left rounded-lg border p-4 transition-colors text-sm',
              getOptionClassName(index),
              !isAnswered && 'cursor-pointer'
            )}
            onClick={() => handleSelect(index)}
            disabled={isAnswered}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {isAnswered && index === current.correctIndex && (
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
              )}
              {isAnswered && index === selectedIndex && index !== current.correctIndex && (
                <XCircle className="h-4 w-4 text-red-600 shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback + Next */}
      {isAnswered && (
        <div className="space-y-3">
          <div
            className={cn(
              'rounded-lg p-3 text-sm',
              selectedIndex === current.correctIndex
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            )}
          >
            {selectedIndex === current.correctIndex ? (
              <p className="font-medium">正确！</p>
            ) : (
              <p>
                <strong>答案：</strong>
                {current.options[current.correctIndex]}
              </p>
            )}
            {current.word.exampleSentence && (
              <p className="mt-1 text-xs opacity-80">例：{current.word.exampleSentence}</p>
            )}
          </div>

          <Button onClick={handleNext} className="w-full">
            {currentIndex + 1 >= questions.length ? '查看结果' : '下一题'}
          </Button>
        </div>
      )}
    </div>
  )
}
