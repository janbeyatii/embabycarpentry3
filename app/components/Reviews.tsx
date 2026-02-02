'use client'

import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'

const reviews = [
  {
    name: 'Hazem Mehrez',
    stars: 5,
    text: 'Omar from Embaby Carpentry built me an amazing custom 8x10 shed, and I couldn\'t be happier with how it turned out! He went above and beyond to make sure everything was perfect—super friendly, easy to talk to, and really knows his craft.',
  },
  {
    name: 'Agnes Okot',
    stars: 5,
    text: 'I can\'t recommend Omar enough. He did a fantastic job at my home, very professional at all times, cleaned up after himself and kept me fully informed on every step of the way. I will definitely be recommending him to my family and friends. I will be using him for many other projects in my home. Thank you so much Omar. Fabulous work.',
  },
  {
    name: 'Mostafa Youssef',
    stars: 5,
    text: 'Omar did an exceptional job building our deck! From start to finish, his professionalism, attention to detail, and on-time delivery exceeded our expectations. The craftsmanship is outstanding, and the project stayed within budget.',
  },
  {
    name: 'Donna Anderton',
    stars: 5,
    text: 'Omar came and did an amazing job of taking our tired old deck apart and replacing it with a very beautiful new deck very efficiently and we could not be happier with results.',
  },
  {
    name: 'Sara Maxx',
    stars: 5,
    text: 'We hired Omar from Embaby Carpentry to build a custom 10x12 shed for our backyard. Passionate about his work and thorough in the details, we could not be happier with the end result.',
  },
  {
    name: 'David M',
    stars: 5,
    text: 'Thanks to Omar for all his talent and hard work. He designed and made us a fantastic new deck, and went the extra mile for us. Omar is great!',
  },
  {
    name: '613 Equipment Rentals',
    stars: 5,
    text: 'Omar from Embaby Carpentry rented one of my excavators and hired me to assist with the excavation of some deck footings for one of his projects. Omar was great to deal with, very responsive, professional and communicated clearly.',
  },
  {
    name: 'Debra Tompkins',
    stars: 5,
    text: '3 fantastic projects completed! Love the results.',
  },
  {
    name: 'Mohanad Mashaly',
    stars: 5,
    text: 'Omar did a good job parging our stairs to give it a better finish. He puts lots of effort into work quality for great results and finish. Unlike other people we got he doesn\'t take his sweet time to finish—he managed to make everything within the estimated time with the quality we were looking for!',
  },
  {
    name: 'Ghazi Elrassoul',
    stars: 5,
    text: 'Great experience with Embaby Carpentry and Renovations. Omar was very professional, helpful, and easy to work with. He helped us when we moved to a new home to organize our garage storage, set up furniture, and build an interlock.',
  },
  {
    name: 'Ryaa Awad',
    stars: 5,
    text: 'I had a fantastic experience working with Embaby Carpentry. The team was incredibly friendly and always went above and beyond to ensure I was happy with their work. They built me a beautiful shed and were very accommodating throughout the process.',
  },
  {
    name: 'Omar Fekry',
    stars: 5,
    text: 'Omar did a very good job with his vinyl flooring installation. Professional, precise, and the results are fantastic. Highly recommended!',
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
        <div className="reviews-google-badge" aria-label="5 out of 5 stars on Google">
          <span className="reviews-google-badge-logo">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </span>
          <div className="reviews-google-badge-content">
            <span className="reviews-google-badge-title">Google</span>
            <div className="reviews-google-badge-stars">
              <span className="reviews-google-star" aria-hidden>★</span>
              <span className="reviews-google-star" aria-hidden>★</span>
              <span className="reviews-google-star" aria-hidden>★</span>
              <span className="reviews-google-star" aria-hidden>★</span>
              <span className="reviews-google-star" aria-hidden>★</span>
              <span className="reviews-google-badge-rating">5.0</span>
            </div>
          </div>
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
                  <h3 className="google-review-name">{review.name}</h3>
                  <div className="google-review-stars" aria-label={`${review.stars} out of 5 stars`}>
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <span key={i} className="google-star" aria-hidden>★</span>
                    ))}
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
