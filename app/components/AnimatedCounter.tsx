'use client'

import { useState, useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  label: string
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '',
  prefix = '',
  label 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(startValue + (end - startValue) * easeOutQuart)
      
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div 
      ref={counterRef}
      className="stat-item"
      style={{
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <div className="number" style={{
        fontSize: '5rem',
        fontWeight: '800',
        color: 'var(--yellow)',
        display: 'block',
        marginBottom: '1rem',
        lineHeight: '1'
      }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="label" style={{
        fontSize: '1.6rem',
        color: 'var(--text-primary)',
        textTransform: 'uppercase',
        letterSpacing: '0.1rem'
      }}>
        {label}
      </div>
    </div>
  )
}
