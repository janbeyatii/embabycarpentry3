import { NextRequest, NextResponse } from 'next/server'
import {
  getWoodworkingItemById,
  updateWoodworkingItem,
  deleteWoodworkingItem
} from '@/lib/queries/woodworking-portfolio'
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
    const item = await getWoodworkingItemById(id)
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (err) {
    console.error('Error fetching woodworking item:', err)
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
    const item = await updateWoodworkingItem(id, {
      name: data.name,
      description: data.description ?? undefined,
      images: data.images,
      dimensions: data.dimensions ?? undefined,
      materials: data.materials ?? undefined,
      is_custom_build: data.isCustomBuild,
      is_featured: data.isFeatured,
      display_order: data.displayOrder
    })
    return NextResponse.json(item)
  } catch (err) {
    console.error('Error updating woodworking item:', err)
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
    await deleteWoodworkingItem(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error deleting woodworking item:', err)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
