'use client'

import { useState, useEffect, useRef } from 'react'
import PortfolioGallery from './PortfolioGallery'

type PortfolioImage = { name: string; url: string }

type Props = {
  title: string
  images: PortfolioImage[]
  thumbnailUrl?: string
  priority?: boolean
}

export default function LazyPortfolioCard(props: Props) {
  const { priority, ...galleryProps } = props
  const [visible, setVisible] = useState(!!priority)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || visible) return
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true)
      },
      { rootMargin: '200px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [priority, visible])

  return (
    <div ref={rootRef} className="portfolio-card-slot" style={{ minHeight: 0 }}>
      {visible ? (
        <PortfolioGallery {...galleryProps} priority={priority} />
      ) : (
        <div
          className="portfolio-project-card portfolio-card-placeholder"
          aria-hidden
          style={{ aspectRatio: '4/3', background: 'var(--black-light)' }}
        />
      )}
    </div>
  )
}
