import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()
    const topic = await Topic.findById(id)
    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { newTitle: title, newDescription: description } =
      await request.json()
    await connectMongoDB()
    await Topic.findByIdAndUpdate(id, { title, description })
    return NextResponse.json({ message: 'Topic updated' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
