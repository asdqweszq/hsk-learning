'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FlashcardSession from '@/components/vocabulary/flashcard-session'
import QuizSession from '@/components/vocabulary/quiz-session'
import { BookOpen, Layers, CheckSquare, Heart, GraduationCap } from 'lucide-react'

type StudyMode = 'flashcard' | 'quiz' | 'favorites'

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

export default function VocabularyStudyPage() {
  const router = useRouter()
  const [mode, setMode] = useState<StudyMode>('flashcard')
  const [level, setLevel] = useState('1')
  const [count, setCount] = useState('20')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [words, setWords] = useState<StudyWord[] | null>(null)

  async function handleStart() {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ level, page: '1' })
      if (mode === 'favorites') params.set('favorites', '1')

      const res = await fetch(`/api/vocabulary?${params}`)
      if (!res.ok) throw new Error('Failed to load words')
      const data = await res.json()

      const allWords: StudyWord[] = data.words || []
      const shuffled = allWords.sort(() => Math.random() - 0.5).slice(0, parseInt(count))

      if (shuffled.length === 0) {
        setError('该级别暂无词汇，请先添加单词或选择其他级别。')
        setLoading(false)
        return
      }

      setWords(shuffled)
    } catch {
      setError('加载词汇失败，请重试。')
    } finally {
      setLoading(false)
    }
  }

  function handleComplete() {
    setWords(null)
  }

  if (words) {
    if (mode === 'flashcard' || mode === 'favorites') {
      return <FlashcardSession words={words} level={parseInt(level)} onComplete={handleComplete} />
    }
    if (mode === 'quiz') {
      return <QuizSession words={words} onComplete={handleComplete} />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">词汇学习</h1>
      </div>

      <div className="space-y-6">
        {/* Mode selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">学习模式</CardTitle>
            <CardDescription>选择最适合你的学习方式</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={(v) => setMode(v as StudyMode)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="flashcard" className="gap-1.5 text-xs sm:text-sm">
                  <Layers className="h-3.5 w-3.5" />
                  闪卡
                </TabsTrigger>
                <TabsTrigger value="quiz" className="gap-1.5 text-xs sm:text-sm">
                  <CheckSquare className="h-3.5 w-3.5" />
                  选择题
                </TabsTrigger>
                <TabsTrigger value="favorites" className="gap-1.5 text-xs sm:text-sm">
                  <Heart className="h-3.5 w-3.5" />
                  收藏复习
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4 text-sm text-muted-foreground">
              {mode === 'flashcard' && (
                <p className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 mt-0.5 shrink-0" />
                  看到汉字，翻转卡片查看拼音和释义，然后根据掌握程度评分。系统将根据间隔重复算法安排复习时间。
                </p>
              )}
              {mode === 'quiz' && (
                <p className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 mt-0.5 shrink-0" />
                  看到汉字，从四个选项中选出正确的英文释义。即时反馈帮助你加深记忆。
                </p>
              )}
              {mode === 'favorites' && (
                <p className="flex items-start gap-2">
                  <Heart className="h-4 w-4 mt-0.5 shrink-0" />
                  复习你收藏的词汇，重点练习你觉得重要或困难的单词。
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">学习设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">HSK 级别</label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((l) => (
                      <SelectItem key={l} value={String(l)}>
                        HSK {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">每次学习词数</label>
                <Select value={count} onValueChange={setCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 个词</SelectItem>
                    <SelectItem value="20">20 个词</SelectItem>
                    <SelectItem value="30">30 个词</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/vocabulary')}
            className="flex-1"
          >
            返回词汇表
          </Button>
          <Button
            onClick={handleStart}
            disabled={loading}
            className="flex-1"
          >
            {loading ? '加载中...' : '开始学习'}
          </Button>
        </div>
      </div>
    </div>
  )
}
