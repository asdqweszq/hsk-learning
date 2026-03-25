import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = (session.user as any).id as string

    const goals = await prisma.userGoals.findUnique({ where: { userId } })

    if (!goals) {
      // Return defaults if goals not yet created
      return NextResponse.json({
        userId,
        dailyWordsTarget: 10,
        dailyMinutesTarget: 20,
        targetHskLevel: 3,
        currentStreak: 0,
        longestStreak: 0,
        totalXp: 0,
        lastStudyDate: null,
      })
    }

    return NextResponse.json(goals)
  } catch (error) {
    console.error('[GET /api/goals]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = (session.user as any).id as string

    const body = await request.json()

    // Only allow updating user-facing goal fields
    const allowedFields = [
      'dailyWordsTarget',
      'dailyMinutesTarget',
      'targetHskLevel',
    ] as const

    const updateData: Record<string, unknown> = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided' },
        { status: 400 }
      )
    }

    // Validate ranges
    if (
      updateData.dailyWordsTarget !== undefined &&
      (typeof updateData.dailyWordsTarget !== 'number' ||
        updateData.dailyWordsTarget < 1 ||
        updateData.dailyWordsTarget > 200)
    ) {
      return NextResponse.json(
        { error: 'dailyWordsTarget must be between 1 and 200' },
        { status: 400 }
      )
    }
    if (
      updateData.dailyMinutesTarget !== undefined &&
      (typeof updateData.dailyMinutesTarget !== 'number' ||
        updateData.dailyMinutesTarget < 1 ||
        updateData.dailyMinutesTarget > 480)
    ) {
      return NextResponse.json(
        { error: 'dailyMinutesTarget must be between 1 and 480' },
        { status: 400 }
      )
    }
    if (
      updateData.targetHskLevel !== undefined &&
      (typeof updateData.targetHskLevel !== 'number' ||
        ![1, 2, 3, 4, 5, 6].includes(updateData.targetHskLevel as number))
    ) {
      return NextResponse.json(
        { error: 'targetHskLevel must be 1-6' },
        { status: 400 }
      )
    }

    const goals = await prisma.userGoals.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        dailyWordsTarget: (updateData.dailyWordsTarget as number) ?? 10,
        dailyMinutesTarget: (updateData.dailyMinutesTarget as number) ?? 20,
        targetHskLevel: (updateData.targetHskLevel as number) ?? 3,
      },
    })

    return NextResponse.json(goals)
  } catch (error) {
    console.error('[PUT /api/goals]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
