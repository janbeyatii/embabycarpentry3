'use client'

import { useState } from 'react'
import Image from 'next/image'

type PortfolioImage = { name: string; url: string }

type Props = {
  title: string
  images: PortfolioImage[]
  thumbnailUrl?: string
}

export default function PortfolioGallery(props: Props) {
  const { title, images, thumbnailUrl } = props
  const [open, setOpen] = useState(false)

  if (images.length === 0) return null

  const thumb = thumbnailUrl || images[0].url

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
          sizes="(max-width: 768px) 100vw, 32rem"
          style={{ objectFit: 'cover' }}
          unoptimized
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
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.95)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close gallery"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          border: '2px solid var(--gold)',
          background: 'transparent',
          color: 'var(--gold)',
          fontSize: '2.4rem',
          cursor: 'pointer',
          lineHeight: 1,
          zIndex: 1,
        }}
      >
        X
      </button>
      <h3
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          color: 'var(--white)',
          fontSize: '1.8rem',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <div
        style={{
          overflowY: 'auto',
          padding: '8rem 2rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '90rem',
        }}
      >
        {images.map((img) => (
          <div key={img.url} className="portfolio-modal-image-wrap">
            <Image
              src={img.url}
              alt={img.name}
              fill
              sizes="90rem"
              style={{ objectFit: 'contain' }}
              unoptimized
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null

  return (
    <div>
      {card}
      {modal}
    </div>
  )
}
