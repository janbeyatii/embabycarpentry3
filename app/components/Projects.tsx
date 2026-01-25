'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    lightGallery: any
  }
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined' && window.lightGallery) {
      window.lightGallery(containerRef.current, {
        selector: '.box',
      })
    }
  }, [])

  const projects = [
    { img: '/images/project-1.jpg', title: 'dream home', desc: 'construction, design' },
    { img: '/images/project-2.jpg', title: 'dream home', desc: 'construction, design' },
    { img: '/images/project-3.jpg', title: 'dream home', desc: 'construction, design' },
    { img: '/images/project-4.jpg', title: 'dream home', desc: 'construction, design' },
    { img: '/images/project-5.jpg', title: 'dream home', desc: 'construction, design' },
    { img: '/images/project-6.jpg', title: 'dream home', desc: 'construction, design' },
  ]

  return (
    <section className="projects" id="projects">
      <h1 className="heading"> our projects </h1>

      <div className="box-container" ref={containerRef}>
        {projects.map((project, index) => (
          <a key={index} href={project.img} className="box">
            <div className="image">
              <Image src={project.img} alt={project.title} width={500} height={400} />
            </div>
            <div className="content">
              <div className="info">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
              <i className="fas fa-plus"></i>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
