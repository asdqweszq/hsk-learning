import { getToneNumber, TONE_COLORS, cn } from '@/lib/utils'

interface PinyinDisplayProps {
  pinyin: string
  className?: string
  syllableClassName?: string
}

/**
 * Splits a full pinyin string into individual syllables.
 * Handles multi-character pinyin like "nǐ hǎo" or "zhōngguó".
 */
function splitPinyinSyllables(pinyin: string): string[] {
  return pinyin.trim().split(/\s+/).filter(Boolean)
}

export default function PinyinDisplay({
  pinyin,
  className,
  syllableClassName,
}: PinyinDisplayProps) {
  const syllables = splitPinyinSyllables(pinyin)

  return (
    <span className={cn('inline-flex flex-wrap gap-0.5', className)}>
      {syllables.map((syllable, index) => {
        const tone = getToneNumber(syllable)
        const colorClass = TONE_COLORS[tone]
        return (
          <span key={index} className={cn(colorClass, syllableClassName)}>
            {syllable}
          </span>
        )
      })}
    </span>
  )
}
