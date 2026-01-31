'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const inputStyle = {
  width: '100%',
  padding: '1rem 1.2rem',
  background: 'var(--black)',
  border: 'var(--border)',
  borderRadius: '0.5rem',
  fontSize: '1.5rem',
  color: 'var(--text-primary)',
  marginTop: '0.5rem'
} as const

function toLocalDateTime(d: Date | string | null): string {
  if (!d) return ''
  const date = new Date(d)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day}T${h}:${min}`
}

export default function EditOfferPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState<{
    title: string
    description: string
    discountType: 'percentage' | 'fixed'
    discountValue: string
    code: string
    startDate: string
    endDate: string
    isActive: boolean
  } | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/admin/offers/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Offer not found')
        return res.json()
      })
      .then((offer) => {
        setForm({
          title: offer.title || '',
          description: offer.description || '',
          discountType: offer.discount_type || 'percentage',
          discountValue: String(offer.discount_value ?? ''),
          code: offer.code || '',
          startDate: toLocalDateTime(offer.start_date),
          endDate: toLocalDateTime(offer.end_date),
          isActive: offer.is_active !== false
        })
      })
      .catch(() => setLoadError('Failed to load offer'))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form || !id) return
    setSubmitError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/offers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim() || null,
          discountType: form.discountType,
          discountValue: Number(form.discountValue) || 0,
          code: form.code.trim() || null,
          startDate: form.startDate || null,
          endDate: form.endDate || null,
          isActive: form.isActive
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update')
      router.push('/admin/offers')
      router.refresh()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setLoading(false)
    }
  }

  if (loadError) {
    return (
      <div>
        <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{loadError}</p>
        <Link href="/admin/offers" style={{ color: 'var(--yellow)', fontSize: '1.5rem' }}>← Back to offers</Link>
      </div>
    )
  }

  if (!form) {
    return <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)' }}>Loading...</p>
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/offers" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
          ← Back to offers
        </Link>
      </div>
      <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Edit offer</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: '50rem' }}>
        {submitError && (
          <div style={{
            padding: '1rem',
            background: 'rgba(255,0,0,0.1)',
            border: '1px solid rgba(255,0,0,0.3)',
            borderRadius: '0.5rem',
            color: '#ff6b6b',
            marginBottom: '1.5rem',
            fontSize: '1.4rem'
          }}>
            {submitError}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f!, title: e.target.value }))}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f!, description: e.target.value }))}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Discount type</label>
            <select
              value={form.discountType}
              onChange={(e) => setForm((f) => ({ ...f!, discountType: e.target.value as 'percentage' | 'fixed' }))}
              style={inputStyle}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed amount</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              Discount value * {form.discountType === 'percentage' ? '(%)' : '($)'}
            </label>
            <input
              type="number"
              required
              min={0}
              step={form.discountType === 'percentage' ? 1 : 0.01}
              value={form.discountValue}
              onChange={(e) => setForm((f) => ({ ...f!, discountValue: e.target.value }))}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Coupon code (optional)</label>
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f!, code: e.target.value }))}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Start date (optional)</label>
            <input
              type="datetime-local"
              value={form.startDate}
              onChange={(e) => setForm((f) => ({ ...f!, startDate: e.target.value }))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)' }}>End date (optional)</label>
            <input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) => setForm((f) => ({ ...f!, endDate: e.target.value }))}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <input
            type="checkbox"
            id="isActiveEdit"
            checked={form.isActive}
            onChange={(e) => setForm((f) => ({ ...f!, isActive: e.target.checked }))}
            style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer' }}
          />
          <label htmlFor="isActiveEdit" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}>Active (show on site)</label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: loading ? 'var(--black-light)' : 'var(--yellow)',
              color: 'var(--black)',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
          <Link href="/admin/offers" style={{ padding: '1rem 2rem', background: 'var(--black)', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '0.5rem', fontSize: '1.5rem', border: 'var(--border)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
