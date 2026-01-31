import { findAll, findById, insert } from '../db'

export interface WoodworkingInquiry {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  product_id: string | null
  product_name: string | null
  is_custom_build: boolean
  custom_build_description: string | null
  delivery_type: 'pickup' | 'delivery' | null
  delivery_address: string | null
  message: string | null
  email_sent: boolean
  created_at: Date
}

export async function getInquiries(): Promise<WoodworkingInquiry[]> {
  return findAll<WoodworkingInquiry>('woodworking_inquiries', undefined, 'created_at DESC')
}

export async function getInquiryById(id: string): Promise<WoodworkingInquiry | null> {
  return findById<WoodworkingInquiry>('woodworking_inquiries', id)
}

export async function createInquiry(
  data: Omit<WoodworkingInquiry, 'id' | 'email_sent' | 'created_at'>
): Promise<WoodworkingInquiry> {
  return insert('woodworking_inquiries', { ...data, email_sent: false }) as Promise<WoodworkingInquiry>
}
