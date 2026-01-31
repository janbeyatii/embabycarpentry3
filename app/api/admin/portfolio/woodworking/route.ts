import { NextRequest, NextResponse } from 'next/server'
import { getWoodworkingPortfolio, createWoodworkingItem } from '@/lib/queries/woodworking-portfolio'
import { verifySession, getSessionFromCookie } from '@/lib/auth'

async function verifyAdmin(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  const token = getSessionFromCookie(cookieHeader)
  
  if (!token) {
    return null
  }

  return await verifySession(token)
}

export async function GET(request: NextRequest) {
  try {
    const session = await verifyAdmin(request)
    if (!session || !session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const items = await getWoodworkingPortfolio()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching woodworking portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifyAdmin(request)
    if (!session || !session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const item = await createWoodworkingItem({
      name: data.name,
      description: data.description || null,
      images: data.images || [],
      dimensions: data.dimensions || null,
      materials: data.materials || null,
      is_custom_build: data.isCustomBuild || false,
      is_featured: data.isFeatured || false,
      display_order: data.displayOrder || 0
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating woodworking item:', error)
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}
