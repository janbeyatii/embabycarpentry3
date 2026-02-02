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
