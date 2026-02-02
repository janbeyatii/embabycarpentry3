'use client'

import { useState } from 'react'

export default function QuoteRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone || undefined,
          projectType: formData.projectType || undefined,
          budgetRange: formData.budget || undefined,
          timeline: formData.timeline || undefined,
          message: formData.message || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to submit quote request. Please try again.')
        return
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
      })
    } catch {
      setStatus('error')
      setErrorMessage('Failed to submit. Please try again or contact us directly.')
    }
  }

  return (
    <section className="quote-section" id="quote">
      <div className="quote-section-inner">
        <h2 className="quote-section-title">Get a Free Quote</h2>
        <p className="quote-section-subtitle">
          Fill out the form below and our team will get back to you within 24 hours with a detailed estimate
        </p>

        <div className="quote-form-card">
          <form onSubmit={handleSubmit} className="quote-form">
            <div className="quote-form-grid">
              <div className="quote-form-field">
                <label htmlFor="quote-name">Your Name *</label>
                <input
                  id="quote-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="quote-form-field">
                <label htmlFor="quote-email">Your Email *</label>
                <input
                  id="quote-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="quote-form-field">
                <label htmlFor="quote-phone">Phone Number *</label>
                <input
                  id="quote-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="613-816-3764"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="quote-form-field">
                <label htmlFor="quote-project">Project Type *</label>
                <select
                  id="quote-project"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                >
                  <option value="">Select project type</option>
                  <option value="new-construction">New Construction</option>
                  <option value="renovation">Renovation</option>
                  <option value="remodeling">Remodeling</option>
                  <option value="addition">Addition</option>
                  <option value="repair">Repair & Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="quote-form-field">
                <label htmlFor="quote-budget">Budget Range *</label>
                <select
                  id="quote-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                >
                  <option value="">Select budget range</option>
                  <option value="under-25k">Under $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="over-250k">Over $250,000</option>
                </select>
              </div>
              <div className="quote-form-field">
                <label htmlFor="quote-timeline">Timeline *</label>
                <select
                  id="quote-timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                >
                  <option value="">Select timeline</option>
                  <option value="asap">As Soon As Possible</option>
                  <option value="1-3months">1-3 Months</option>
                  <option value="3-6months">3-6 Months</option>
                  <option value="6-12months">6-12 Months</option>
                  <option value="planning">Just Planning</option>
                </select>
              </div>
            </div>

            <div className="quote-form-field quote-form-field-full">
              <label htmlFor="quote-message">Tell us about your project</label>
              <textarea
                id="quote-message"
                name="message"
                placeholder="Describe your project, goals, and any specific requirements..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                disabled={status === 'sending'}
              />
            </div>

            {status === 'success' && (
              <p className="quote-form-success">
                <i className="fas fa-check-circle" /> Thank you! We&apos;ve received your request and will get back to you within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="quote-form-error">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="quote-form-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>Sending...</>
              ) : (
                <>
                  <i className="fas fa-paper-plane" /> Request Free Quote
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
