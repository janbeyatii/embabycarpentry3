'use client'

import { useRef, useState, useEffect } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface AnimateInProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
}

const IO_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -6% 0px',
  threshold: 0,
}

export default function AnimateIn({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, IO_OPTIONS)
    observer.observe(el)
    // Fallback: if already in view on mount (e.g. above fold), show immediately
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const winH = typeof window !== 'undefined' ? window.innerHeight : 0
      if (rect.top < winH * 0.95) setInView(true)
    })
    return () => {
      cancelAnimationFrame(raf)
      observer.unobserve(el)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`animate-in ${inView ? 'animate-in--visible' : ''} ${className}`.trim()}
      data-direction={direction}
      data-delay={delay}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
