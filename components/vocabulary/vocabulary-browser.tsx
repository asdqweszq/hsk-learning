'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import WordListItem from '@/components/vocabulary/word-list-item'
import { Search, BookOpen, GraduationCap } from 'lucide-react'

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

interface VocabularyBrowserProps {
  words: VocabularyWord[]
  total: number
  page: number
  pageSize: number
  level: number
  search: string
  progressMap: Record<string, string>
  userId: string
}

const HSK_LEVELS = [1, 2, 3, 4, 5, 6]

export default function VocabularyBrowser({
  words,
  total,
  page,
  pageSize,
  level,
  search,
  progressMap,
  userId,
}: VocabularyBrowserProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [searchInput, setSearchInput] = useState(search)
  const [isPending, startTransition] = useTransition()

  const totalPages = Math.ceil(total / pageSize)

  function buildUrl(params: { level?: number; page?: number; search?: string }) {
    const sp = new URLSearchParams()
    const lvl = params.level ?? level
    const pg = params.page ?? page
    const q = params.search !== undefined ? params.search : search
    sp.set('level', String(lvl))
    sp.set('page', String(pg))
    if (q) sp.set('search', q)
    return `${pathname}?${sp.toString()}`
  }

  function handleLevelChange(newLevel: string) {
    startTransition(() => {
      router.push(buildUrl({ level: parseInt(newLevel), page: 1, search: '' }))
    })
    setSearchInput('')
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    startTransition(() => {
      router.push(buildUrl({ page: 1, search: searchInput }))
    })
  }

  function handlePageChange(newPage: number) {
    startTransition(() => {
      router.push(buildUrl({ page: newPage }))
    })
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">词汇学习</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/vocabulary/study')}
          className="gap-2"
        >
          <GraduationCap className="h-4 w-4" />
          开始学习
        </Button>
      </div>

      {/* Level Tabs */}
      <Tabs value={String(level)} onValueChange={handleLevelChange} className="mb-6">
        <TabsList className="grid grid-cols-6 w-full">
          {HSK_LEVELS.map((l) => (
            <TabsTrigger key={l} value={String(l)}>
              HSK {l}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="搜索汉字、拼音或释义..."
            className="pl-9"
          />
        </div>
        <Button type="submit" disabled={isPending}>
          搜索
        </Button>
        {search && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSearchInput('')
              startTransition(() => {
                router.push(buildUrl({ page: 1, search: '' }))
              })
            }}
          >
            清除
          </Button>
        )}
      </form>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>
          共 <strong className="text-foreground">{total}</strong> 个词汇
          {search && (
            <span>
              ，搜索"<strong className="text-foreground">{search}</strong>"
            </span>
          )}
        </span>
        <span>
          第 {page} / {totalPages || 1} 页
        </span>
      </div>

      {/* Word List */}
      <div className="space-y-2">
        {words.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg">没有找到词汇</p>
            {search && <p className="text-sm mt-1">试试其他搜索词</p>}
          </div>
        ) : (
          words.map((word) => (
            <WordListItem
              key={word.id}
              word={word}
              status={progressMap[word.id] || 'new'}
              userId={userId}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || isPending}
            onClick={() => handlePageChange(page - 1)}
          >
            上一页
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 7) {
                pageNum = i + 1
              } else if (page <= 4) {
                pageNum = i + 1
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i
              } else {
                pageNum = page - 3 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                  className="w-8 h-8 p-0"
                  disabled={isPending}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || isPending}
            onClick={() => handlePageChange(page + 1)}
          >
            下一页
          </Button>
        </div>
      )}
    </div>
  )
}
