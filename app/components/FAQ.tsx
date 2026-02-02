'use client'

import { useState } from 'react'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How long does a typical construction project take?',
      answer: 'Project timelines vary based on scope and complexity. A small renovation might take 2-4 weeks, while a new construction project can take 3-6 months. We provide detailed timelines during the initial consultation and keep you updated throughout the process.'
    },
    {
      question: 'Do you provide free estimates?',
      answer: 'Yes! We offer free, no-obligation estimates for all projects. Our team will visit your site, discuss your needs, and provide a detailed quote within 24-48 hours.'
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Absolutely. We are fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers\' compensation to protect you and our team throughout the project.'
    },
    {
      question: 'What types of construction projects do you handle?',
      answer: 'We handle a wide range of projects including new construction, renovations, additions, remodeling, repairs, and maintenance. From residential homes to commercial buildings, we have the expertise to deliver quality results.'
    },
    {
      question: 'Do you work with architects and designers?',
      answer: 'Yes, we regularly collaborate with architects, designers, and engineers. We can work with your existing team or recommend trusted professionals to ensure your project meets all design and structural requirements.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including cash, checks, and major credit cards. Payment schedules are typically structured with an initial deposit, progress payments, and final payment upon completion.'
    },
    {
      question: 'How do you handle permits and inspections?',
      answer: 'We handle all necessary permits and coordinate with local building departments for inspections. Our team is familiar with local codes and regulations to ensure your project is fully compliant.'
    }
  ]

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
