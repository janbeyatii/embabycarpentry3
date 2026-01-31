'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ImageUploader } from '../../../../../components/ImageUploader'

const CATEGORIES = [
  { value: 'kitchens', label: 'Kitchens' },
  { value: 'bath', label: 'Bathrooms' },
  { value: 'basement', label: 'Basements' },
  { value: 'deck-fences', label: 'Decks & Fences' },
  { value: 'sheds', label: 'Sheds'
}] as const

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

export default function EditCarpentryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState<{
    title: string
    description: string
    category: (typeof CATEGORIES)[number]['value']
    images: string[]
    isFeatured: boolean
    displayOrder: number
  } | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/admin/portfolio/carpentry/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Project not found')
        return res.json()
      })
      .then((item) => {
        setForm({
          title: item.title || '',
          description: item.description || '',
          category: item.category || 'kitchens',
          images: Array.isArray(item.images) ? item.images : [],
          isFeatured: item.is_featured ?? false,
          displayOrder: item.display_order ?? 0
        })
      })
      .catch(() => setLoadError('Could not load this project.'))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form || !id) return
    setSubmitError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/portfolio/carpentry/${id}`, {
        method: 'PUT',
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
      setSubmitError(err instanceof Error ? err.message : 'Could not save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loadError) {
    return (
      <div>
        <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{loadError}</p>
        <Link href="/admin/portfolio/carpentry" style={{ color: 'var(--yellow)', fontSize: '1.5rem' }}>← Back to carpentry projects</Link>
      </div>
    )
  }

  if (!form) {
    return <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)' }}>Loading…</p>
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/portfolio/carpentry" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
          ← Back to carpentry projects
        </Link>
      </div>
      <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        Edit project
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
            <label style={labelStyle}>Project name *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f!, title: e.target.value }))}
              style={inputStyle}
              placeholder="e.g. Kitchen renovation"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Short description (optional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f!, description: e.target.value }))}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="A few sentences about this project..."
            />
          </div>
          <div>
            <label style={labelStyle}>Type of project *</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f!, category: e.target.value as typeof form.category }))}
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
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
              id="carpentryEditFeatured"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f!, isFeatured: e.target.checked }))}
              style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer' }}
            />
            <label htmlFor="carpentryEditFeatured" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
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
            {loading ? 'Saving…' : 'Save changes'}
          </button>
          <Link
            href="/admin/portfolio/carpentry"
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
