'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Authentication failed')
        return
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--black)',
      padding: '2rem'
    }}>
      <div style={{
        background: 'var(--black-light)',
        padding: '4rem',
        borderRadius: '1rem',
        boxShadow: 'var(--box-shadow-xl)',
        border: 'var(--border)',
        maxWidth: '40rem',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Admin Login
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Enter your password to access the admin dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'var(--black)',
                border: 'var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1.6rem',
                color: 'var(--text-primary)',
                transition: 'var(--transition)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--yellow)'
                e.target.style.boxShadow = '0 0 0 3px rgba(245, 191, 35, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'transparent'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '0.5rem',
              color: '#ff6b6b',
              marginBottom: '2rem',
              fontSize: '1.4rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.5rem',
              background: loading ? 'var(--black-light)' : 'var(--yellow)',
              color: 'var(--black)',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.7rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'var(--transition)',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = 'var(--box-shadow-lg)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
