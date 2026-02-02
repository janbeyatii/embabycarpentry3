'use client'

import { useState } from 'react'

export default function ContactFormInline() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone') || undefined,
          inquiry: formData.get('inquiry') || 'General',
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
      setErrorMessage('Failed to send message. Please try again or contact us directly.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>get in touch</h3>
      <input type="text" name="name" placeholder="name" className="box" required minLength={2} pattern="[A-Za-z\s\-']+" title="Please enter a valid name" disabled={status === 'sending'} />
      <input type="email" name="email" placeholder="email" className="box" required title="Please enter a valid email address" disabled={status === 'sending'} />
      <input type="tel" name="phone" placeholder="phone (e.g. 613-816-3764)" className="box" required pattern="[\d\s\-\.\(\)\+]{10,20}" title="Please enter a valid phone number" disabled={status === 'sending'} />
      <input type="hidden" name="inquiry" value="General" />
      <textarea name="message" placeholder="message" className="box" cols={30} rows={10} required minLength={10} title="Please enter at least 10 characters" disabled={status === 'sending'} />
      {status === 'success' && <p style={{ color: 'var(--gold)', fontSize: '1.5rem', marginTop: '1rem' }}>Thank you! Your message has been sent.</p>}
      {status === 'error' && <p style={{ color: '#e57373', fontSize: '1.5rem', marginTop: '1rem' }}>{errorMessage}</p>}
      <input type="submit" value={status === 'sending' ? 'Sending...' : 'send message'} className="btn" disabled={status === 'sending'} />
    </form>
  )
}
