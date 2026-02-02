import { NextResponse } from 'next/server'
import { getPortfolioData } from '@/lib/portfolio-data'

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const count = Math.min(10, Math.max(1, parseInt(searchParams.get('count') ?? '3', 10)))
  try {
    const data = getPortfolioData()
    const byProject = data?.byProject ?? []
    if (byProject.length === 0) {
      return NextResponse.json([])
    }
    const shuffled = shuffle(byProject)
    const projects = shuffled.slice(0, Math.min(count, shuffled.length)).map((p) => ({
      id: `${p.category}-${p.project}`.replace(/\s+/g, '-'),
      title: p.category,
      description: null,
      images: p.images.map((i) => i.url),
      category: p.category,
    }))
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching portfolio preview:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
