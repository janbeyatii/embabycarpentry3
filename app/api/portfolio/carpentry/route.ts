import { NextResponse } from 'next/server'
import { getCarpentryPortfolio } from '@/lib/queries/carpentry-portfolio'

/** Postgres TEXT[] can come back as array or string; normalize to string[] */
function normalizeImages(images: unknown): string[] {
  if (Array.isArray(images)) {
    return images.filter((u): u is string => typeof u === 'string' && u.startsWith('http'))
  }
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images.replace(/'/g, '"'))
      return Array.isArray(parsed) ? parsed.filter((u: unknown) => typeof u === 'string') : []
    } catch {
      return []
    }
  }
  return []
}

export async function GET() {
  try {
    const portfolio = await getCarpentryPortfolio()
    const normalized = portfolio.map((item) => ({
      ...item,
      images: normalizeImages(item.images),
    }))
    return NextResponse.json(normalized)
  } catch (error) {
    console.error('Error fetching carpentry portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
}
