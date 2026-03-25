export interface ExamTemplateSeed {
  hskLevel: number
  name: string
  description: string
  durationMins: number
  totalScore: number
  passScore: number
  structure: string
}

export const examTemplates: ExamTemplateSeed[] = [
  {
    hskLevel: 1,
    name: 'HSK Level 1',
    description: 'The HSK (Level I) tests takers\' abilities in the application of everyday Chinese. It is the counterpart of the Level I of the Chinese Language Proficiency Scales for Speakers of Other Languages and the A1 Level of the Common European Framework of Reference (CEF). Those who are able to pass the HSK (Level I) can understand and use very simple Chinese phrases, meet basic needs for communication, and possess the ability to further their Chinese language studies.',
    durationMins: 40,
    totalScore: 100,
    passScore: 60,
    structure: JSON.stringify({
      listening: { parts: [{ name: 'Part 1', questionType: 'image_match', count: 5, description: 'Listen and identify the picture' }, { name: 'Part 2', questionType: 'true_false', count: 5, description: 'Listen and determine true or false' }, { name: 'Part 3', questionType: 'multiple_choice', count: 5, description: 'Listen to short dialogues and answer questions' }, { name: 'Part 4', questionType: 'image_match', count: 5, description: 'Listen and match to correct picture' }], totalCount: 20, score: 100 },
      reading: { parts: [{ name: 'Part 1', questionType: 'match_character', count: 5, description: 'Match characters to pictures' }, { name: 'Part 2', questionType: 'true_false', count: 5, description: 'Read and determine true or false' }, { name: 'Part 3', questionType: 'multiple_choice', count: 5, description: 'Read and choose the correct answer' }], totalCount: 15, score: 100 },
      writing: null
    })
  },
  {
    hskLevel: 2,
    name: 'HSK Level 2',
    description: 'The HSK (Level II) tests takers\' abilities in the application of everyday Chinese. It is the counterpart of the Level II of the Chinese Language Proficiency Scales for Speakers of Other Languages and the A2 Level of the Common European Framework of Reference (CEF). Those who are able to pass the HSK (Level II) can understand and use simple Chinese phrases, communicate in simple and direct exchanges on familiar topics, and describe in simple terms aspects of their background, immediate environment, and matters of immediate need.',
    durationMins: 55,
    totalScore: 100,
    passScore: 60,
    structure: JSON.stringify({
      listening: { parts: [{ name: 'Part 1', questionType: 'true_false', count: 10, description: 'Listen and determine true or false' }, { name: 'Part 2', questionType: 'multiple_choice', count: 10, description: 'Listen to short dialogues and choose the correct answer' }, { name: 'Part 3', questionType: 'multiple_choice', count: 10, description: 'Listen and answer questions' }], totalCount: 35, score: 100 },
      reading: { parts: [{ name: 'Part 1', questionType: 'fill_blank', count: 5, description: 'Choose the correct word to fill in the blank' }, { name: 'Part 2', questionType: 'sentence_order', count: 5, description: 'Order the sentences correctly' }, { name: 'Part 3', questionType: 'multiple_choice', count: 10, description: 'Read and choose the correct answer' }], totalCount: 25, score: 100 },
      writing: null
    })
  },
  {
    hskLevel: 3,
    name: 'HSK Level 3',
    description: 'The HSK (Level III) tests takers\' abilities in the application of everyday Chinese. It is the counterpart of the Level III of the Chinese Language Proficiency Scales for Speakers of Other Languages and the B1 Level of the Common European Framework of Reference (CEF). Those who are able to pass the HSK (Level III) can communicate in Chinese at a basic level in their daily, academic, and professional lives. They can manage most communications in Chinese when traveling in China.',
    durationMins: 90,
    totalScore: 300,
    passScore: 180,
    structure: JSON.stringify({
      listening: { parts: [{ name: 'Part 1', questionType: 'multiple_choice', count: 10, description: 'Listen to short conversations and choose the picture' }, { name: 'Part 2', questionType: 'multiple_choice', count: 10, description: 'Listen and choose the correct answer' }, { name: 'Part 3', questionType: 'multiple_choice', count: 10, description: 'Listen to longer dialogues and answer questions' }, { name: 'Part 4', questionType: 'multiple_choice', count: 10, description: 'Listen to short passages and answer questions' }], totalCount: 40, score: 100 },
      reading: { parts: [{ name: 'Part 1', questionType: 'true_false', count: 10, description: 'Read and determine true or false' }, { name: 'Part 2', questionType: 'fill_blank', count: 10, description: 'Choose the correct word to fill in the blank' }, { name: 'Part 3', questionType: 'multiple_choice', count: 10, description: 'Read passages and answer questions' }], totalCount: 30, score: 100 },
      writing: { parts: [{ name: 'Part 1', questionType: 'sentence_rearrange', count: 5, description: 'Rearrange the words into a correct sentence' }, { name: 'Part 2', questionType: 'fill_character', count: 5, description: 'Write the missing character according to the pinyin' }], totalCount: 10, score: 100 }
    })
  },
  {
    hskLevel: 4,
    name: 'HSK Level 4',
    description: 'The HSK (Level IV) tests takers\' ability to communicate in Chinese on a wide range of topics. It is the counterpart of the Level IV of the Chinese Language Proficiency Scales for Speakers of Other Languages and the B2 Level of the Common European Framework of Reference (CEF). Those who are able to pass the HSK (Level IV) can converse in Chinese on a wide range of topics and are able to communicate fluently with native Chinese speakers.',
    durationMins: 105,
    totalScore: 300,
    passScore: 180,
    structure: JSON.stringify({
      listening: { parts: [{ name: 'Part 1', questionType: 'multiple_choice', count: 10, description: 'Listen to short conversations and answer questions' }, { name: 'Part 2', questionType: 'multiple_choice', count: 15, description: 'Listen to longer conversations and answer questions' }, { name: 'Part 3', questionType: 'multiple_choice', count: 20, description: 'Listen to longer passages and answer multiple questions' }], totalCount: 45, score: 100 },
      reading: { parts: [{ name: 'Part 1', questionType: 'fill_blank', count: 10, description: 'Choose the correct word or phrase to fill in the blank' }, { name: 'Part 2', questionType: 'sentence_order', count: 10, description: 'Order sentences to form a coherent paragraph' }, { name: 'Part 3', questionType: 'multiple_choice', count: 20, description: 'Read passages and answer comprehension questions' }], totalCount: 40, score: 100 },
      writing: { parts: [{ name: 'Part 1', questionType: 'sentence_rearrange', count: 10, description: 'Rearrange words or phrases into correct sentences' }, { name: 'Part 2', questionType: 'short_essay', count: 1, description: 'Write a short essay (about 100 characters) based on a picture or prompt' }], totalCount: 11, score: 100 }
    })
  },
  {
    hskLevel: 5,
    name: 'HSK Level 5',
    description: 'The HSK (Level V) tests takers\' ability to use Chinese to deal with a broad range of subjects. It is the counterpart of the Level V of the Chinese Language Proficiency Scales for Speakers of Other Languages and the C1 Level of the Common European Framework of Reference (CEF). Those who are able to pass the HSK (Level V) can read Chinese newspapers and magazines, enjoy Chinese films and plays, and give a full-length speech in Chinese.',
    durationMins: 125,
    totalScore: 300,
    passScore: 180,
    structure: JSON.stringify({
      listening: { parts: [{ name: 'Part 1', questionType: 'multiple_choice', count: 20, description: 'Listen to conversations and answer questions' }, { name: 'Part 2', questionType: 'multiple_choice', count: 25, description: 'Listen to longer passages and answer questions' }], totalCount: 45, score: 100 },
      reading: { parts: [{ name: 'Part 1', questionType: 'fill_blank', count: 15, description: 'Choose the best word or phrase to fill in the blank' }, { name: 'Part 2', questionType: 'multiple_choice', count: 10, description: 'Identify the correct explanation of the underlined word or phrase' }, { name: 'Part 3', questionType: 'multiple_choice', count: 20, description: 'Read passages and answer comprehension questions' }], totalCount: 45, score: 100 },
      writing: { parts: [{ name: 'Part 1', questionType: 'short_essay', count: 1, description: 'Write an essay (about 100 characters) based on provided key words' }, { name: 'Part 2', questionType: 'essay', count: 1, description: 'Write an essay (about 400 characters) about a given topic' }], totalCount: 2, score: 100 }
    })
  },
  {
    hskLevel: 6,
    name: 'HSK Level 6',
    description: 'The HSK (Level VI) tests takers\' ability to comprehend and express themselves fluently in Chinese. It is the counterpart of the Level V/VI of the Chinese Language Proficiency Scales for Speakers of Other Languages and the C2 Level of the Common European Framework of Reference (CEF). Those who are able to pass the HSK (Level VI) can easily comprehend written and spoken information in Chinese and can effectively express themselves in Chinese, both orally and on paper.',
    durationMins: 140,
    totalScore: 300,
    passScore: 180,
    structure: JSON.stringify({
      listening: { parts: [{ name: 'Part 1', questionType: 'multiple_choice', count: 15, description: 'Listen to short conversations and answer questions' }, { name: 'Part 2', questionType: 'multiple_choice', count: 15, description: 'Listen to longer interviews/discussions and answer questions' }, { name: 'Part 3', questionType: 'multiple_choice', count: 20, description: 'Listen to longer passages and answer questions' }], totalCount: 50, score: 100 },
      reading: { parts: [{ name: 'Part 1', questionType: 'error_identification', count: 10, description: 'Identify the sentence with a language error' }, { name: 'Part 2', questionType: 'fill_blank', count: 10, description: 'Choose the correct word to complete sentences' }, { name: 'Part 3', questionType: 'sentence_order', count: 10, description: 'Choose the correct sentence to fill in the paragraph' }, { name: 'Part 4', questionType: 'multiple_choice', count: 20, description: 'Read long passages and answer comprehension questions' }], totalCount: 50, score: 100 },
      writing: { parts: [{ name: 'Part 1', questionType: 'condensation', count: 1, description: 'Condense a 1000-character passage into about 400 characters' }], totalCount: 1, score: 100 }
    })
  },
]
