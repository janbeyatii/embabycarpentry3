import { findAll, findById, insert } from '../db'

export interface Quote {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  project_type: string | null
  budget_range: string | null
  timeline: string | null
  message: string | null
  email_sent: boolean
  created_at: Date
}

export async function getQuotes(): Promise<Quote[]> {
  return findAll<Quote>('quotes', undefined, 'created_at DESC')
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  return findById<Quote>('quotes', id)
}

export async function createQuote(
  data: Omit<Quote, 'id' | 'email_sent' | 'created_at'>
): Promise<Quote> {
  return insert('quotes', { ...data, email_sent: false }) as Promise<Quote>
}
