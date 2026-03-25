'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import PinyinDisplay from '@/components/vocabulary/pinyin-display'
import WordDetailDialog from '@/components/vocabulary/word-detail-dialog'

interface VocabularyWord {
  id: string
  hanzi: string
  pinyin: string
  pinyinNormalized: string
  hskLevel: number
  partOfSpeech: string
  definitionEn: string
  definitionZh: string | null
  exampleSentence: string | null
  examplePinyin: string | null
  exampleTranslation: string | null
  audioPath: string | null
  strokeCount: number | null
  frequency: number
}

interface WordListItemProps {
  word: VocabularyWord
  status: string
  userId: string
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  new: { label: '新词', className: 'bg-gray-100 text-gray-600' },
  learning: { label: '学习中', className: 'bg-blue-100 text-blue-700' },
  reviewing: { label: '复习中', className: 'bg-amber-100 text-amber-700' },
  mastered: { label: '已掌握', className: 'bg-green-100 text-green-700' },
}

export default function WordListItem({ word, status, userId }: WordListItemProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)

  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.new

  async function handleFavoriteToggle(e: React.MouseEvent) {
    e.stopPropagation()
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
        setIsFavorite(data.isFavorite)
      }
    } catch {
      // ignore
    } finally {
      setFavoriteLoading(false)
    }
  }

  return (
    <>
      <div
        className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/30 cursor-pointer transition-colors group"
        onClick={() => setDialogOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setDialogOpen(true)}
      >
        {/* Hanzi */}
        <div className="w-16 shrink-0 text-center">
          <span className="font-serif text-2xl font-bold text-foreground">{word.hanzi}</span>
        </div>

        {/* Pinyin + POS + Definition */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <PinyinDisplay pinyin={word.pinyin} className="text-sm font-medium" />
            <Badge variant="secondary" className="text-xs shrink-0">
              {word.partOfSpeech}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">{word.definitionEn}</p>
          {word.definitionZh && (
            <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">{word.definitionZh}</p>
          )}
        </div>

        {/* Status */}
        <div className="shrink-0 hidden sm:block">
          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              statusConfig.className
            )}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity',
            isFavorite && 'opacity-100'
          )}
          onClick={handleFavoriteToggle}
          disabled={favoriteLoading}
          aria-label={isFavorite ? '取消收藏' : '收藏'}
        >
          <Heart
            className={cn(
              'h-4 w-4',
              isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            )}
          />
        </Button>
      </div>

      <WordDetailDialog
        word={word}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        status={status}
        isFavorite={isFavorite}
        onFavoriteChange={setIsFavorite}
      />
    </>
  )
}
