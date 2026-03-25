export interface GrammarExampleSeed {
  sentence: string
  pinyin: string
  translation: string
  notes?: string
  isExercise?: boolean
  blankPosition?: number
  blankOptions?: string
}

export interface GrammarSeed {
  hskLevel: number
  title: string
  titleZh?: string
  pattern: string
  explanation: string
  difficulty: number
  examples: GrammarExampleSeed[]
}

export const grammarPoints: GrammarSeed[] = [
  // HSK 1 Grammar Points
  {
    hskLevel: 1,
    title: 'Subject-Verb-Object (SVO) Sentence',
    titleZh: '主谓宾句',
    pattern: 'Subject + Verb + Object',
    explanation: 'Chinese basic sentence structure follows Subject-Verb-Object order, similar to English. The subject does the action, the verb describes the action, and the object receives the action.',
    difficulty: 1,
    examples: [
      { sentence: '我喝茶。', pinyin: 'Wǒ hē chá.', translation: 'I drink tea.' },
      { sentence: '他吃饭。', pinyin: 'Tā chīfàn.', translation: 'He eats rice/food.' },
      { sentence: '她看书。', pinyin: 'Tā kàn shū.', translation: 'She reads books.' },
      {
        sentence: '我____水。',
        pinyin: 'Wǒ ____ shuǐ.',
        translation: 'I ____ water.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["喝","吃","买","看"]',
        notes: 'Choose the correct verb to complete the sentence.'
      }
    ]
  },
  {
    hskLevel: 1,
    title: 'Copula 是 (shì) - To Be',
    titleZh: '"是"字句',
    pattern: 'Subject + 是 + Noun/Pronoun',
    explanation: '是 (shì) means "to be" and is used to link a subject with a noun or noun phrase. Unlike English "to be", 是 is not used before adjectives in Chinese.',
    difficulty: 1,
    examples: [
      { sentence: '我是学生。', pinyin: 'Wǒ shì xuésheng.', translation: 'I am a student.' },
      { sentence: '他是老师。', pinyin: 'Tā shì lǎoshī.', translation: 'He is a teacher.' },
      { sentence: '这是我的书。', pinyin: 'Zhè shì wǒ de shū.', translation: 'This is my book.' },
      {
        sentence: '她____医生。',
        pinyin: 'Tā ____ yīshēng.',
        translation: 'She is a doctor.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["是","有","在","很"]',
        notes: 'Fill in the correct verb.'
      }
    ]
  },
  {
    hskLevel: 1,
    title: 'Negation with 不 (bù)',
    titleZh: '"不"字否定',
    pattern: 'Subject + 不 + Verb/Adjective',
    explanation: '不 (bù) is the main negation word in Chinese, placed directly before verbs and adjectives. Note: 不 changes tone to bú when followed by a 4th tone syllable.',
    difficulty: 1,
    examples: [
      { sentence: '我不是学生。', pinyin: 'Wǒ bù shì xuésheng.', translation: 'I am not a student.' },
      { sentence: '他不喝茶。', pinyin: 'Tā bù hē chá.', translation: 'He doesn\'t drink tea.' },
      { sentence: '天气不好。', pinyin: 'Tiānqì bù hǎo.', translation: 'The weather is not good.' },
      {
        sentence: '我____去学校。',
        pinyin: 'Wǒ ____ qù xuéxiào.',
        translation: 'I am not going to school.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["不","没","别","非"]',
        notes: 'Use the correct negation word for present/future situations.'
      }
    ]
  },
  {
    hskLevel: 1,
    title: 'Question Particle 吗 (ma)',
    titleZh: '"吗"字疑问句',
    pattern: 'Statement + 吗？',
    explanation: 'Adding 吗 (ma) at the end of a statement turns it into a yes/no question. This is the simplest way to ask a question in Chinese.',
    difficulty: 1,
    examples: [
      { sentence: '你是学生吗？', pinyin: 'Nǐ shì xuésheng ma?', translation: 'Are you a student?' },
      { sentence: '他喜欢喝茶吗？', pinyin: 'Tā xǐhuān hē chá ma?', translation: 'Does he like to drink tea?' },
      { sentence: '你好吗？', pinyin: 'Nǐ hǎo ma?', translation: 'How are you? (Are you well?)' },
      {
        sentence: '她是老师____？',
        pinyin: 'Tā shì lǎoshī ____?',
        translation: 'Is she a teacher?',
        isExercise: true,
        blankPosition: 3,
        blankOptions: '["吗","呢","吧","啊"]',
        notes: 'Add the correct question particle.'
      }
    ]
  },
  {
    hskLevel: 1,
    title: 'Possessive Particle 的 (de)',
    titleZh: '"的"字结构',
    pattern: 'Possessor + 的 + Possessed',
    explanation: '的 (de) functions like the possessive apostrophe-s in English ("\'s"). It connects a possessor to what is possessed.',
    difficulty: 1,
    examples: [
      { sentence: '我的书', pinyin: 'wǒ de shū', translation: 'my book' },
      { sentence: '他的朋友', pinyin: 'tā de péngyou', translation: 'his friend' },
      { sentence: '老师的学生', pinyin: 'lǎoshī de xuésheng', translation: 'the teacher\'s student' },
      {
        sentence: '这是我____书包。',
        pinyin: 'Zhè shì wǒ ____ shūbāo.',
        translation: 'This is my schoolbag.',
        isExercise: true,
        blankPosition: 2,
        blankOptions: '["的","在","是","有"]',
        notes: 'Use the possessive particle to complete the phrase.'
      }
    ]
  },
  {
    hskLevel: 1,
    title: 'Existence Verb 有 (yǒu)',
    titleZh: '"有"字句',
    pattern: 'Subject + 有 + Object',
    explanation: '有 (yǒu) means "to have" or "there is/are". It is negated with 没 (méi), NOT with 不 (bù). 没有 means "do not have / there is not".',
    difficulty: 1,
    examples: [
      { sentence: '我有一本书。', pinyin: 'Wǒ yǒu yī běn shū.', translation: 'I have a book.' },
      { sentence: '我没有钱。', pinyin: 'Wǒ méiyǒu qián.', translation: 'I don\'t have money.' },
      { sentence: '这里有很多人。', pinyin: 'Zhèlǐ yǒu hěn duō rén.', translation: 'There are many people here.' },
      {
        sentence: '他____一个哥哥。',
        pinyin: 'Tā ____ yī gè gēge.',
        translation: 'He has an elder brother.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["有","是","在","做"]',
        notes: 'Use the correct verb to express having/possession.'
      }
    ]
  },
  {
    hskLevel: 1,
    title: 'Location with 在 (zài)',
    titleZh: '"在"字句',
    pattern: 'Subject + 在 + Place',
    explanation: '在 (zài) indicates location, meaning "at", "in", or "to be at a place". It is different from 是 which connects nouns.',
    difficulty: 1,
    examples: [
      { sentence: '我在学校。', pinyin: 'Wǒ zài xuéxiào.', translation: 'I am at school.' },
      { sentence: '书在桌子上。', pinyin: 'Shū zài zhuōzi shàng.', translation: 'The book is on the table.' },
      { sentence: '他在北京。', pinyin: 'Tā zài Běijīng.', translation: 'He is in Beijing.' },
      {
        sentence: '她____图书馆学习。',
        pinyin: 'Tā ____ túshūguǎn xuéxí.',
        translation: 'She studies at the library.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["在","是","有","去"]',
        notes: 'Choose the correct location word.'
      }
    ]
  },
  {
    hskLevel: 1,
    title: 'Measure Words (量词)',
    titleZh: '量词',
    pattern: 'Number + Measure Word + Noun',
    explanation: 'Chinese requires a measure word (classifier) between a number and a noun. Different nouns use different measure words. 个 (gè) is the most common general measure word.',
    difficulty: 2,
    examples: [
      { sentence: '一个学生', pinyin: 'yī gè xuésheng', translation: 'one student', notes: '个 for people and general objects' },
      { sentence: '一本书', pinyin: 'yī běn shū', translation: 'one book', notes: '本 for books and bound items' },
      { sentence: '两杯水', pinyin: 'liǎng bēi shuǐ', translation: 'two glasses of water', notes: '杯 for cups/glasses of liquid' },
      {
        sentence: '三____苹果',
        pinyin: 'sān ____ píngguǒ',
        translation: 'three apples',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["个","本","杯","张"]',
        notes: 'Choose the correct measure word for fruit.'
      }
    ]
  },
  // HSK 2 Grammar Points
  {
    hskLevel: 2,
    title: 'Past Tense with 了 (le)',
    titleZh: '"了"字句——完成',
    pattern: 'Verb + 了 (+ Object)',
    explanation: '了 (le) placed after a verb indicates completion of an action. It does not strictly indicate past tense but rather that an action has been completed.',
    difficulty: 2,
    examples: [
      { sentence: '我吃了早饭。', pinyin: 'Wǒ chī le zǎofàn.', translation: 'I ate breakfast.' },
      { sentence: '他买了一本书。', pinyin: 'Tā mǎi le yī běn shū.', translation: 'He bought a book.' },
      { sentence: '他们走了。', pinyin: 'Tāmen zǒu le.', translation: 'They left.' },
      {
        sentence: '她学____中文。',
        pinyin: 'Tā xué ____ zhōngwén.',
        translation: 'She learned/studied Chinese.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["了","过","着","呢"]',
        notes: 'Add the completion particle.'
      }
    ]
  },
  {
    hskLevel: 2,
    title: 'Comparative with 比 (bǐ)',
    titleZh: '"比"字比较句',
    pattern: 'A + 比 + B + Adjective',
    explanation: 'Use 比 (bǐ) to make comparisons: "A is more [adjective] than B". The adjective comes after the comparison, not before B as in English.',
    difficulty: 2,
    examples: [
      { sentence: '他比我高。', pinyin: 'Tā bǐ wǒ gāo.', translation: 'He is taller than me.' },
      { sentence: '今天比昨天冷。', pinyin: 'Jīntiān bǐ zuótiān lěng.', translation: 'Today is colder than yesterday.' },
      { sentence: '北京比上海大。', pinyin: 'Běijīng bǐ Shànghǎi dà.', translation: 'Beijing is bigger than Shanghai.' },
      {
        sentence: '她____他年轻。',
        pinyin: 'Tā ____ tā niánqīng.',
        translation: 'She is younger than him.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["比","和","跟","是"]',
        notes: 'Use the comparative word.'
      }
    ]
  },
  {
    hskLevel: 2,
    title: 'Progressive Aspect 在/正在 (zài/zhèngzài)',
    titleZh: '进行时——正在',
    pattern: '(正)在 + Verb (+ 呢)',
    explanation: 'Use 在 or 正在 before a verb to indicate an ongoing action (equivalent to English "-ing"). 呢 can be added at the end for emphasis.',
    difficulty: 2,
    examples: [
      { sentence: '我在吃饭。', pinyin: 'Wǒ zài chīfàn.', translation: 'I am eating.' },
      { sentence: '他正在看电视。', pinyin: 'Tā zhèngzài kàn diànshì.', translation: 'He is watching TV.' },
      { sentence: '她们正在学习呢。', pinyin: 'Tāmen zhèngzài xuéxí ne.', translation: 'They are studying.' },
      {
        sentence: '我们____开会呢。',
        pinyin: 'Wǒmen ____ kāihuì ne.',
        translation: 'We are in a meeting.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["正在","已经","刚才","准备"]',
        notes: 'Choose the word that indicates an ongoing action.'
      }
    ]
  },
  {
    hskLevel: 2,
    title: 'Conjunction 但是/可是 (But)',
    titleZh: '转折连词——但是',
    pattern: '...但是/可是...',
    explanation: '但是 (dànshì) and 可是 (kěshì) both mean "but" or "however". They indicate a contrast or contradiction between two clauses.',
    difficulty: 2,
    examples: [
      { sentence: '我想去，但是没时间。', pinyin: 'Wǒ xiǎng qù, dànshì méi shíjiān.', translation: 'I want to go, but I don\'t have time.' },
      { sentence: '他很聪明，但是不努力。', pinyin: 'Tā hěn cōngming, dànshì bù nǔlì.', translation: 'He is smart, but doesn\'t work hard.' },
      { sentence: '天气很冷，可是他不穿外套。', pinyin: 'Tiānqì hěn lěng, kěshì tā bù chuān wàitào.', translation: 'The weather is cold, but he doesn\'t wear a coat.' },
      {
        sentence: '我喜欢他，____他不喜欢我。',
        pinyin: 'Wǒ xǐhuān tā, ____ tā bù xǐhuān wǒ.',
        translation: 'I like him, but he doesn\'t like me.',
        isExercise: true,
        blankPosition: 2,
        blankOptions: '["但是","因为","所以","如果"]',
        notes: 'Choose the contrasting conjunction.'
      }
    ]
  },
  {
    hskLevel: 2,
    title: 'Experiential Aspect 过 (guò)',
    titleZh: '经历体——过',
    pattern: 'Verb + 过',
    explanation: '过 (guò) placed after a verb indicates that an experience has occurred at some point in the past. It translates as "have ever done something".',
    difficulty: 2,
    examples: [
      { sentence: '我去过北京。', pinyin: 'Wǒ qùguò Běijīng.', translation: 'I have been to Beijing.' },
      { sentence: '他学过钢琴。', pinyin: 'Tā xuéguò gāngqín.', translation: 'He has learned piano (before).' },
      { sentence: '你吃过北京烤鸭吗？', pinyin: 'Nǐ chīguò Běijīng kǎoyā ma?', translation: 'Have you ever eaten Peking Duck?' },
      {
        sentence: '她____中国。',
        pinyin: 'Tā ____ Zhōngguó.',
        translation: 'She has been to China.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["去过","去了","去着","去的"]',
        notes: 'Use the experiential form of the verb.'
      }
    ]
  },
  // HSK 3 Grammar Points
  {
    hskLevel: 3,
    title: 'Disposal Sentence with 把 (bǎ)',
    titleZh: '"把"字句',
    pattern: 'Subject + 把 + Object + Verb + Complement',
    explanation: 'The 把 sentence moves the object before the verb to emphasize what happens to it. The verb must be followed by a result, direction, or other complement. Used when the action is deliberate and affects the object.',
    difficulty: 3,
    examples: [
      { sentence: '请把书放在桌子上。', pinyin: 'Qǐng bǎ shū fàng zài zhuōzi shàng.', translation: 'Please put the book on the table.' },
      { sentence: '我把作业做完了。', pinyin: 'Wǒ bǎ zuòyè zuò wán le.', translation: 'I finished the homework.' },
      { sentence: '他把钱都花了。', pinyin: 'Tā bǎ qián dōu huā le.', translation: 'He spent all the money.' },
      {
        sentence: '请____窗户关上。',
        pinyin: 'Qǐng ____ chuānghù guān shàng.',
        translation: 'Please close the window.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["把","让","被","给"]',
        notes: 'Use 把 to indicate disposal of the object.'
      }
    ]
  },
  {
    hskLevel: 3,
    title: 'Passive Voice with 被 (bèi)',
    titleZh: '"被"字句',
    pattern: 'Subject (receiver) + 被 + Agent + Verb + Complement',
    explanation: '被 (bèi) indicates passive voice, like "by" in English passive constructions. The subject receives the action rather than performs it. Often carries a negative connotation in Chinese.',
    difficulty: 3,
    examples: [
      { sentence: '我的书被他拿走了。', pinyin: 'Wǒ de shū bèi tā ná zǒu le.', translation: 'My book was taken away by him.' },
      { sentence: '窗户被风打开了。', pinyin: 'Chuānghù bèi fēng dǎkāi le.', translation: 'The window was opened by the wind.' },
      { sentence: '他被老师批评了。', pinyin: 'Tā bèi lǎoshī pīpíng le.', translation: 'He was criticized by the teacher.' },
      {
        sentence: '这个消息____大家知道了。',
        pinyin: 'Zhège xiāoxi ____ dàjiā zhīdào le.',
        translation: 'This news was known by everyone.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["被","把","让","由"]',
        notes: 'Use the passive marker.'
      }
    ]
  },
  {
    hskLevel: 3,
    title: 'Result Complements (结果补语)',
    titleZh: '结果补语',
    pattern: 'Verb + Result Complement',
    explanation: 'Result complements follow the main verb and indicate the result of the action. Common result complements: 完 (finished), 好 (done well), 见 (perceived), 到 (reached), 懂 (understood).',
    difficulty: 3,
    examples: [
      { sentence: '我写完作业了。', pinyin: 'Wǒ xiě wán zuòyè le.', translation: 'I finished writing my homework.' },
      { sentence: '他听懂了老师说的话。', pinyin: 'Tā tīng dǒng le lǎoshī shuō de huà.', translation: 'He understood what the teacher said.' },
      { sentence: '你买到票了吗？', pinyin: 'Nǐ mǎi dào piào le ma?', translation: 'Did you manage to buy the ticket?' },
      {
        sentence: '我看____这本书了。',
        pinyin: 'Wǒ kàn ____ zhè běn shū le.',
        translation: 'I finished reading this book.',
        isExercise: true,
        blankPosition: 1,
        blankOptions: '["完","好","到","懂"]',
        notes: 'Choose the result complement meaning "finished".'
      }
    ]
  },
  {
    hskLevel: 3,
    title: 'Correlative Conjunctions: 虽然…但是 (Although…But)',
    titleZh: '虽然……但是……',
    pattern: '虽然 + Clause 1 + 但是/可是 + Clause 2',
    explanation: '虽然 (suīrán) means "although" and is paired with 但是 (dànshì) or 可是 (kěshì) meaning "but". Together they mean "although...nevertheless..."',
    difficulty: 3,
    examples: [
      { sentence: '虽然很难，但是我会努力。', pinyin: 'Suīrán hěn nán, dànshì wǒ huì nǔlì.', translation: 'Although it\'s difficult, I will work hard.' },
      { sentence: '虽然天气冷，他还是出去了。', pinyin: 'Suīrán tiānqì lěng, tā háishì chūqù le.', translation: 'Although the weather is cold, he went out anyway.' },
      { sentence: '虽然他年纪小，但是很聪明。', pinyin: 'Suīrán tā niánjì xiǎo, dànshì hěn cōngming.', translation: 'Although he is young, he is very smart.' },
      {
        sentence: '____下雨，我们还是去了。',
        pinyin: '____ xià yǔ, wǒmen háishì qù le.',
        translation: 'Although it was raining, we still went.',
        isExercise: true,
        blankPosition: 0,
        blankOptions: '["虽然","因为","如果","除非"]',
        notes: 'Choose the concessive conjunction.'
      }
    ]
  },
  {
    hskLevel: 3,
    title: 'Degree Complement with 得 (de)',
    titleZh: '程度补语——得',
    pattern: 'Verb + 得 + Degree Complement',
    explanation: '得 (de) connects a verb or adjective to a complement that describes the degree or manner of the action. It allows you to say how well or how poorly something is done.',
    difficulty: 3,
    examples: [
      { sentence: '他说得很好。', pinyin: 'Tā shuō de hěn hǎo.', translation: 'He speaks very well.' },
      { sentence: '她跑得很快。', pinyin: 'Tā pǎo de hěn kuài.', translation: 'She runs very fast.' },
      { sentence: '他唱歌唱得很好听。', pinyin: 'Tā chàng gē chàng de hěn hǎotīng.', translation: 'He sings very beautifully.' },
      {
        sentence: '他学习学____非常努力。',
        pinyin: 'Tā xuéxí xué ____ fēicháng nǔlì.',
        translation: 'He studies extremely hard.',
        isExercise: true,
        blankPosition: 2,
        blankOptions: '["得","地","的","了"]',
        notes: 'Use the degree complement particle.'
      }
    ]
  },
]
