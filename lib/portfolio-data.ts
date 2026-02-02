import fs from 'fs'
import path from 'path'

export interface PortfolioImage {
  name: string
  url: string
}

export interface PortfolioProject {
  category: string
  project: string
  images: PortfolioImage[]
}

export interface PortfolioData {
  flat: Array<{ category: string; project: string; name: string; url: string }>
  byProject: PortfolioProject[]
}

let cached: PortfolioData | null = null

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function getSlideshowImages(count = 25): string[] {
  const data = getPortfolioData()
  const urls = data?.flat?.map((f) => f.url) ?? []
  if (urls.length === 0) return []
  const shuffled = shuffle(urls)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function getPortfolioData(): PortfolioData | null {
  if (cached) return cached
  try {
    const filePath = path.join(process.cwd(), 'uploaded-urls.json')
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf8')
    cached = JSON.parse(raw) as PortfolioData
    return cached
  } catch {
    return null
  }
}
