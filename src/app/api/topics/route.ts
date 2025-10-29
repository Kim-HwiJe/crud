import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    await connectMongoDB()
    const topic = await Topic.findById(id)
    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }
    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.error('GET /api/topics/[id] Error:', error)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    const { newTitle: title, newDescription: description } =
      await request.json()
    await connectMongoDB()
    await Topic.findByIdAndUpdate(id, { title, description })
    return NextResponse.json({ message: 'Topic updated' }, { status: 200 })
  } catch (error) {
    console.error('PUT /api/topics/[id] Error:', error)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    await connectMongoDB()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
  } catch (error) {
    console.error('DELETE /api/topics/[id] Error:', error)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
