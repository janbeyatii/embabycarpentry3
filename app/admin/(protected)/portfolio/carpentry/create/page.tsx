'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageUploader } from '../../../../components/ImageUploader'

const CATEGORIES = [
  { value: 'kitchens', label: 'Kitchens' },
  { value: 'bath', label: 'Bathrooms' },
  { value: 'basement', label: 'Basements' },
  { value: 'deck-fences', label: 'Decks & Fences' },
  { value: 'sheds', label: 'Sheds' }
] as const

const cardStyle = {
  background: 'var(--black-light)',
  borderRadius: '0.8rem',
  padding: '1.5rem',
  border: 'var(--border)',
  height: '100%',
  minHeight: '28rem',
  display: 'flex',
  flexDirection: 'column' as const
}

const stepNumStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: '50%',
  background: 'var(--yellow)',
  color: 'var(--black)',
  fontSize: '1.4rem',
  fontWeight: '700',
  marginBottom: '0.8rem'
}

const labelStyle = {
  display: 'block',
  fontSize: '1.4rem',
  color: 'var(--text-primary)',
  marginBottom: '0.4rem',
  fontWeight: '600'
} as const

const hintStyle = {
  fontSize: '1.2rem',
  color: 'var(--text-secondary)',
  marginTop: '0.3rem',
  marginBottom: '0.8rem'
} as const

const inputStyle = {
  width: '100%',
  padding: '0.9rem 1rem',
  background: 'var(--black)',
  border: 'var(--border)',
  borderRadius: '0.5rem',
  fontSize: '1.45rem',
  color: 'var(--text-primary)',
  marginTop: '0.3rem'
} as const

export default function CreateCarpentryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'kitchens' as (typeof CATEGORIES)[number]['value'],
    images: [] as string[],
    isFeatured: false,
    displayOrder: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/portfolio/carpentry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim() || null,
          category: form.category,
          images: form.images,
          isFeatured: form.isFeatured,
          displayOrder: Number(form.displayOrder) || 0
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      router.push('/admin/portfolio/carpentry')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-page-wrap">
      <style dangerouslySetInnerHTML={{ __html: `
        .create-page-wrap { width: 100%; max-width: 140rem; }
        .create-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .create-form-actions { grid-column: 1 / -1; }
        @media (min-width: 900px) {
          .create-form-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1.5rem;
            align-items: stretch;
          }
          .create-form-main { grid-column: 1; }
          .create-form-photos { grid-column: 2; }
          .create-form-optional { grid-column: 3; }
        }
      ` }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/admin/portfolio/carpentry" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            ← Back
          </Link>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: 0, fontWeight: '700' }}>
            Add a new project
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-form-grid">
        {error && (
          <div
            className="create-form-actions"
            style={{
              padding: '0.9rem 1.2rem',
              background: 'rgba(255,0,0,0.1)',
              border: '1px solid rgba(255,0,0,0.3)',
              borderRadius: '0.5rem',
              color: '#ff6b6b',
              fontSize: '1.4rem'
            }}
          >
            {error}
          </div>
        )}

        <section className="create-form-main" style={cardStyle}>
          <div style={stepNumStyle}>1</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: '600' }}>
            Project details
          </h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Project name</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              style={inputStyle}
              placeholder="e.g. Kitchen renovation"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Description <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(optional)</span></label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '6rem' }}
              placeholder="A few sentences..."
            />
          </div>
          <div>
            <label style={labelStyle}>Type of project</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))}
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="create-form-photos" style={cardStyle}>
          <div style={stepNumStyle}>2</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.4rem', fontWeight: '600' }}>
            Add photos
          </h2>
          <p style={hintStyle}>Drag here or click to choose.</p>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <ImageUploader compact value={form.images} onChange={(images) => setForm((f) => ({ ...f, images }))} />
          </div>
        </section>

        <section className="create-form-optional" style={cardStyle}>
          <div style={stepNumStyle}>3</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.4rem', fontWeight: '600' }}>
            Optional
          </h2>
          <p style={hintStyle}>Leave as-is if unsure.</p>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Order on page</label>
            <input
              type="number"
              min={0}
              value={form.displayOrder}
              onChange={(e) => setForm((f) => ({ ...f, displayOrder: Number(e.target.value) || 0 }))}
              style={inputStyle}
            />
            <p style={hintStyle}>0 = first.</p>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
            <input
              type="checkbox"
              id="carpentryFeatured"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
              style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer', flexShrink: 0 }}
            />
            <span>Show on homepage (featured)</span>
          </label>
        </section>

        <div
          className="create-form-actions"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            paddingTop: '0.5rem'
          }}
        >
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: loading ? 'var(--black-light)' : 'var(--yellow)',
              color: 'var(--black)',
              border: 'none',
              borderRadius: '0.6rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Saving...' : 'Save project'}
          </button>
          <Link href="/admin/portfolio/carpentry" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
