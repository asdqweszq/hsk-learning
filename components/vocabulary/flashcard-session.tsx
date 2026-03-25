'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import PinyinDisplay from '@/components/vocabulary/pinyin-display'
import { CheckCircle, RotateCcw, Volume2 } from 'lucide-react'

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

interface RatingResult {
  wordId: string
  quality: number
}

interface FlashcardSessionProps {
  words: StudyWord[]
  level: number
  onComplete: () => void
}

type RatingKey = 'again' | 'hard' | 'good' | 'easy'

const RATINGS: { key: RatingKey; label: string; quality: number; className: string }[] = [
  { key: 'again', label: '重来', quality: 0, className: 'border-red-300 text-red-600 hover:bg-red-50' },
  { key: 'hard', label: '困难', quality: 2, className: 'border-amber-300 text-amber-600 hover:bg-amber-50' },
  { key: 'good', label: '一般', quality: 4, className: 'border-blue-300 text-blue-600 hover:bg-blue-50' },
  { key: 'easy', label: '简单', quality: 5, className: 'border-green-300 text-green-600 hover:bg-green-50' },
]

export default function FlashcardSession({ words, level, onComplete }: FlashcardSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState<RatingResult[]>([])
  const [completed, setCompleted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [summary, setSummary] = useState<{ again: number; hard: number; good: number; easy: number } | null>(null)

  const currentWord = words[currentIndex]
  const progress = ((currentIndex) / words.length) * 100

  function handleFlip() {
    setIsFlipped((f) => !f)
  }

  function handleSpeak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }

  const handleRate = useCallback(
    async (quality: number, key: RatingKey) => {
      const newResult: RatingResult = { wordId: currentWord.id, quality }
      const newResults = [...results, newResult]
      setResults(newResults)

      if (currentIndex + 1 >= words.length) {
        // Session complete
        setSaving(true)
        const counts = { again: 0, hard: 0, good: 0, easy: 0 }
        newResults.forEach((r) => {
          if (r.quality === 0) counts.again++
          else if (r.quality === 2) counts.hard++
          else if (r.quality === 4) counts.good++
          else if (r.quality === 5) counts.easy++
        })
        setSummary(counts)

        try {
          await fetch('/api/vocabulary/progress', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviews: newResults }),
          })
        } catch {
          // ignore save errors, session still complete
        } finally {
          setSaving(false)
          setCompleted(true)
        }
      } else {
        setCurrentIndex((i) => i + 1)
        setIsFlipped(false)
      }
    },
    [currentIndex, currentWord, results, words.length]
  )

  if (completed) {
    const total = words.length
    const known = (summary?.good ?? 0) + (summary?.easy ?? 0)
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">学习完成！</h2>
            <p className="text-muted-foreground">共复习了 {total} 个词汇</p>
          </div>

          {summary && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-center">
                <p className="text-2xl font-bold text-red-600">{summary.again}</p>
                <p className="text-sm text-red-500">重来</p>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">{summary.hard}</p>
                <p className="text-sm text-amber-500">困难</p>
              </div>
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{summary.good}</p>
                <p className="text-sm text-blue-500">一般</p>
              </div>
              <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{summary.easy}</p>
                <p className="text-sm text-green-500">简单</p>
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            掌握率：<strong className="text-foreground">{Math.round((known / total) * 100)}%</strong>
            （{known}/{total} 个词汇）
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onComplete} className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              重新开始
            </Button>
            <Button onClick={() => window.location.href = '/vocabulary'} className="flex-1">
              返回词汇表
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (saving) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg text-center">
        <p className="text-muted-foreground">正在保存学习进度...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{currentIndex + 1} / {words.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div
          className="relative transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '280px',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl border bg-card shadow-md flex flex-col items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide">点击翻转</p>
            <div className="flex items-center gap-2">
              <span className="font-serif text-6xl font-bold">{currentWord.hanzi}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSpeak(currentWord.hanzi)
                }}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl border bg-card shadow-md flex flex-col items-start justify-center p-6 gap-3"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="flex items-center gap-2 w-full">
              <span className="font-serif text-3xl font-bold">{currentWord.hanzi}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground ml-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSpeak(currentWord.hanzi)
                }}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>

            <PinyinDisplay pinyin={currentWord.pinyin} className="text-lg" />

            <div>
              <span className="text-xs bg-muted rounded px-1.5 py-0.5 text-muted-foreground mr-2">
                {currentWord.partOfSpeech}
              </span>
              <span className="text-base">{currentWord.definitionEn}</span>
            </div>

            {currentWord.definitionZh && (
              <p className="text-sm text-muted-foreground">{currentWord.definitionZh}</p>
            )}

            {currentWord.exampleSentence && (
              <div className="w-full bg-muted/50 rounded-lg p-3 space-y-1 mt-1">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{currentWord.exampleSentence}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSpeak(currentWord.exampleSentence!)
                    }}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                {currentWord.examplePinyin && (
                  <PinyinDisplay pinyin={currentWord.examplePinyin} className="text-xs flex-wrap" />
                )}
                {currentWord.exampleTranslation && (
                  <p className="text-xs text-muted-foreground italic">{currentWord.exampleTranslation}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons - only show when flipped */}
      <div
        className={cn(
          'mt-6 grid grid-cols-4 gap-2 transition-opacity duration-300',
          isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {RATINGS.map((r) => (
          <Button
            key={r.key}
            variant="outline"
            className={cn('flex-col h-auto py-2', r.className)}
            onClick={() => handleRate(r.quality, r.key)}
          >
            <span className="text-base font-bold">{r.label}</span>
          </Button>
        ))}
      </div>

      {!isFlipped && (
        <p className="text-center text-sm text-muted-foreground mt-6">
          点击卡片查看答案
        </p>
      )}
    </div>
  )
}
