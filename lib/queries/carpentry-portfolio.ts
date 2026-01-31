import { findAll, findById, insert, update, remove } from '../db'

export interface CarpentryPortfolioItem {
  id: string
  title: string
  description: string | null
  images: string[]
  category: 'kitchens' | 'bath' | 'basement' | 'deck-fences' | 'sheds'
  is_featured: boolean
  display_order: number
  created_at: Date
  updated_at: Date
}

export async function getCarpentryPortfolio(
  category?: string,
  featuredOnly: boolean = false
): Promise<CarpentryPortfolioItem[]> {
  const filters: Record<string, any> = {}
  if (category) filters.category = category
  if (featuredOnly) filters.is_featured = true
  
  return findAll<CarpentryPortfolioItem>(
    'carpentry_portfolio',
    Object.keys(filters).length > 0 ? filters : undefined,
    'display_order ASC, created_at DESC'
  )
}

export async function getCarpentryItemById(id: string): Promise<CarpentryPortfolioItem | null> {
  return findById<CarpentryPortfolioItem>('carpentry_portfolio', id)
}

export async function createCarpentryItem(
  data: Omit<CarpentryPortfolioItem, 'id' | 'created_at' | 'updated_at'>
): Promise<CarpentryPortfolioItem> {
  return insert('carpentry_portfolio', data) as Promise<CarpentryPortfolioItem>
}

export async function updateCarpentryItem(
  id: string,
  data: Partial<CarpentryPortfolioItem>
): Promise<CarpentryPortfolioItem> {
  return update('carpentry_portfolio', id, data) as Promise<CarpentryPortfolioItem>
}

export async function deleteCarpentryItem(id: string): Promise<boolean> {
  return remove('carpentry_portfolio', id)
}
