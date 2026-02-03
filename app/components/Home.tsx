'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CROSSFADE_DURATION_MS = 2000

type Props = {
  slideshowImages?: string[]
}

export default function Home({ slideshowImages = [] }: Props) {
  const [visibleSlot, setVisibleSlot] = useState(0)
  const [indices, setIndices] = useState({ slide0: 0, slide1: 0 })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flippedToRef = useRef(0)

  const fallbackSrc = '/images/service-1.webp'
  const urls = slideshowImages.length > 0 ? slideshowImages : [fallbackSrc]
  const n = urls.length

  useEffect(() => {
    if (n < 2) return
    setIndices((prev) => ({ ...prev, slide1: 1 % n }))
  }, [n])

  useEffect(() => {
    if (n < 2) return
    const interval = setInterval(() => {
      setVisibleSlot((v) => {
        const next = 1 - v
        flippedToRef.current = next
        return next
      })
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        const showingSlot = flippedToRef.current
        setIndices((prev) => {
          if (showingSlot === 0) {
            return { ...prev, slide1: (prev.slide0 + 1) % n }
          }
          return { ...prev, slide0: (prev.slide1 + 1) % n }
        })
        timeoutRef.current = null
      }, CROSSFADE_DURATION_MS)
    }, 4000)
    return () => {
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [n])

  const slot0Src = urls[indices.slide0 % n]
  const slot1Src = urls[indices.slide1 % n]

  return (
    <section className="home home-static" id="home">
      <div className="hero-bg hero-bg-slideshow">
        {urls.length > 0 && (
          <>
            <div
              key="slide-0"
              className={`hero-bg-slide ${visibleSlot === 0 ? 'hero-bg-slide--active' : ''}`}
              aria-hidden={visibleSlot !== 0}
            >
              <Image
                src={slot0Src}
                alt="Ottawa construction and renovation projects by Embaby Carpentry"
                fill
                className="hero-bg-img"
                sizes="100vw"
                priority
              />
            </div>
            {urls.length > 1 && (
              <div
                key="slide-1"
                className={`hero-bg-slide ${visibleSlot === 1 ? 'hero-bg-slide--active' : ''}`}
                aria-hidden={visibleSlot !== 1}
              >
                <Image
                  src={slot1Src}
                  alt="Ottawa carpentry and renovation work - Embaby Carpentry portfolio"
                  fill
                  className="hero-bg-img"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </>
        )}
        <div className="hero-overlay" aria-hidden />
      </div>
      <div className="hero-content">
        <p className="hero-subtitle" aria-hidden>Since 2019</p>
        <h1 className="hero-headline">
          We offer Construction Services for Residential or Commercial use.
        </h1>
        <div className="hero-ctas">
          <a href="#services" className="btn hero-btn-primary">
            Our Services
          </a>
          <Link href="/woodworking" className="btn hero-btn-woodworking">
            <i className="fas fa-hammer" aria-hidden />
            Custom Woodworking
          </Link>
          <a href="tel:+16138163764" className="hero-phone-box">
            <i className="fas fa-phone" aria-hidden />
            <span>+1 (613) 816-3764</span>
          </a>
        </div>
      </div>
    </section>
  )
}
