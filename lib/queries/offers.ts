import { findAll, findById, insert, update, remove } from '../db'

export interface Offer {
  id: string
  title: string
  description: string | null
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  code: string | null
  start_date: Date | null
  end_date: Date | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getOffers(activeOnly: boolean = false): Promise<Offer[]> {
  const filters = activeOnly ? { is_active: true } : undefined
  return findAll<Offer>('offers', filters, 'created_at DESC')
}

export async function getOfferById(id: string): Promise<Offer | null> {
  return findById<Offer>('offers', id)
}

export async function createOffer(data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>): Promise<Offer> {
  return insert('offers', data) as Promise<Offer>
}

export async function updateOffer(id: string, data: Partial<Offer>): Promise<Offer> {
  return update('offers', id, data) as Promise<Offer>
}

export async function deleteOffer(id: string): Promise<boolean> {
  return remove('offers', id)
}

export async function getActiveOffers(): Promise<Offer[]> {
  const now = new Date().toISOString()
  const { sql } = await import('@vercel/postgres')
  
  const result = await sql`
    SELECT * FROM offers
    WHERE is_active = true
      AND (start_date IS NULL OR start_date <= ${now}::timestamptz)
      AND (end_date IS NULL OR end_date >= ${now}::timestamptz)
    ORDER BY created_at DESC
  `
  
  return result.rows as Offer[]
}
