-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'system',
    "uiLanguage" TEXT NOT NULL DEFAULT 'zh',
    "audioSpeed" REAL NOT NULL DEFAULT 1.0,
    "showPinyin" BOOLEAN NOT NULL DEFAULT true,
    "showTranslation" BOOLEAN NOT NULL DEFAULT true,
    "autoPlay" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserGoals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dailyWordsTarget" INTEGER NOT NULL DEFAULT 10,
    "dailyMinutesTarget" INTEGER NOT NULL DEFAULT 20,
    "targetHskLevel" INTEGER NOT NULL DEFAULT 3,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" DATETIME,
    CONSTRAINT "UserGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VocabularyWord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hanzi" TEXT NOT NULL,
    "pinyin" TEXT NOT NULL,
    "pinyinNormalized" TEXT NOT NULL,
    "hskLevel" INTEGER NOT NULL,
    "partOfSpeech" TEXT NOT NULL,
    "definitionEn" TEXT NOT NULL,
    "definitionZh" TEXT,
    "exampleSentence" TEXT,
    "examplePinyin" TEXT,
    "exampleTranslation" TEXT,
    "audioPath" TEXT,
    "strokeCount" INTEGER,
    "frequency" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "UserWordProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "correctCount" INTEGER NOT NULL DEFAULT 0,
    "incorrectCount" INTEGER NOT NULL DEFAULT 0,
    "easeFactor" REAL NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "dueDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserWordProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserWordProgress_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "VocabularyWord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserFavoriteWord" (
    "userId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "wordId"),
    CONSTRAINT "UserFavoriteWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserFavoriteWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "VocabularyWord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrammarPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hskLevel" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "titleZh" TEXT,
    "pattern" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "GrammarExample" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grammarPointId" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,
    "pinyin" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "notes" TEXT,
    "isExercise" BOOLEAN NOT NULL DEFAULT false,
    "blankPosition" INTEGER,
    "blankOptions" TEXT,
    CONSTRAINT "GrammarExample_grammarPointId_fkey" FOREIGN KEY ("grammarPointId") REFERENCES "GrammarPoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "hskLevel" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "explanation" TEXT,
    "audioPath" TEXT,
    "difficulty" INTEGER NOT NULL DEFAULT 3,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ExamTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hskLevel" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "durationMins" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL DEFAULT 300,
    "passScore" INTEGER NOT NULL DEFAULT 180,
    "structure" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExamRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in_progress',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" DATETIME,
    "totalScore" INTEGER,
    "listeningScore" INTEGER,
    "readingScore" INTEGER,
    "writingScore" INTEGER,
    "passed" BOOLEAN,
    "timeSpentSecs" INTEGER,
    "questionIds" TEXT NOT NULL,
    CONSTRAINT "ExamRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExamRecord_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ExamTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExamAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "examRecordId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userAnswer" TEXT NOT NULL DEFAULT '',
    "isCorrect" BOOLEAN,
    "score" INTEGER,
    "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExamAnswer_examRecordId_fkey" FOREIGN KEY ("examRecordId") REFERENCES "ExamRecord" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExamAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ErrorRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "wordId" TEXT,
    "grammarPointId" TEXT,
    "questionId" TEXT,
    "errorNote" TEXT,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "easeFactor" REAL NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "nextReviewAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mastered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ErrorRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ErrorRecord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "VocabularyWord" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ErrorRecord_grammarPointId_fkey" FOREIGN KEY ("grammarPointId") REFERENCES "GrammarPoint" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ErrorRecord_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "wordsStudied" INTEGER NOT NULL DEFAULT 0,
    "wordsLearned" INTEGER NOT NULL DEFAULT 0,
    "minutesStudied" INTEGER NOT NULL DEFAULT 0,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "questionsAnswered" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "listeningMins" INTEGER NOT NULL DEFAULT 0,
    "readingMins" INTEGER NOT NULL DEFAULT 0,
    "writingMins" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "DailyStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoals_userId_key" ON "UserGoals"("userId");

-- CreateIndex
CREATE INDEX "VocabularyWord_hskLevel_idx" ON "VocabularyWord"("hskLevel");

-- CreateIndex
CREATE INDEX "VocabularyWord_pinyinNormalized_idx" ON "VocabularyWord"("pinyinNormalized");

-- CreateIndex
CREATE UNIQUE INDEX "VocabularyWord_hanzi_hskLevel_key" ON "VocabularyWord"("hanzi", "hskLevel");

-- CreateIndex
CREATE INDEX "UserWordProgress_userId_dueDate_idx" ON "UserWordProgress"("userId", "dueDate");

-- CreateIndex
CREATE INDEX "UserWordProgress_userId_status_idx" ON "UserWordProgress"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "UserWordProgress_userId_wordId_key" ON "UserWordProgress"("userId", "wordId");

-- CreateIndex
CREATE INDEX "GrammarPoint_hskLevel_idx" ON "GrammarPoint"("hskLevel");

-- CreateIndex
CREATE INDEX "Question_type_hskLevel_idx" ON "Question"("type", "hskLevel");

-- CreateIndex
CREATE INDEX "ExamRecord_userId_status_idx" ON "ExamRecord"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ExamAnswer_examRecordId_questionId_key" ON "ExamAnswer"("examRecordId", "questionId");

-- CreateIndex
CREATE INDEX "ErrorRecord_userId_nextReviewAt_mastered_idx" ON "ErrorRecord"("userId", "nextReviewAt", "mastered");

-- CreateIndex
CREATE INDEX "DailyStats_userId_date_idx" ON "DailyStats"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStats_userId_date_key" ON "DailyStats"("userId", "date");
