'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

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
        <SwiperSlide className="slide" style={{ background: 'url(/images/home-slide-1.jpg) no-repeat' }}>
          <div className="content">
            <h3>we provide best service</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur beatae iusto pariatur laborum magnam eos!</p>
            <a href="#about" className="btn">get started</a>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide" style={{ background: 'url(/images/home-slide-2.jpg) no-repeat' }}>
          <div className="content">
            <h3>making dream come to life</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur beatae iusto pariatur laborum magnam eos!</p>
            <a href="#about" className="btn">get started</a>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide" style={{ background: 'url(/images/home-slide-3.jpg) no-repeat' }}>
          <div className="content">
            <h3>from concept to creation</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur beatae iusto pariatur laborum magnam eos!</p>
            <a href="#about" className="btn">get started</a>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
