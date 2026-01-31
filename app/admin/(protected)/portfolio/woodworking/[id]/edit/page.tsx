'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ImageUploader } from '../../../../../components/ImageUploader'

const sectionStyle = { marginBottom: '2.5rem' }
const labelStyle = { display: 'block', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }
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

export default function EditWoodworkingPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState<{
    name: string
    description: string
    dimensions: string
    materials: string
    images: string[]
    isCustomBuild: boolean
    isFeatured: boolean
    displayOrder: number
  } | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/admin/portfolio/woodworking/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((item) => {
        setForm({
          name: item.name || '',
          description: item.description || '',
          dimensions: item.dimensions || '',
          materials: item.materials || '',
          images: Array.isArray(item.images) ? item.images : [],
          isCustomBuild: item.is_custom_build ?? false,
          isFeatured: item.is_featured ?? false,
          displayOrder: item.display_order ?? 0
        })
      })
      .catch(() => setLoadError('Could not load this product.'))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form || !id) return
    setSubmitError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/portfolio/woodworking/${id}`, {
        method: 'PUT',
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
      setSubmitError(err instanceof Error ? err.message : 'Could not save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loadError) {
    return (
      <div>
        <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{loadError}</p>
        <Link href="/admin/portfolio/woodworking" style={{ color: 'var(--yellow)', fontSize: '1.5rem' }}>← Back to woodworking products</Link>
      </div>
    )
  }

  if (!form) {
    return <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)' }}>Loading...</p>
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/portfolio/woodworking" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
          ← Back to woodworking products
        </Link>
      </div>
      <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        Edit product
      </h1>
      <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Update the details below. You can add or remove photos.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '56rem' }}>
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

        <section style={sectionStyle}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Basic info</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Product name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f!, name: e.target.value }))}
              style={inputStyle}
              placeholder="e.g. Oak bookshelf"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Short description (optional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f!, description: e.target.value }))}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="A few sentences about this product..."
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Dimensions (optional)</label>
              <input
                type="text"
                value={form.dimensions}
                onChange={(e) => setForm((f) => ({ ...f!, dimensions: e.target.value }))}
                style={inputStyle}
                placeholder={'e.g. 24" W x 72" H'}
              />
            </div>
            <div>
              <label style={labelStyle}>Materials (optional)</label>
              <input
                type="text"
                value={form.materials}
                onChange={(e) => setForm((f) => ({ ...f!, materials: e.target.value }))}
                style={inputStyle}
                placeholder="e.g. Oak, walnut"
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <input
              type="checkbox"
              id="woodEditCustomBuild"
              checked={form.isCustomBuild}
              onChange={(e) => setForm((f) => ({ ...f!, isCustomBuild: e.target.checked }))}
              style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer' }}
            />
            <label htmlFor="woodEditCustomBuild" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
              This is a custom / made-to-order item
            </label>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Photos</h2>
          <ImageUploader value={form.images} onChange={(images) => setForm((f) => ({ ...f!, images }))} />
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Display options</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Order on page (lower number = shown first)</label>
            <input
              type="number"
              min={0}
              value={form.displayOrder}
              onChange={(e) => setForm((f) => ({ ...f!, displayOrder: Number(e.target.value) || 0 }))}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <input
              type="checkbox"
              id="woodEditFeatured"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f!, isFeatured: e.target.checked }))}
              style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer' }}
            />
            <label htmlFor="woodEditFeatured" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
              Show on homepage (featured)
            </label>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
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
          <Link
            href="/admin/portfolio/woodworking"
            style={{
              padding: '1rem 2rem',
              background: 'var(--black)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.5rem',
              border: 'var(--border)'
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
