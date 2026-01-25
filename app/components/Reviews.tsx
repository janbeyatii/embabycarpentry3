'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'

export default function Reviews() {
  const reviews = [
    { img: '/images/pic-1.png', name: 'john deo' },
    { img: '/images/pic-2.png', name: 'john deo' },
    { img: '/images/pic-3.png', name: 'john deo' },
    { img: '/images/pic-4.png', name: 'john deo' },
    { img: '/images/pic-5.png', name: 'john deo' },
    { img: '/images/pic-6.png', name: 'john deo' },
  ]

  return (
    <section className="reviews">
      <h1 className="heading"> clients reviews </h1>

      <Swiper
        modules={[Navigation]}
        loop={true}
        grabCursor={true}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 3,
          },
        }}
        className="reviews-slider"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="slide">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis unde suscipit quis consequuntur, tempora corporis ex molestias dignissimos in cumque sunt ducimus voluptate inventore harum earum rem aperiam vel modi?</p>
            <div className="user">
              <Image src={review.img} alt={review.name} width={70} height={70} />
              <div className="info">
                <h3>{review.name}</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
