import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import User from '@/models/user'
import Log from '@/models/log'

export async function POST(req: NextRequest) {
  try {
    // Body가 없는 요청 무시
    const contentType = req.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const body = await req.json()
    const user = body?.user

    if (!user || !user.email) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const { name, email } = user

    await connectMongoDB()

    const userExists = await User.findOne({ email })
    if (!userExists) {
      await User.create({ name, email })
    }

    await Log.create({ email })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[USER-AUTH ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
