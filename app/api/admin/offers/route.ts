import { NextRequest, NextResponse } from 'next/server'
import { getOffers, createOffer, updateOffer, deleteOffer, getOfferById } from '@/lib/queries/offers'
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

    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('activeOnly') === 'true'
    
    const offers = await getOffers(activeOnly)
    return NextResponse.json(offers)
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
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
    const offer = await createOffer({
      title: data.title,
      description: data.description || null,
      discount_type: data.discountType,
      discount_value: data.discountValue,
      code: data.code || null,
      start_date: data.startDate ? new Date(data.startDate) : null,
      end_date: data.endDate ? new Date(data.endDate) : null,
      is_active: data.isActive !== false
    })

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    console.error('Error creating offer:', error)
    return NextResponse.json(
      { error: 'Failed to create offer' },
      { status: 500 }
    )
  }
}
