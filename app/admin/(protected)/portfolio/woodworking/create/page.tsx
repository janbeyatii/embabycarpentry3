'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageUploader } from '../../../../components/ImageUploader'

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

export default function CreateWoodworkingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    description: '',
    dimensions: '',
    materials: '',
    images: [] as string[],
    isCustomBuild: false,
    isFeatured: false,
    displayOrder: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/portfolio/woodworking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim() || null,
          dimensions: form.dimensions.trim() || null,
          materials: form.materials.trim() || null,
          images: form.images,
          isCustomBuild: form.isCustomBuild,
          isFeatured: form.isFeatured,
          displayOrder: Number(form.displayOrder) || 0
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      router.push('/admin/portfolio/woodworking')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-wood-page-wrap">
      <style dangerouslySetInnerHTML={{ __html: `
        .create-wood-page-wrap { width: 100%; max-width: 140rem; }
        .create-wood-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .create-wood-form-actions { grid-column: 1 / -1; }
        @media (min-width: 900px) {
          .create-wood-form-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1.5rem;
            align-items: stretch;
          }
          .create-wood-form-main { grid-column: 1; }
          .create-wood-form-photos { grid-column: 2; }
          .create-wood-form-optional { grid-column: 3; }
        }
      ` }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/admin/portfolio/woodworking" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            ← Back
          </Link>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: 0, fontWeight: '700' }}>
            Add a new product
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-wood-form-grid">
        {error && (
          <div
            className="create-wood-form-actions"
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

        <section className="create-wood-form-main" style={cardStyle}>
          <div style={stepNumStyle}>1</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: '600' }}>
            Product details
          </h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Product name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={inputStyle}
              placeholder="e.g. Oak bookshelf"
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Dimensions <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(opt)</span></label>
              <input
                type="text"
                value={form.dimensions}
                onChange={(e) => setForm((f) => ({ ...f, dimensions: e.target.value }))}
                style={inputStyle}
                placeholder={'e.g. 24" x 72"'}
              />
            </div>
            <div>
              <label style={labelStyle}>Materials <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(opt)</span></label>
              <input
                type="text"
                value={form.materials}
                onChange={(e) => setForm((f) => ({ ...f, materials: e.target.value }))}
                style={inputStyle}
                placeholder="e.g. Oak"
              />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '1.35rem', color: 'var(--text-primary)' }}>
            <input
              type="checkbox"
              id="woodCustomBuild"
              checked={form.isCustomBuild}
              onChange={(e) => setForm((f) => ({ ...f, isCustomBuild: e.target.checked }))}
              style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer', flexShrink: 0 }}
            />
            <span>Custom / made-to-order item</span>
          </label>
        </section>

        <section className="create-wood-form-photos" style={cardStyle}>
          <div style={stepNumStyle}>2</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.4rem', fontWeight: '600' }}>
            Add photos
          </h2>
          <p style={hintStyle}>Drag here or click to choose.</p>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <ImageUploader compact value={form.images} onChange={(images) => setForm((f) => ({ ...f, images }))} />
          </div>
        </section>

        <section className="create-wood-form-optional" style={cardStyle}>
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
              id="woodFeatured"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
              style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer', flexShrink: 0 }}
            />
            <span>Show on homepage (featured)</span>
          </label>
        </section>

        <div
          className="create-wood-form-actions"
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
            {loading ? 'Saving...' : 'Save product'}
          </button>
          <Link href="/admin/portfolio/woodworking" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
