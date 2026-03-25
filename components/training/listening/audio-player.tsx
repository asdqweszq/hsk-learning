'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface AudioPlayerProps {
  text: string
  speed?: number
}

type Speed = 0.75 | 1 | 1.25

export default function AudioPlayer({ text, speed: initialSpeed = 1 }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState<Speed>((initialSpeed as Speed) || 1)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback(
    (txt: string, rate: Speed) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return

      // Cancel any existing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(txt)
      utterance.lang = 'zh-CN'
      utterance.rate = rate

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    },
    []
  )

  function handlePlayPause() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
        setIsPlaying(true)
      } else {
        speak(text, speed)
      }
    }
  }

  function handleReplay() {
    speak(text, speed)
  }

  function handleSpeedChange(val: string) {
    const newSpeed = parseFloat(val) as Speed
    setSpeed(newSpeed)
    if (isPlaying) {
      speak(text, newSpeed)
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
      <Button
        size="icon"
        variant="default"
        onClick={handlePlayPause}
        className="h-10 w-10 shrink-0"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      <div className="flex-1">
        <div
          className={`h-1.5 rounded-full bg-primary/20 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
        />
      </div>

      <Select value={String(speed)} onValueChange={handleSpeedChange}>
        <SelectTrigger className="w-20 h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.75">0.75×</SelectItem>
          <SelectItem value="1">1×</SelectItem>
          <SelectItem value="1.25">1.25×</SelectItem>
        </SelectContent>
      </Select>

      <Button
        size="icon"
        variant="ghost"
        onClick={handleReplay}
        className="h-8 w-8 shrink-0"
        title="Replay"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
