'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'

const BLOGS = [
  {
    slug: 'kitchen-renovation-costs-ottawa-2026',
    title: 'Kitchen Renovation Costs in Ottawa: What to Expect in 2026',
    excerpt: 'Average price ranges, cost factors, and how to budget for your Ottawa kitchen remodel.',
    img: '/images/blog-1.jpg',
  },
  {
    slug: 'choose-right-contractor-ottawa',
    title: 'How to Choose the Right Contractor in Ottawa',
    excerpt: 'Licensing, insurance, red flags, and questions to ask before hiring.',
    img: '/images/blog-2.jpg',
  },
  {
    slug: 'custom-carpentry-vs-prefab-ottawa',
    title: 'Custom Carpentry vs Prefab: Which Is Better for Ottawa Homes?',
    excerpt: 'Compare durability, fit, resale value, and long-term cost.',
    img: '/images/blog-3.jpg',
  },
]

export default function Blogs() {
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
        {BLOGS.map((blog) => (
          <SwiperSlide key={blog.slug} className="slide">
            <Link href={`/blog/${blog.slug}`} className="image">
              <Image src={blog.img} alt={blog.title} width={400} height={250} />
            </Link>
            <div className="content">
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <Link href={`/blog/${blog.slug}`} className="btn">read more</Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
