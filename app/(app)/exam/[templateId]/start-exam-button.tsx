'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface StartExamButtonProps {
  templateId: string
}

export default function StartExamButton({ templateId }: StartExamButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    setLoading(true)
    try {
      const res = await fetch('/api/exam/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId }),
      })
      const data = await res.json()
      if (data.examRecordId) {
        // Cache questions and duration in sessionStorage for the session page
        sessionStorage.setItem(
          `exam_${data.examRecordId}`,
          JSON.stringify({
            questions: data.questions,
            durationMins: data.durationMins ?? 90,
          })
        )
        router.push(
          `/exam/${templateId}/session?examRecordId=${data.examRecordId}`
        )
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleStart} disabled={loading} className="flex-1">
      {loading ? 'Preparing exam...' : '开始考试 — Start Exam'}
    </Button>
  )
}
