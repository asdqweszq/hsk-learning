interface GrammarExampleProps {
  sentence: string
  pinyin: string
  translation: string
  notes?: string
}

export default function GrammarExample({
  sentence,
  pinyin,
  translation,
  notes,
}: GrammarExampleProps) {
  return (
    <div className="border-l-2 border-primary/30 pl-4 space-y-1">
      <p className="text-base font-medium">{sentence}</p>
      <p className="text-sm text-muted-foreground">{pinyin}</p>
      <p className="text-sm italic text-muted-foreground">{translation}</p>
      {notes && (
        <p className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 mt-1">
          {notes}
        </p>
      )}
    </div>
  )
}
