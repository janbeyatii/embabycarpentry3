'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type PortfolioImage = { name: string; url: string }

type Props = {
  title: string
  images: PortfolioImage[]
  thumbnailUrl?: string
  priority?: boolean
}

export default function PortfolioGallery(props: Props) {
  const { title, images, thumbnailUrl, priority = false } = props
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (open) {
      setCurrentIndex(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCurrentIndex((i) => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, images.length])

  if (images.length === 0) return null

  const thumb = thumbnailUrl || images[0].url
  const currentImg = images[currentIndex]

  const card = (
    <button
      type="button"
      className="portfolio-project-card"
      onClick={() => setOpen(true)}
    >
      <div className="portfolio-project-image-wrap">
        <Image
          src={thumb}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          style={{ objectFit: 'cover' }}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
            padding: '3rem 1.5rem 1.5rem',
          }}
        >
          <h3 style={{ fontSize: '1.8rem', color: 'var(--white)', margin: 0, fontWeight: 600 }}>
            {title}
          </h3>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', margin: '0.3rem 0 0' }}>
            {images.length} photo{images.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </button>
  )

  const modal = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={'Gallery: ' + title}
      onClick={() => setOpen(false)}
      className="portfolio-lightbox"
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close gallery"
        className="portfolio-lightbox-close"
      >
        X
      </button>
      <h3 className="portfolio-lightbox-title">{title}</h3>

      {/* Fullscreen image container */}
      <div
        className="portfolio-lightbox-image-area"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImg.url}
          alt={currentImg.name}
          className="portfolio-lightbox-img"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((i) => (i - 1 + images.length) % images.length)
            }}
            aria-label="Previous image"
            className="portfolio-lightbox-prev"
          >
            <i className="fas fa-chevron-left" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((i) => (i + 1) % images.length)
            }}
            aria-label="Next image"
            className="portfolio-lightbox-next"
          >
            <i className="fas fa-chevron-right" aria-hidden />
          </button>
          <span className="portfolio-lightbox-counter">
            {currentIndex + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  ) : null

  return (
    <div>
      {card}
      {modal}
    </div>
  )
}
