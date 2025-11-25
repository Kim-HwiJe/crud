import connectMongoDB from '@/libs/mongodb'
import Log from '@/models/log'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await connectMongoDB()
    await Log.create({ email })

    return NextResponse.json({ message: 'Login event logged' }, { status: 201 })
  } catch (error) {
    console.error('Error logging login event:', error)
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 })
  }
}
