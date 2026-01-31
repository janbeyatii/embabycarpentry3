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
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Quote request submitted:', formData)
    alert('Thank you! We will contact you soon with a quote.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="quote-section" id="quote">
      <div className="container">
        <h1 className="heading heading-center" style={{ color: 'var(--white)', borderBottomColor: 'var(--yellow)' }}>
          Get a Free Quote
        </h1>
        <p className="subheading" style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '3rem' }}>
          Fill out the form below and our team will get back to you within 24 hours with a detailed estimate
        </p>

        <div className="quote-form">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  style={{ color: formData.projectType ? 'var(--black)' : 'var(--light-color)' }}
                >
                  <option value="">Project Type *</option>
                  <option value="new-construction">New Construction</option>
                  <option value="renovation">Renovation</option>
                  <option value="remodeling">Remodeling</option>
                  <option value="addition">Addition</option>
                  <option value="repair">Repair & Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  style={{ color: formData.budget ? 'var(--black)' : 'var(--light-color)' }}
                >
                  <option value="">Budget Range *</option>
                  <option value="under-25k">Under $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="over-250k">Over $250,000</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  style={{ color: formData.timeline ? 'var(--black)' : 'var(--light-color)' }}
                >
                  <option value="">Timeline *</option>
                  <option value="asap">As Soon As Possible</option>
                  <option value="1-3months">1-3 Months</option>
                  <option value="3-6months">3-6 Months</option>
                  <option value="6-12months">6-12 Months</option>
                  <option value="planning">Just Planning</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
              <i className="fas fa-paper-plane" style={{ marginRight: '1rem' }}></i>
              Request Free Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
