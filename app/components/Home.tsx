'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  slideshowImages?: string[]
}

export default function Home({ slideshowImages = [] }: Props) {
  const [index, setIndex] = useState(0)
  const [visibleSlot, setVisibleSlot] = useState(0)

  useEffect(() => {
    if (slideshowImages.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slideshowImages.length)
      setVisibleSlot((v) => 1 - v)
    }, 4000)
    return () => clearInterval(timer)
  }, [slideshowImages.length])

  const fallbackSrc = '/images/service-1.webp'
  const urls = slideshowImages.length > 0 ? slideshowImages : [fallbackSrc]
  const n = urls.length
  const slot0Src = visibleSlot === 0 ? urls[index % n] : urls[(index + 1) % n]
  const slot1Src = visibleSlot === 1 ? urls[index % n] : urls[(index + 1) % n]

  return (
    <section className="home home-static" id="home">
      <div className="hero-bg hero-bg-slideshow">
        {urls.length > 0 && (
          <>
            <div className={`hero-bg-slide ${visibleSlot === 0 ? 'hero-bg-slide--active' : ''}`}>
              <Image
                src={slot0Src}
                alt="Ottawa construction and renovation projects by Embaby Carpentry"
                fill
                className="hero-bg-img"
                sizes="100vw"
              />
            </div>
            {urls.length > 1 && (
              <div className={`hero-bg-slide ${visibleSlot === 1 ? 'hero-bg-slide--active' : ''}`}>
                <Image
                  src={slot1Src}
                  alt="Ottawa carpentry and renovation work - Embaby Carpentry portfolio"
                  fill
                  className="hero-bg-img"
                  sizes="100vw"
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
