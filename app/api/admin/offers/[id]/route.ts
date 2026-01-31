import { NextRequest, NextResponse } from 'next/server'
import { getOfferById, updateOffer, deleteOffer } from '@/lib/queries/offers'
import { verifySession, getSessionFromCookie } from '@/lib/auth'

async function verifyAdmin(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  const token = getSessionFromCookie(cookieHeader)
  
  if (!token) {
    return null
  }

  return await verifySession(token)
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAdmin(request)
    if (!session || !session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const offer = await getOfferById(params.id)
    
    if (!offer) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(offer)
  } catch (error) {
    console.error('Error fetching offer:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offer' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAdmin(request)
    if (!session || !session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const offer = await updateOffer(params.id, {
      title: data.title,
      description: data.description || null,
      discount_type: data.discountType,
      discount_value: data.discountValue,
      code: data.code || null,
      start_date: data.startDate ? new Date(data.startDate) : null,
      end_date: data.endDate ? new Date(data.endDate) : null,
      is_active: data.isActive
    })

    return NextResponse.json(offer)
  } catch (error) {
    console.error('Error updating offer:', error)
    return NextResponse.json(
      { error: 'Failed to update offer' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAdmin(request)
    if (!session || !session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await deleteOffer(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting offer:', error)
    return NextResponse.json(
      { error: 'Failed to delete offer' },
      { status: 500 }
    )
  }
}
