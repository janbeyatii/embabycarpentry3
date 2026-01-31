import { findAll, findById, insert, update, remove } from '../db'

export interface WoodworkingPortfolioItem {
  id: string
  name: string
  description: string | null
  images: string[]
  dimensions: string | null
  materials: string | null
  is_custom_build: boolean
  is_featured: boolean
  display_order: number
  created_at: Date
  updated_at: Date
}

export async function getWoodworkingPortfolio(
  featuredOnly: boolean = false
): Promise<WoodworkingPortfolioItem[]> {
  const filters = featuredOnly ? { is_featured: true } : undefined
  
  return findAll<WoodworkingPortfolioItem>(
    'woodworking_portfolio',
    filters,
    'display_order ASC, created_at DESC'
  )
}

export async function getWoodworkingItemById(id: string): Promise<WoodworkingPortfolioItem | null> {
  return findById<WoodworkingPortfolioItem>('woodworking_portfolio', id)
}

export async function createWoodworkingItem(
  data: Omit<WoodworkingPortfolioItem, 'id' | 'created_at' | 'updated_at'>
): Promise<WoodworkingPortfolioItem> {
  return insert('woodworking_portfolio', data) as Promise<WoodworkingPortfolioItem>
}

export async function updateWoodworkingItem(
  id: string,
  data: Partial<WoodworkingPortfolioItem>
): Promise<WoodworkingPortfolioItem> {
  return update('woodworking_portfolio', id, data) as Promise<WoodworkingPortfolioItem>
}

export async function deleteWoodworkingItem(id: string): Promise<boolean> {
  return remove('woodworking_portfolio', id)
}
