import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import User from '@/models/user'

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json()
    const { name, email } = user

    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const userExists = await User.findOne({ email })

    if (!userExists) {
      await User.create({ name, email })
    }

    // Log the login event
    const apiUrl = process.env.API_URL || ''
    await fetch(`${apiUrl}/api/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[USER-AUTH ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
