import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id

  try {
    const [settings, goals] = await Promise.all([
      prisma.userSettings.findUnique({ where: { userId } }),
      prisma.userGoals.findUnique({ where: { userId } }),
    ])

    return NextResponse.json({
      theme: settings?.theme ?? 'system',
      uiLanguage: settings?.uiLanguage ?? 'zh',
      audioSpeed: settings?.audioSpeed ?? 1.0,
      showPinyin: settings?.showPinyin ?? true,
      showTranslation: settings?.showTranslation ?? true,
      autoPlay: settings?.autoPlay ?? false,
      dailyWordsTarget: goals?.dailyWordsTarget ?? 10,
      dailyMinutesTarget: goals?.dailyMinutesTarget ?? 20,
      targetHskLevel: goals?.targetHskLevel ?? 3,
    })
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id

  try {
    const body = await request.json()
    const {
      theme,
      uiLanguage,
      audioSpeed,
      showPinyin,
      showTranslation,
      autoPlay,
      dailyWordsTarget,
      dailyMinutesTarget,
      targetHskLevel,
    } = body

    const [settings, goals] = await Promise.all([
      prisma.userSettings.upsert({
        where: { userId },
        create: {
          userId,
          theme: theme ?? 'system',
          uiLanguage: uiLanguage ?? 'zh',
          audioSpeed: audioSpeed ?? 1.0,
          showPinyin: showPinyin ?? true,
          showTranslation: showTranslation ?? true,
          autoPlay: autoPlay ?? false,
        },
        update: {
          ...(theme !== undefined && { theme }),
          ...(uiLanguage !== undefined && { uiLanguage }),
          ...(audioSpeed !== undefined && { audioSpeed }),
          ...(showPinyin !== undefined && { showPinyin }),
          ...(showTranslation !== undefined && { showTranslation }),
          ...(autoPlay !== undefined && { autoPlay }),
        },
      }),
      prisma.userGoals.upsert({
        where: { userId },
        create: {
          userId,
          dailyWordsTarget: dailyWordsTarget ?? 10,
          dailyMinutesTarget: dailyMinutesTarget ?? 20,
          targetHskLevel: targetHskLevel ?? 3,
        },
        update: {
          ...(dailyWordsTarget !== undefined && { dailyWordsTarget }),
          ...(dailyMinutesTarget !== undefined && { dailyMinutesTarget }),
          ...(targetHskLevel !== undefined && { targetHskLevel }),
        },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
