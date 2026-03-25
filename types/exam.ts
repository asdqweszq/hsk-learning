export type QuestionType =
  | 'listening_dialogue'
  | 'listening_audio'
  | 'reading_fill'
  | 'reading_order'
  | 'reading_comprehension'
  | 'writing_stroke'

export interface ListeningDialogueContent {
  dialogue: { speaker: string; text: string }[]
  question: string
  options: string[]
}

export interface ReadingFillContent {
  sentence: string
  options: string[]
}

export interface ReadingOrderContent {
  segments: string[]
  hint?: string
}

export interface ReadingComprehensionContent {
  passage: string
  question: string
  options: string[]
}

export interface WritingStrokeContent {
  character: string
  strokeCount: number
  mode: 'recognize' | 'order'
}

export interface Question {
  id: string
  type: QuestionType
  hskLevel: number
  content: string // JSON string
  correctAnswer: string
  explanation?: string | null
  audioPath?: string | null
  difficulty: number
}

export interface ExamTemplate {
  id: string
  hskLevel: number
  name: string
  description?: string | null
  durationMins: number
  totalScore: number
  passScore: number
  structure: string // JSON string
}

export interface ExamStructure {
  listening: { count: number; score: number }
  reading: { count: number; score: number }
  writing: { count: number; score: number }
}

export interface ExamRecord {
  id: string
  userId: string
  templateId: string
  status: 'in_progress' | 'completed' | 'abandoned'
  startedAt: Date
  submittedAt?: Date | null
  totalScore?: number | null
  listeningScore?: number | null
  readingScore?: number | null
  writingScore?: number | null
  passed?: boolean | null
  timeSpentSecs?: number | null
}
