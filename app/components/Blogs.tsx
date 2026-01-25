'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'

export default function Blogs() {
  const blogs = [
    { img: '/images/blog-1.jpg' },
    { img: '/images/blog-2.jpg' },
    { img: '/images/blog-3.jpg' },
    { img: '/images/blog-4.jpg' },
    { img: '/images/blog-5.jpg' },
    { img: '/images/blog-6.jpg' },
  ]

  return (
    <section className="blogs" id="blogs">
      <h1 className="heading"> our blogs </h1>

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
        className="blogs-slider"
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="image">
              <Image src={blog.img} alt="blog" width={400} height={250} />
            </div>
            <div className="content">
              <h3>blog title goes here</h3>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, nobis!</p>
              <a href="#" className="btn">read more</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
