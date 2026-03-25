export interface QuestionSeed {
  type: string
  hskLevel: number
  content: string
  correctAnswer: string
  explanation?: string
  difficulty: number
}

export const questions: QuestionSeed[] = [
  // HSK 1 - Listening Dialogue
  {
    type: 'listening_dialogue',
    hskLevel: 1,
    content: JSON.stringify({
      audioScript: '男：你好！你叫什么名字？\n女：你好！我叫李明。',
      question: '女的叫什么名字？',
      options: ['李明', '王明', '张明', '陈明'],
      context: 'A man and woman greet each other.'
    }),
    correctAnswer: '李明',
    explanation: 'The woman says "我叫李明" (My name is Li Ming).',
    difficulty: 1
  },
  {
    type: 'listening_dialogue',
    hskLevel: 1,
    content: JSON.stringify({
      audioScript: '男：现在几点了？\n女：现在三点半。',
      question: '现在几点？',
      options: ['两点', '三点', '三点半', '四点'],
      context: 'A man asks what time it is.'
    }),
    correctAnswer: '三点半',
    explanation: 'The woman says "现在三点半" (It is now 3:30).',
    difficulty: 1
  },
  {
    type: 'listening_dialogue',
    hskLevel: 1,
    content: JSON.stringify({
      audioScript: '女：你是哪国人？\n男：我是中国人。',
      question: '男的是哪国人？',
      options: ['日本人', '美国人', '中国人', '英国人'],
      context: 'A woman asks a man about his nationality.'
    }),
    correctAnswer: '中国人',
    explanation: 'The man says "我是中国人" (I am Chinese).',
    difficulty: 1
  },
  {
    type: 'listening_dialogue',
    hskLevel: 1,
    content: JSON.stringify({
      audioScript: '男：你喜欢喝什么？\n女：我喜欢喝茶，不喜欢喝咖啡。',
      question: '女的喜欢喝什么？',
      options: ['咖啡', '茶', '水', '牛奶'],
      context: 'A man asks a woman about her drink preferences.'
    }),
    correctAnswer: '茶',
    explanation: 'The woman says "我喜欢喝茶" (I like to drink tea).',
    difficulty: 1
  },
  {
    type: 'listening_dialogue',
    hskLevel: 1,
    content: JSON.stringify({
      audioScript: '女：你家有几口人？\n男：我家有四口人——爸爸、妈妈、妹妹和我。',
      question: '他家有几口人？',
      options: ['三口人', '四口人', '五口人', '六口人'],
      context: 'A woman asks a man about his family.'
    }),
    correctAnswer: '四口人',
    explanation: 'The man says "我家有四口人" (My family has four people).',
    difficulty: 1
  },
  // HSK 1 - Reading Fill
  {
    type: 'reading_fill',
    hskLevel: 1,
    content: JSON.stringify({
      sentence: '我 ____ 学生，他也是学生。',
      options: ['是', '有', '在', '喝'],
      hint: 'Use the copula verb.'
    }),
    correctAnswer: '是',
    explanation: '是 (shì) means "to be" and connects the subject with a noun predicate.',
    difficulty: 1
  },
  {
    type: 'reading_fill',
    hskLevel: 1,
    content: JSON.stringify({
      sentence: '这本书 ____ 贵，我买不起。',
      options: ['太', '很', '非常', '十分'],
      hint: 'Which adverb means "too" (excessively)?'
    }),
    correctAnswer: '太',
    explanation: '太 (tài) means "too" or "excessively". Note: 太…了 is the standard pattern.',
    difficulty: 1
  },
  {
    type: 'reading_fill',
    hskLevel: 1,
    content: JSON.stringify({
      sentence: '他 ____ 北京工作。',
      options: ['在', '是', '有', '去'],
      hint: 'Which word indicates location?'
    }),
    correctAnswer: '在',
    explanation: '在 (zài) indicates location, meaning "at/in" a place.',
    difficulty: 1
  },
  {
    type: 'reading_fill',
    hskLevel: 1,
    content: JSON.stringify({
      sentence: '我 ____ 有三个朋友。',
      options: ['只', '太', '最', '很'],
      hint: 'Which word means "only"?'
    }),
    correctAnswer: '只',
    explanation: '只 (zhǐ) means "only" and restricts the quantity.',
    difficulty: 2
  },
  // HSK 2 - Listening Dialogue
  {
    type: 'listening_dialogue',
    hskLevel: 2,
    content: JSON.stringify({
      audioScript: '女：你昨天去哪儿了？\n男：我昨天去图书馆借书了。\n女：你借了几本？\n男：我借了两本小说。',
      question: '男的昨天去哪儿了？',
      options: ['书店', '超市', '图书馆', '学校'],
      context: 'A woman asks a man where he went yesterday.'
    }),
    correctAnswer: '图书馆',
    explanation: 'The man says "我昨天去图书馆借书了" (I went to the library to borrow books yesterday).',
    difficulty: 2
  },
  {
    type: 'listening_dialogue',
    hskLevel: 2,
    content: JSON.stringify({
      audioScript: '男：你平时怎么上班？\n女：我一般坐地铁，但是今天地铁坏了，所以我坐公共汽车来的。',
      question: '女的今天怎么来的？',
      options: ['开车', '地铁', '公共汽车', '走路'],
      context: 'A man asks a woman how she commutes.'
    }),
    correctAnswer: '公共汽车',
    explanation: 'She says the subway was broken today so she took a bus (公共汽车).',
    difficulty: 2
  },
  {
    type: 'listening_dialogue',
    hskLevel: 2,
    content: JSON.stringify({
      audioScript: '女：你周末有空吗？我想去看电影。\n男：周六我要去参加朋友的生日聚会，周日可以。',
      question: '男的周六要做什么？',
      options: ['看电影', '参加生日聚会', '去购物', '在家休息'],
      context: 'A woman asks a man about his weekend plans.'
    }),
    correctAnswer: '参加生日聚会',
    explanation: 'The man says "周六我要去参加朋友的生日聚会" (Saturday I need to attend a friend\'s birthday party).',
    difficulty: 2
  },
  // HSK 2 - Reading Fill
  {
    type: 'reading_fill',
    hskLevel: 2,
    content: JSON.stringify({
      sentence: '他的汉语说得 ____ 好。',
      options: ['非常', '太', '最', '极'],
      hint: 'Which adverb naturally modifies an adjective?'
    }),
    correctAnswer: '非常',
    explanation: '非常 (fēicháng) means "very/extremely" and is commonly used with adjectives.',
    difficulty: 2
  },
  {
    type: 'reading_fill',
    hskLevel: 2,
    content: JSON.stringify({
      sentence: '虽然天气很冷，____ 他还是出去了。',
      options: ['但是', '因为', '所以', '如果'],
      hint: 'Which conjunction creates a contrast?'
    }),
    correctAnswer: '但是',
    explanation: '虽然…但是 is the "although…but" pattern showing contrast.',
    difficulty: 2
  },
  {
    type: 'reading_fill',
    hskLevel: 2,
    content: JSON.stringify({
      sentence: '她 ____ 比我高，也比我重。',
      options: ['不但', '虽然', '因为', '如果'],
      hint: 'Which conjunction means "not only...but also"?'
    }),
    correctAnswer: '不但',
    explanation: '不但…也/而且 means "not only...but also".',
    difficulty: 2
  },
  // HSK 2 - Reading Order
  {
    type: 'reading_order',
    hskLevel: 2,
    content: JSON.stringify({
      prompt: 'Arrange these phrases into a correct sentence:',
      parts: ['昨天', '了', '我', '一本书', '买'],
      hint: 'Remember the basic SVO order with 了 after the verb.'
    }),
    correctAnswer: '我昨天买了一本书。',
    explanation: 'Time words like 昨天 come before the verb. 了 follows the verb to indicate completion: 我 + 昨天 + 买 + 了 + 一本书.',
    difficulty: 2
  },
  {
    type: 'reading_order',
    hskLevel: 2,
    content: JSON.stringify({
      prompt: 'Arrange these phrases into a correct sentence:',
      parts: ['喜欢', '他', '电影', '看', '不'],
      hint: 'The negation 不 goes before the verb.'
    }),
    correctAnswer: '他不喜欢看电影。',
    explanation: '他 (subject) + 不 (negation) + 喜欢 (verb) + 看电影 (verb phrase object).',
    difficulty: 2
  },
  // HSK 3 - Reading Comprehension
  {
    type: 'reading_comprehension',
    hskLevel: 3,
    content: JSON.stringify({
      passage: '小明今年二十岁，是大学一年级的学生。他的学校在北京，离家很远。他每个月回家一次，每次都要坐三个多小时的火车。他很想家，但是他知道学习更重要。他的父母也很支持他，经常给他打电话，鼓励他努力学习。',
      question: '小明多长时间回一次家？',
      options: ['每天', '每周', '每个月', '每年'],
      context: 'A passage about a college student.'
    }),
    correctAnswer: '每个月',
    explanation: 'The passage states "他每个月回家一次" (He goes home once a month).',
    difficulty: 3
  },
  {
    type: 'reading_comprehension',
    hskLevel: 3,
    content: JSON.stringify({
      passage: '小明今年二十岁，是大学一年级的学生。他的学校在北京，离家很远。他每个月回家一次，每次都要坐三个多小时的火车。他很想家，但是他知道学习更重要。他的父母也很支持他，经常给他打电话，鼓励他努力学习。',
      question: '小明回家需要多长时间？',
      options: ['一个小时', '两个小时', '三个多小时', '四个小时'],
      context: 'A passage about a college student.'
    }),
    correctAnswer: '三个多小时',
    explanation: 'The passage states "每次都要坐三个多小时的火车" (Each time it takes more than 3 hours by train).',
    difficulty: 3
  },
  {
    type: 'reading_comprehension',
    hskLevel: 3,
    content: JSON.stringify({
      passage: '张华在一家大公司做翻译工作。他每天上午九点上班，下午六点下班。他的工作很忙，有时候还需要加班。虽然工作很辛苦，但是他觉得很有意思，因为他可以接触到很多来自不同国家的人。',
      question: '张华的工作是什么？',
      options: ['医生', '老师', '翻译', '工程师'],
      context: 'A passage about Zhang Hua\'s work.'
    }),
    correctAnswer: '翻译',
    explanation: 'The passage says "在一家大公司做翻译工作" (works as a translator at a big company).',
    difficulty: 3
  },
  // HSK 4 - Listening Dialogue
  {
    type: 'listening_dialogue',
    hskLevel: 4,
    content: JSON.stringify({
      audioScript: '男：最近工作怎么样？\n女：还好，就是有点儿压力。公司正在开发一个新项目，我负责其中一个模块，要在下个月底之前完成。\n男：那还有多长时间？\n女：还有三周，时间不太够，但我会努力的。',
      question: '女的工作有什么问题？',
      options: ['工资太低', '同事关系不好', '工作压力大', '上班时间太长'],
      context: 'Two colleagues discuss work.'
    }),
    correctAnswer: '工作压力大',
    explanation: 'She says "有点儿压力" (a bit of pressure/stress) and has a tight deadline.',
    difficulty: 4
  },
  {
    type: 'listening_dialogue',
    hskLevel: 4,
    content: JSON.stringify({
      audioScript: '女：你最近看起来很疲惫，怎么了？\n男：最近睡眠不好，总是睡不着。\n女：是工作压力太大了吗？\n男：也有这方面的原因，但主要是因为我最近搬家了，新家附近有个夜市，很吵。',
      question: '男的为什么睡不好觉？',
      options: ['工作太忙', '生病了', '新家附近太吵', '天气太热'],
      context: 'A woman asks a man why he looks tired.'
    }),
    correctAnswer: '新家附近太吵',
    explanation: 'The main reason he states is the night market near his new home is noisy (很吵).',
    difficulty: 4
  },
  // HSK 4 - Reading Fill
  {
    type: 'reading_fill',
    hskLevel: 4,
    content: JSON.stringify({
      sentence: '这次考试，我们班的同学 ____ 通过了。',
      options: ['全部', '一般', '分别', '各自'],
      hint: 'Which word means "all" or "entirely"?'
    }),
    correctAnswer: '全部',
    explanation: '全部 (quánbù) means "all" or "entirely", indicating everyone passed.',
    difficulty: 4
  },
  {
    type: 'reading_fill',
    hskLevel: 4,
    content: JSON.stringify({
      sentence: '尽管困难重重，他 ____ 没有放弃。',
      options: ['始终', '忽然', '果然', '偶尔'],
      hint: 'Which word means "always" or "throughout"?'
    }),
    correctAnswer: '始终',
    explanation: '始终 (shǐzhōng) means "always" or "from beginning to end", emphasizing consistency.',
    difficulty: 4
  },
  // HSK 5 - Reading Comprehension
  {
    type: 'reading_comprehension',
    hskLevel: 5,
    content: JSON.stringify({
      passage: '随着互联网的普及，人们的生活方式发生了深刻的变化。网购已经成为很多人日常生活的一部分。然而，网购在带来便利的同时，也带来了一些问题。比如，商品质量难以保证，退换货不方便，个人信息安全也存在隐患。因此，消费者在享受网购便利的同时，也要提高自我保护意识。',
      question: '这段话的主要内容是什么？',
      options: ['介绍网购的历史', '分析网购的利与弊', '提倡减少网购', '描述互联网的发展'],
      context: 'A passage about online shopping.'
    }),
    correctAnswer: '分析网购的利与弊',
    explanation: 'The passage discusses both the convenience of online shopping AND its problems (利与弊 = advantages and disadvantages).',
    difficulty: 5
  },
  {
    type: 'reading_comprehension',
    hskLevel: 5,
    content: JSON.stringify({
      passage: '中国传统节日春节，又称为"农历新年"，是中国最重要的传统节日。春节的习俗丰富多彩，包括贴春联、放鞭炮、吃年夜饭、给孩子压岁钱等。近年来，随着人们生活水平的提高，春节的庆祝方式也在不断变化，但核心的家庭团聚主题始终没有改变。',
      question: '根据文章，春节最核心的主题是什么？',
      options: ['放鞭炮', '吃年夜饭', '贴春联', '家庭团聚'],
      context: 'A passage about the Spring Festival.'
    }),
    correctAnswer: '家庭团聚',
    explanation: 'The passage explicitly states "核心的家庭团聚主题始终没有改变" (the core theme of family reunion has never changed).',
    difficulty: 5
  },
  // HSK 6 - Reading Comprehension
  {
    type: 'reading_comprehension',
    hskLevel: 6,
    content: JSON.stringify({
      passage: '人工智能的迅猛发展，使我们不得不重新审视人类在未来社会中的地位与价值。一方面，人工智能在医疗诊断、金融分析、交通管理等领域展现出超越人类的精准性与效率；另一方面，它在创造力、情感理解和道德判断等方面仍然与人类存在显著差距。这种复杂的共存关系促使我们思考：在与人工智能的协作中，人类应当发挥怎样独特的优势？',
      question: '根据文章，人工智能与人类相比，在哪方面仍有明显不足？',
      options: ['数据处理速度', '精准性与效率', '创造力和情感理解', '医疗诊断能力'],
      context: 'A passage about AI and humanity.'
    }),
    correctAnswer: '创造力和情感理解',
    explanation: 'The passage states AI has a significant gap in "创造力、情感理解和道德判断" (creativity, emotional understanding, and moral judgment).',
    difficulty: 6
  },
  {
    type: 'reading_comprehension',
    hskLevel: 6,
    content: JSON.stringify({
      passage: '语言是文化的载体，也是民族认同的重要标志。随着全球化的深入，英语作为国际通用语言的地位日益凸显，这在客观上对各民族语言的传承和发展构成了挑战。然而，语言多样性的保护不仅仅是一个文化问题，它还关乎生物多样性的维护。语言学家研究发现，很多濒危语言中蕴含着人类对自然的独特认知，一旦消亡，这些知识将永远无法恢复。',
      question: '文章提到保护语言多样性有哪些重要意义？',
      options: ['仅仅是文化价值', '抵制英语推广', '文化与生态知识的双重价值', '提高教育水平'],
      context: 'A passage about linguistic diversity.'
    }),
    correctAnswer: '文化与生态知识的双重价值',
    explanation: 'The passage states language diversity protection is "不仅仅是一个文化问题，它还关乎生物多样性" - both cultural and biodiversity/ecological knowledge.',
    difficulty: 6
  },
  // Writing Stroke Questions
  {
    type: 'writing_stroke',
    hskLevel: 1,
    content: JSON.stringify({
      character: '人',
      strokeCount: 2,
      strokeOrder: ['撇', '捺'],
      hint: 'This character means "person/people".',
      radical: '人'
    }),
    correctAnswer: '撇,捺',
    explanation: '人 (rén) has 2 strokes: first a left-falling stroke (撇), then a right-falling stroke (捺).',
    difficulty: 1
  },
  {
    type: 'writing_stroke',
    hskLevel: 1,
    content: JSON.stringify({
      character: '山',
      strokeCount: 3,
      strokeOrder: ['竖', '竖折', '竖'],
      hint: 'This character means "mountain".',
      radical: '山'
    }),
    correctAnswer: '竖,竖折,竖',
    explanation: '山 (shān) has 3 strokes: first the middle vertical stroke, then the left part (vertical + fold), then the right vertical stroke.',
    difficulty: 1
  },
  {
    type: 'writing_stroke',
    hskLevel: 2,
    content: JSON.stringify({
      character: '明',
      strokeCount: 8,
      components: ['日', '月'],
      hint: 'This character is composed of 日 (sun) and 月 (moon), meaning "bright/clear".',
      radical: '日'
    }),
    correctAnswer: '日+月',
    explanation: '明 (míng) combines 日 (sun) on the left and 月 (moon) on the right. The sun and moon together create brightness.',
    difficulty: 2
  },
  {
    type: 'writing_stroke',
    hskLevel: 2,
    content: JSON.stringify({
      character: '好',
      strokeCount: 6,
      components: ['女', '子'],
      hint: 'This character combines 女 (woman) and 子 (child), meaning "good".',
      radical: '女'
    }),
    correctAnswer: '女+子',
    explanation: '好 (hǎo) combines 女 (woman) on the left and 子 (child) on the right. The idea of a woman with a child represents "good".',
    difficulty: 2
  },
  // HSK 3 - Reading Fill (more complex)
  {
    type: 'reading_fill',
    hskLevel: 3,
    content: JSON.stringify({
      sentence: '他 ____ 把作业做完，才去睡觉。',
      options: ['先', '已经', '刚刚', '正在'],
      hint: 'Which word indicates sequence "first...then"?'
    }),
    correctAnswer: '先',
    explanation: '先…才 means "first do A, then (only) do B". 先 indicates the first action in a sequence.',
    difficulty: 3
  },
  {
    type: 'reading_fill',
    hskLevel: 3,
    content: JSON.stringify({
      sentence: '这个问题很复杂，需要 ____ 考虑。',
      options: ['仔细', '快速', '轻松', '偶尔'],
      hint: 'Which word means "carefully/thoroughly"?'
    }),
    correctAnswer: '仔细',
    explanation: '仔细 (zǐxì) means "careful" or "thorough". The sentence means "This problem is complex and needs careful consideration."',
    difficulty: 3
  },
  {
    type: 'reading_fill',
    hskLevel: 4,
    content: JSON.stringify({
      sentence: '______经济困难，他坚持完成了学业。',
      options: ['尽管', '因为', '只要', '无论'],
      hint: 'Which conjunction means "despite/even though"?'
    }),
    correctAnswer: '尽管',
    explanation: '尽管 (jǐnguǎn) means "despite/even though". The sentence: "Despite economic hardship, he persisted in completing his studies."',
    difficulty: 4
  },
  {
    type: 'reading_fill',
    hskLevel: 5,
    content: JSON.stringify({
      sentence: '这种现象在发展中国家 ____ 存在，在发达国家也同样突出。',
      options: ['不仅', '虽然', '只要', '何况'],
      hint: 'Which conjunction starts a "not only...but also" structure?'
    }),
    correctAnswer: '不仅',
    explanation: '不仅…也/还 means "not only...but also". The sentence: "This phenomenon not only exists in developing countries, but is equally prominent in developed countries."',
    difficulty: 5
  },
]
