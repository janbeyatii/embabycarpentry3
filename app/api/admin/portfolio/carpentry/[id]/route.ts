import { NextRequest, NextResponse } from 'next/server'
import {
  getCarpentryItemById,
  updateCarpentryItem,
  deleteCarpentryItem
} from '@/lib/queries/carpentry-portfolio'
import { verifySession, getSessionFromCookie } from '@/lib/auth'

async function verifyAdmin(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  const token = getSessionFromCookie(cookieHeader)
  if (!token) return null
  return await verifySession(token)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdmin(request)
    if (!session?.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const item = await getCarpentryItemById(id)
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (err) {
    console.error('Error fetching carpentry item:', err)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdmin(request)
    if (!session?.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const data = await request.json()
    const item = await updateCarpentryItem(id, {
      title: data.title,
      description: data.description ?? undefined,
      images: data.images,
      category: data.category,
      is_featured: data.isFeatured,
      display_order: data.displayOrder
    })
    return NextResponse.json(item)
  } catch (err) {
    console.error('Error updating carpentry item:', err)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdmin(request)
    if (!session?.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    await deleteCarpentryItem(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error deleting carpentry item:', err)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
