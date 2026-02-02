'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.get('name'),
          customerEmail: formData.get('email'),
          customerPhone: formData.get('phone') || undefined,
          projectType: formData.get('projectType') || undefined,
          budgetRange: formData.get('budget') || undefined,
          timeline: formData.get('timeline') || undefined,
          message: formData.get('message') || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Failed to send. Please try again or contact us directly.')
    }
  }

  return (
    <form className="contact-page-form" onSubmit={handleSubmit}>
      <div className="contact-page-form-row">
        <div className="contact-page-form-field">
          <label htmlFor="contact-name">Your Name *</label>
          <input id="contact-name" type="text" name="name" placeholder="Full Name" required minLength={2} pattern="[A-Za-z\s\-']+" title="Please enter a valid name" disabled={status === 'sending'} />
        </div>
        <div className="contact-page-form-field">
          <label htmlFor="contact-email">Your Email *</label>
          <input id="contact-email" type="email" name="email" placeholder="Email Address" required title="Please enter a valid email address" disabled={status === 'sending'} />
        </div>
      </div>
      <div className="contact-page-form-row">
        <div className="contact-page-form-field">
          <label htmlFor="contact-phone">Phone Number *</label>
          <input id="contact-phone" type="tel" name="phone" placeholder="613-816-3764" required pattern="[\d\s\-\.\(\)\+]{10,20}" title="Please enter a valid phone number" disabled={status === 'sending'} />
        </div>
        <div className="contact-page-form-field">
          <label htmlFor="contact-project">Project Type *</label>
          <select id="contact-project" name="projectType" required disabled={status === 'sending'}>
            <option value="">Select project type</option>
            <option value="new-construction">New Construction</option>
            <option value="renovation">Renovation</option>
            <option value="remodeling">Remodeling</option>
            <option value="addition">Addition</option>
            <option value="repair">Repair & Maintenance</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="contact-page-form-row">
        <div className="contact-page-form-field">
          <label htmlFor="contact-budget">Budget Range *</label>
          <select id="contact-budget" name="budget" required disabled={status === 'sending'}>
            <option value="">Select budget range</option>
            <option value="under-25k">Under $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-250k">$100,000 - $250,000</option>
            <option value="over-250k">Over $250,000</option>
          </select>
        </div>
        <div className="contact-page-form-field">
          <label htmlFor="contact-timeline">Timeline *</label>
          <select id="contact-timeline" name="timeline" required disabled={status === 'sending'}>
            <option value="">Select timeline</option>
            <option value="asap">As Soon As Possible</option>
            <option value="1-3months">1-3 Months</option>
            <option value="3-6months">3-6 Months</option>
            <option value="6-12months">6-12 Months</option>
            <option value="planning">Just Planning</option>
          </select>
        </div>
      </div>
      <div className="contact-page-form-field contact-page-form-field-full">
        <label htmlFor="contact-message">Tell us about your project</label>
        <textarea id="contact-message" name="message" placeholder="Describe your project, goals, and any specific requirements..." rows={6} required minLength={10} title="Please enter at least 10 characters" disabled={status === 'sending'} />
      </div>

      {status === 'success' && (
        <p className="contact-form-success">Thank you! We&apos;ve received your quote request and will get back to you within 24 hours.</p>
      )}
      {status === 'error' && (
        <p className="contact-form-error">{errorMessage}</p>
      )}

      <button type="submit" className="contact-page-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'SENDING...' : 'REQUEST FREE QUOTE'}
      </button>
    </form>
  )
}
