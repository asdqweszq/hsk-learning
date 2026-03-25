import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ExamAnswer {
  questionId: string
  answer: string
  flagged: boolean
}

interface ExamState {
  examRecordId: string | null
  templateId: string | null
  hskLevel: number | null
  durationSecs: number
  elapsedSecs: number
  currentQuestionIndex: number
  answers: Record<string, ExamAnswer>
  isRunning: boolean
  isSubmitted: boolean

  startExam: (examRecordId: string, templateId: string, level: number, durationSecs: number) => void
  setAnswer: (questionId: string, answer: string) => void
  toggleFlag: (questionId: string) => void
  goToQuestion: (index: number) => void
  tick: () => void
  submitExam: () => void
  resetExam: () => void
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      examRecordId: null,
      templateId: null,
      hskLevel: null,
      durationSecs: 0,
      elapsedSecs: 0,
      currentQuestionIndex: 0,
      answers: {},
      isRunning: false,
      isSubmitted: false,

      startExam: (examRecordId, templateId, level, durationSecs) =>
        set({
          examRecordId,
          templateId,
          hskLevel: level,
          durationSecs,
          elapsedSecs: 0,
          currentQuestionIndex: 0,
          answers: {},
          isRunning: true,
          isSubmitted: false,
        }),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              questionId,
              answer,
              flagged: state.answers[questionId]?.flagged ?? false,
            },
          },
        })),

      toggleFlag: (questionId) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              ...state.answers[questionId],
              questionId,
              answer: state.answers[questionId]?.answer ?? '',
              flagged: !state.answers[questionId]?.flagged,
            },
          },
        })),

      goToQuestion: (index) => set({ currentQuestionIndex: index }),

      tick: () => {
        const { elapsedSecs, durationSecs, isRunning } = get()
        if (!isRunning) return
        if (elapsedSecs >= durationSecs) {
          set({ isRunning: false })
          return
        }
        set({ elapsedSecs: elapsedSecs + 1 })
      },

      submitExam: () => set({ isRunning: false, isSubmitted: true }),

      resetExam: () =>
        set({
          examRecordId: null,
          templateId: null,
          hskLevel: null,
          durationSecs: 0,
          elapsedSecs: 0,
          currentQuestionIndex: 0,
          answers: {},
          isRunning: false,
          isSubmitted: false,
        }),
    }),
    { name: 'hsk-exam' }
  )
)
