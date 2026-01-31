'use client'

import { useEffect, useState } from 'react'

interface Offer {
  id: string
  title: string
  description: string | null
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  code: string | null
}

export default function OffersBanner() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/offers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOffers(data)
        }
      })
      .catch(err => console.error('Error fetching offers:', err))
  }, [])

  useEffect(() => {
    if (offers.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [offers.length])

  if (offers.length === 0) return null

  const currentOffer = offers[currentIndex]

  return (
    <div style={{
      background: 'var(--gradient-primary)',
      padding: '0.75rem 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: 'var(--black)'
        }}>
          {currentOffer.title}
        </div>
        {currentOffer.description && (
          <div style={{
            fontSize: '1.4rem',
            color: 'var(--black)',
            opacity: 0.9
          }}>
            {currentOffer.description}
          </div>
        )}
        {currentOffer.code && (
          <div style={{
            padding: '0.5rem 1.5rem',
            background: 'var(--black)',
            color: 'var(--yellow)',
            borderRadius: '0.5rem',
            fontSize: '1.4rem',
            fontWeight: '600'
          }}>
            Code: {currentOffer.code}
          </div>
        )}
        <div style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: 'var(--black)'
        }}>
          {currentOffer.discount_type === 'percentage' 
            ? `${currentOffer.discount_value}% OFF`
            : `$${currentOffer.discount_value} OFF`
          }
        </div>
      </div>
      
      {offers.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? 'var(--black)' : 'rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
