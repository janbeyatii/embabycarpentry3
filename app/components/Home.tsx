'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

const slides = [
  {
    src: '/images/home-slide-1.jpg',
    title: 'we provide best service',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur beatae iusto pariatur laborum magnam eos!'
  },
  {
    src: '/images/home-slide-2.jpg',
    title: 'making dream come to life',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur beatae iusto pariatur laborum magnam eos!'
  },
  {
    src: '/images/home-slide-3.jpg',
    title: 'from concept to creation',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur beatae iusto pariatur laborum magnam eos!'
  }
]

export default function Home() {
  const swiperRef = useRef<SwiperType>()

  return (
    <section className="home" id="home">
      <Swiper
        modules={[Navigation]}
        navigation={true}
        loop={true}
        grabCursor={true}
        className="home-slider"
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="slide">
            <img
              src={slide.src}
              alt=""
              className="slide-bg-img"
            />
            <div className="content">
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
              <a href="#about" className="btn">get started</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
