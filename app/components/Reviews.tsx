'use client'

import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Image from 'next/image'

import 'swiper/css'

const reviews = [
  {
    img: '/images/pic-1.png',
    name: 'Michael R.',
    stars: 5,
    timeAgo: '2 weeks ago',
    text: 'Excellent work on our kitchen renovation. Professional, on time, and the custom cabinets look amazing. Would definitely hire again.',
  },
  {
    img: '/images/pic-2.png',
    name: 'Sarah T.',
    stars: 5,
    timeAgo: '1 month ago',
    text: 'Had a deck built and some custom woodworking done. The team was great to work with and the quality exceeded our expectations.',
  },
  {
    img: '/images/pic-3.png',
    name: 'James K.',
    stars: 5,
    timeAgo: '3 weeks ago',
    text: 'From concept to creation—they really delivered. Our new built-ins look like they were always part of the house. Highly recommend.',
  },
  {
    img: '/images/pic-4.png',
    name: 'Lisa M.',
    stars: 5,
    timeAgo: '1 week ago',
    text: 'Responsive, skilled, and fair pricing. Finished our bathroom remodel ahead of schedule. Very happy with the results.',
  },
  {
    img: '/images/pic-5.png',
    name: 'David P.',
    stars: 5,
    timeAgo: '2 months ago',
    text: 'Professional carpentry and construction. They handled permits and kept the site clean. Our addition looks fantastic.',
  },
  {
    img: '/images/pic-6.png',
    name: 'Jennifer L.',
    stars: 5,
    timeAgo: '3 weeks ago',
    text: 'Custom woodworking for our home office. Beautiful craftsmanship and great communication throughout the project.',
  },
]

export default function Reviews() {
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      swiperRef.current?.autoplay?.start()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-header">
        <div className="reviews-header-left">
          <h1 className="heading reviews-heading">What our clients say</h1>
          <p className="reviews-subheading">Real reviews from real customers</p>
        </div>
        <div className="reviews-google-banner" aria-hidden>
          <span className="reviews-google-banner-logo">
            <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </span>
          <span className="reviews-google-banner-text">Google Reviews</span>
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        grabCursor={true}
        spaceBetween={24}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={600}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
        }}
        className="reviews-slider google-reviews-slider"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="google-review-card">
              <div className="google-review-header">
                <span className="google-badge" aria-hidden>
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </span>
                <div className="google-review-meta">
                  <Image
                    src={review.img}
                    alt=""
                    width={40}
                    height={40}
                    className="google-review-avatar"
                  />
                  <div>
                    <h3 className="google-review-name">{review.name}</h3>
                    <div className="google-review-stars" aria-label={`${review.stars} out of 5 stars`}>
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <span key={i} className="google-star" aria-hidden>★</span>
                      ))}
                    </div>
                    <span className="google-review-time">{review.timeAgo}</span>
                  </div>
                </div>
              </div>
              <p className="google-review-text">{review.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
