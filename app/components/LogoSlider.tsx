'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'

export default function LogoSlider() {
  const logos = [
    '/images/client-logo-1.png',
    '/images/client-logo-2.png',
    '/images/client-logo-3.png',
    '/images/client-logo-4.png',
    '/images/client-logo-5.png',
    '/images/client-logo-6.png',
  ]

  return (
    <section className="logo-container">
      <Swiper
        modules={[Navigation]}
        loop={true}
        grabCursor={true}
        spaceBetween={20}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
        }}
        className="logo-slider"
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index} className="slide">
            <Image src={logo} alt={`client logo ${index + 1}`} width={150} height={100} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
