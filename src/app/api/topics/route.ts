import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  await connectMongoDB()
  const topic = await Topic.findById(id)
  if (!topic) {
    return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
  }
  return NextResponse.json({ topic }, { status: 200 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const { title, description } = await request.json()
  if (!title || !description) {
    return NextResponse.json(
      { message: 'Title and description are required' },
      { status: 400 }
    )
  }
  await connectMongoDB()
  const existing = await Topic.findOne({ _id: id, title, description })
  if (existing) {
    return NextResponse.json(
      { message: 'No changes detected' },
      { status: 200 }
    )
  }
  const updated = await Topic.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  )
  if (!updated) {
    return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
  }
  return NextResponse.json({ message: 'Topic updated' }, { status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  await connectMongoDB()
  const deletedTopic = await Topic.findByIdAndDelete(id)
  if (!deletedTopic) {
    return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
  }
  return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
}
