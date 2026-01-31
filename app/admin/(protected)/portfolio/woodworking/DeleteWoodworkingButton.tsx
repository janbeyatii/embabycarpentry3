'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteWoodworkingButton({ itemId }: { itemId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/portfolio/woodworking/${itemId}`, { method: 'DELETE' })
      if (res.ok) router.refresh()
      else alert('Failed to delete')
    } catch {
      alert('Failed to delete')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      style={{
        padding: '0.8rem 1.5rem',
        background: 'var(--black)',
        color: 'var(--text-primary)',
        border: 'var(--border)',
        borderRadius: '0.5rem',
        fontSize: '1.4rem',
        fontWeight: '600',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1
      }}
    >
      {loading ? 'Deleting…' : 'Delete'}
    </button>
  )
}
