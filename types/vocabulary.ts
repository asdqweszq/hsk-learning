export interface VocabularyWord {
  id: string
  hanzi: string
  pinyin: string
  pinyinNormalized: string
  hskLevel: number
  partOfSpeech: string
  definitionEn: string
  definitionZh?: string | null
  exampleSentence?: string | null
  examplePinyin?: string | null
  exampleTranslation?: string | null
  audioPath?: string | null
  strokeCount?: number | null
  frequency: number
}

export interface UserWordProgress {
  id: string
  userId: string
  wordId: string
  status: 'new' | 'learning' | 'reviewing' | 'mastered'
  correctCount: number
  incorrectCount: number
  easeFactor: number
  interval: number
  repetitions: number
  dueDate: Date
  lastReviewedAt?: Date | null
}

export interface WordWithProgress extends VocabularyWord {
  progress?: UserWordProgress
}

export type StudyMode = 'flashcard' | 'quiz' | 'favorites'

export interface FlashcardResult {
  wordId: string
  quality: 0 | 2 | 4 | 5
}
