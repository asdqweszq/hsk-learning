'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import PinyinDisplay from '@/components/vocabulary/pinyin-display'
import { HskLevelBadge } from '@/components/shared/hsk-level-badge'

interface VocabularyWord {
  id: string
  hanzi: string
  pinyin: string
  hskLevel: number
  partOfSpeech: string
  definitionEn: string
  definitionZh: string | null
  exampleSentence: string | null
  examplePinyin: string | null
  exampleTranslation: string | null
  audioPath: string | null
  strokeCount: number | null
}

interface WordDetailDialogProps {
  word: VocabularyWord
  open: boolean
  onOpenChange: (open: boolean) => void
  status: string
  isFavorite: boolean
  onFavoriteChange: (fav: boolean) => void
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  new: { label: '新词', className: 'bg-gray-100 text-gray-600' },
  learning: { label: '学习中', className: 'bg-blue-100 text-blue-700' },
  reviewing: { label: '复习中', className: 'bg-amber-100 text-amber-700' },
  mastered: { label: '已掌握', className: 'bg-green-100 text-green-700' },
}

export default function WordDetailDialog({
  word,
  open,
  onOpenChange,
  status,
  isFavorite,
  onFavoriteChange,
}: WordDetailDialogProps) {
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.new

  function handleSpeak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  async function handleFavoriteToggle() {
    if (favoriteLoading) return
    setFavoriteLoading(true)
    try {
      const res = await fetch('/api/vocabulary/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wordId: word.id }),
      })
      if (res.ok) {
        const data = await res.json()
        onFavoriteChange(data.isFavorite)
      }
    } catch {
      // ignore
    } finally {
      setFavoriteLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="sr-only">{word.hanzi} 词汇详情</DialogTitle>
        </DialogHeader>

        {/* Main word display */}
        <div className="text-center py-4 border-b">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-serif text-5xl font-bold">{word.hanzi}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={() => handleSpeak(word.hanzi)}
              aria-label="朗读"
            >
              <Volume2 className={cn('h-5 w-5', speaking && 'text-primary animate-pulse')} />
            </Button>
          </div>

          <PinyinDisplay
            pinyin={word.pinyin}
            className="text-xl justify-center"
            syllableClassName="font-medium"
          />
        </div>

        {/* Word info */}
        <div className="space-y-4 py-2">
          {/* Tags row */}
          <div className="flex items-center gap-2 flex-wrap">
            <HskLevelBadge level={word.hskLevel} />
            <Badge variant="secondary">{word.partOfSpeech}</Badge>
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                statusConfig.className
              )}
            >
              {statusConfig.label}
            </span>
            {word.strokeCount && (
              <span className="text-xs text-muted-foreground">{word.strokeCount} 笔画</span>
            )}
          </div>

          {/* Definitions */}
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">释义</p>
            <p className="text-base">{word.definitionEn}</p>
            {word.definitionZh && (
              <p className="text-sm text-muted-foreground mt-1">{word.definitionZh}</p>
            )}
          </div>

          {/* Example sentence */}
          {word.exampleSentence && (
            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground font-medium">例句</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleSpeak(word.exampleSentence!)}
                  aria-label="朗读例句"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-base font-medium">{word.exampleSentence}</p>
              {word.examplePinyin && (
                <PinyinDisplay
                  pinyin={word.examplePinyin}
                  className="text-sm flex-wrap"
                />
              )}
              {word.exampleTranslation && (
                <p className="text-sm text-muted-foreground italic">{word.exampleTranslation}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex justify-end pt-2 border-t">
          <Button
            variant={isFavorite ? 'default' : 'outline'}
            size="sm"
            className="gap-2"
            onClick={handleFavoriteToggle}
            disabled={favoriteLoading}
          >
            <Heart
              className={cn('h-4 w-4', isFavorite && 'fill-current')}
            />
            {isFavorite ? '已收藏' : '收藏'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
