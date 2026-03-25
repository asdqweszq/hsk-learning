'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

interface StrokeOrderCanvasProps {
  character: string
  quizMode?: boolean
}

declare global {
  interface Window {
    HanziWriter: any
  }
}

export default function StrokeOrderCanvas({
  character,
  quizMode = false,
}: StrokeOrderCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<any>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quizActive, setQuizActive] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function init() {
      setError(null)
      setLoaded(false)

      // Dynamically import hanzi-writer
      try {
        const HanziWriter = (await import('hanzi-writer')).default

        if (cancelled || !containerRef.current) return

        // Clear previous writer
        if (writerRef.current) {
          try { writerRef.current.target?.remove() } catch {}
        }
        containerRef.current.innerHTML = ''

        const writer = HanziWriter.create(containerRef.current, character, {
          width: 200,
          height: 200,
          padding: 20,
          showOutline: true,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 300,
        })

        writerRef.current = writer
        setLoaded(true)

        if (!quizMode) {
          writer.animateCharacter()
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load hanzi-writer. Make sure it is installed.')
        }
      }
    }

    init()
    return () => { cancelled = true }
  }, [character])

  function handleAnimate() {
    if (writerRef.current) {
      writerRef.current.animateCharacter()
    }
  }

  function handleStartQuiz() {
    if (!writerRef.current) return
    setQuizActive(true)
    writerRef.current.quiz({
      onComplete: () => {
        setQuizActive(false)
      },
    })
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-4xl">{character}</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <div
          ref={containerRef}
          className="border rounded-lg bg-white dark:bg-zinc-900"
          style={{ width: 200, height: 200 }}
        />
      </div>

      {loaded && (
        <div className="flex gap-2 justify-center flex-wrap">
          <Button size="sm" variant="outline" onClick={handleAnimate}>
            Animate
          </Button>
          {quizMode && !quizActive && (
            <Button size="sm" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          )}
          {quizActive && (
            <p className="text-sm text-muted-foreground">Draw the strokes in order...</p>
          )}
        </div>
      )}
    </div>
  )
}
