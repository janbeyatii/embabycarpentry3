'use client'

import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/faq-data'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const faqs = FAQ_ITEMS

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq" id="faq">
      <h1 className="heading heading-center">Frequently Asked Questions</h1>
      <p className="subheading" style={{ textAlign: 'center', maxWidth: '60rem', margin: '0 auto 4rem' }}>
        Find answers to common questions about our construction services
      </p>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              <div className="faq-answer-content">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
