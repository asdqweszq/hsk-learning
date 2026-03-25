import { prisma } from '../../lib/prisma'
import { hsk1Words } from './hsk1-words'
import { hsk2Words } from './hsk2-words'
import { hsk3Words } from './hsk3-words'
import { hsk4Words } from './hsk4-words'
import { hsk5Words } from './hsk5-words'
import { hsk6Words } from './hsk6-words'
import { grammarPoints } from './grammar-points'
import { examTemplates } from './exam-templates'
import { questions } from './questions'

async function seedVocabulary() {
  const allWords = [
    ...hsk1Words,
    ...hsk2Words,
    ...hsk3Words,
    ...hsk4Words,
    ...hsk5Words,
    ...hsk6Words,
  ]

  console.log(`Seeding ${allWords.length} vocabulary words...`)

  let created = 0
  let updated = 0

  for (const word of allWords) {
    const result = await prisma.vocabularyWord.upsert({
      where: {
        hanzi_hskLevel: {
          hanzi: word.hanzi,
          hskLevel: word.hskLevel,
        },
      },
      update: {
        pinyin: word.pinyin,
        pinyinNormalized: word.pinyinNormalized,
        partOfSpeech: word.partOfSpeech,
        definitionEn: word.definitionEn,
        definitionZh: word.definitionZh ?? null,
        exampleSentence: word.exampleSentence ?? null,
        examplePinyin: word.examplePinyin ?? null,
        exampleTranslation: word.exampleTranslation ?? null,
        frequency: word.frequency,
      },
      create: {
        hanzi: word.hanzi,
        pinyin: word.pinyin,
        pinyinNormalized: word.pinyinNormalized,
        hskLevel: word.hskLevel,
        partOfSpeech: word.partOfSpeech,
        definitionEn: word.definitionEn,
        definitionZh: word.definitionZh ?? null,
        exampleSentence: word.exampleSentence ?? null,
        examplePinyin: word.examplePinyin ?? null,
        exampleTranslation: word.exampleTranslation ?? null,
        frequency: word.frequency,
      },
    })

    created++
  }

  console.log(`  ✓ Vocabulary: ${created} created, ${updated} updated`)
}

async function seedGrammarPoints() {
  console.log(`Seeding ${grammarPoints.length} grammar points...`)

  let count = 0

  for (const gp of grammarPoints) {
    const grammarPoint = await prisma.grammarPoint.create({
      data: {
        hskLevel: gp.hskLevel,
        title: gp.title,
        titleZh: gp.titleZh ?? null,
        pattern: gp.pattern,
        explanation: gp.explanation,
        difficulty: gp.difficulty,
        examples: {
          create: gp.examples.map((ex) => ({
            sentence: ex.sentence,
            pinyin: ex.pinyin,
            translation: ex.translation,
            notes: ex.notes ?? null,
            isExercise: ex.isExercise ?? false,
            blankPosition: ex.blankPosition ?? null,
            blankOptions: ex.blankOptions ?? null,
          })),
        },
      },
    })
    count++
  }

  console.log(`  ✓ Grammar points: ${count} created`)
}

async function seedExamTemplates() {
  console.log(`Seeding ${examTemplates.length} exam templates...`)

  let created = 0
  let updated = 0

  for (const template of examTemplates) {
    // ExamTemplate has no @@unique on name in schema but logically it should be unique
    // Use findFirst + upsert pattern with name as identifier
    const existing = await prisma.examTemplate.findFirst({
      where: { name: template.name },
    })

    if (existing) {
      await prisma.examTemplate.update({
        where: { id: existing.id },
        data: {
          hskLevel: template.hskLevel,
          description: template.description,
          durationMins: template.durationMins,
          totalScore: template.totalScore,
          passScore: template.passScore,
          structure: template.structure,
        },
      })
      updated++
    } else {
      await prisma.examTemplate.create({
        data: {
          hskLevel: template.hskLevel,
          name: template.name,
          description: template.description,
          durationMins: template.durationMins,
          totalScore: template.totalScore,
          passScore: template.passScore,
          structure: template.structure,
        },
      })
      created++
    }
  }

  console.log(`  ✓ Exam templates: ${created} created, ${updated} updated`)
}

async function seedQuestions() {
  console.log(`Seeding ${questions.length} practice questions...`)

  let count = 0

  for (const question of questions) {
    await prisma.question.create({
      data: {
        type: question.type,
        hskLevel: question.hskLevel,
        content: question.content,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation ?? null,
        difficulty: question.difficulty,
      },
    })
    count++
  }

  console.log(`  ✓ Questions: ${count} created`)
}

async function main() {
  console.log('🌱 Starting database seed...\n')

  try {
    await seedVocabulary()
    await seedGrammarPoints()
    await seedExamTemplates()
    await seedQuestions()

    console.log('\n✅ Database seeded successfully!')
  } catch (error) {
    console.error('\n❌ Seed failed:', error)
    throw error
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
