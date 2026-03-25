'use client'

import { useEffect, useState, useRef } from 'react'
import { Clock } from 'lucide-react'

interface ExamTimerProps {
  durationMins: number
  onExpire: () => void
}

export default function ExamTimer({ durationMins, onExpire }: ExamTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationMins * 60)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpireRef.current()
      return
    }

    const id = setTimeout(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)

    return () => clearTimeout(id)
  }, [secondsLeft])

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const mm = String(mins).padStart(2, '0')
  const ss = String(secs).padStart(2, '0')

  const isLow = secondsLeft < 5 * 60

  return (
    <div
      className={`flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1 rounded-full ${
        isLow
          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse'
          : 'bg-muted text-foreground'
      }`}
    >
      <Clock className="h-3.5 w-3.5" />
      {mm}:{ss}
    </div>
  )
}
