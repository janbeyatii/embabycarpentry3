import { NextRequest, NextResponse } from 'next/server'
import { getCarpentryPortfolio, createCarpentryItem } from '@/lib/queries/carpentry-portfolio'
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

    const items = await getCarpentryPortfolio()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching carpentry portfolio:', error)
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
    const item = await createCarpentryItem({
      title: data.title,
      description: data.description || null,
      images: data.images || [],
      category: data.category,
      is_featured: data.isFeatured || false,
      display_order: data.displayOrder || 0
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating carpentry item:', error)
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}
