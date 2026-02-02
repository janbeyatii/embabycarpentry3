'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'

type Props = {
  beforeUrl: string
  afterUrl: string
  title: string
}

export default function BeforeAfterSlider({ beforeUrl, afterUrl, title }: Props) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const x = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
      updatePosition(x)
    }
    const handleEnd = () => {
      isDragging.current = false
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: true })
    window.addEventListener('touchend', handleEnd)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [updatePosition])

  return (
    <div
      ref={containerRef}
      className="before-after-slider"
      onMouseDown={(e) => {
        isDragging.current = true
        updatePosition(e.clientX)
      }}
      onTouchStart={(e) => {
        isDragging.current = true
        updatePosition(e.touches[0].clientX)
      }}
    >
      <div className="before-after-container">
        <div className="before-after-before">
          <Image src={beforeUrl} alt={`${title} - Before`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="before-after-after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={afterUrl} alt={`${title} - After`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="before-after-handle" style={{ left: `${position}%` }}>
          <div className="before-after-handle-line" />
          <div className="before-after-handle-circle">
            <i className="fas fa-arrows-alt-h" />
          </div>
        </div>
      </div>
      <div className="before-after-labels">
        <span className="before-after-label before-after-label-before">Before</span>
        <span className="before-after-label before-after-label-after">After</span>
      </div>
    </div>
  )
}
