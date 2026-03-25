import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: '邮箱和密码不能为空' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: '该邮箱已被注册' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        passwordHash,
        settings: {
          create: {
            theme: 'system',
            uiLanguage: 'zh',
            audioSpeed: 1.0,
            showPinyin: true,
            showTranslation: true,
          },
        },
        goals: {
          create: {
            dailyWordsTarget: 10,
            dailyMinutesTarget: 20,
            targetHskLevel: 1,
            currentStreak: 0,
            longestStreak: 0,
            totalXp: 0,
          },
        },
      },
    })

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: '注册失败，请重试' }, { status: 500 })
  }
}
