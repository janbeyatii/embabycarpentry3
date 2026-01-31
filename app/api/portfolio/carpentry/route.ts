import { NextResponse } from 'next/server'
import { getCarpentryPortfolio } from '@/lib/queries/carpentry-portfolio'

export async function GET() {
  try {
    const portfolio = await getCarpentryPortfolio()
    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Error fetching carpentry portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
}
