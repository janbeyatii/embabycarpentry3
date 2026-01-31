'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WoodworkingInquiryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    isCustomBuild: true,
    customBuildDescription: '',
    deliveryType: 'pickup',
    deliveryAddress: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/woodworking/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to submit inquiry')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/woodworking')
      }, 3000)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
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
          border: 'var(--border)',
          textAlign: 'center',
          maxWidth: '50rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            color: 'var(--yellow)',
            marginBottom: '2rem'
          }}>
            Thank You!
          </h1>
          <p style={{
            fontSize: '1.8rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Your inquiry has been submitted successfully.
          </p>
          <p style={{
            fontSize: '1.4rem',
            color: 'var(--text-secondary)'
          }}>
            We'll get back to you within 24-48 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <section style={{
      padding: '8rem 10% 5rem',
      background: 'var(--black)',
      minHeight: '100vh'
    }}>
      <h1 className="heading heading-center" style={{
        color: 'var(--text-primary)',
        marginBottom: '2rem'
      }}>
        Woodworking Inquiry
      </h1>

      <div style={{
        maxWidth: '60rem',
        margin: '0 auto',
        background: 'var(--black-light)',
        padding: '3rem',
        borderRadius: '1rem',
        border: 'var(--border)'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Name *
            </label>
            <input
              type="text"
              name="customerName"
              autoComplete="name"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'var(--black)',
                border: 'var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1.6rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Email *
            </label>
            <input
              type="email"
              name="customerEmail"
              autoComplete="email"
              required
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'var(--black)',
                border: 'var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1.6rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Phone
            </label>
            <input
              type="tel"
              name="customerPhone"
              autoComplete="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'var(--black)',
                border: 'var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1.6rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Custom Build Description *
            </label>
            <textarea
              required
              rows={6}
              value={formData.customBuildDescription}
              onChange={(e) => setFormData({ ...formData, customBuildDescription: e.target.value })}
              placeholder="Describe what you'd like us to build..."
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'var(--black)',
                border: 'var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1.6rem',
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Delivery Type
            </label>
            <select
              value={formData.deliveryType}
              onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'var(--black)',
                border: 'var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1.6rem',
                color: 'var(--text-primary)'
              }}
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          {formData.deliveryType === 'delivery' && (
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1.6rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Delivery Address
              </label>
              <textarea
                rows={3}
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'var(--black)',
                  border: 'var(--border)',
                  borderRadius: '0.5rem',
                  fontSize: '1.6rem',
                  color: 'var(--text-primary)',
                  resize: 'vertical'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Additional Message
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'var(--black)',
                border: 'var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1.6rem',
                color: 'var(--text-primary)',
                resize: 'vertical'
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
            className="btn"
            style={{
              width: '100%',
              fontSize: '1.8rem',
              padding: '1.5rem'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </section>
  )
}
