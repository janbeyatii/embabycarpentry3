import { NextResponse } from 'next/server'
import { getActiveOffers } from '@/lib/queries/offers'

export async function GET() {
  try {
    const offers = await getActiveOffers()
    return NextResponse.json(offers)
  } catch (error) {
    console.error('Error fetching active offers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    )
  }
}
