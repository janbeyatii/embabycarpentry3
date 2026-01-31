'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    lightGallery: any
  }
}

interface Project {
  id: string
  title: string
  description: string | null
  images: string[]
  category: string
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolio/carpentry')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching projects:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined' && window.lightGallery && projects.length > 0) {
      window.lightGallery(containerRef.current, {
        selector: '.box',
      })
    }
  }, [projects])

  if (loading) {
    return (
      <section className="projects" id="projects">
        <h1 className="heading"> our projects </h1>
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          Loading projects...
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="projects" id="projects">
        <h1 className="heading"> our projects </h1>
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          No projects available at the moment.
        </div>
      </section>
    )
  }

  return (
    <section className="projects" id="projects">
      <h1 className="heading"> our projects </h1>

      <div className="box-container" ref={containerRef}>
        {projects.map((project) => {
          const firstImage = project.images && project.images.length > 0 
            ? project.images[0] 
            : '/images/project-1.jpg'
          
          return (
            <a key={project.id} href={firstImage} className="box">
              <div className="image">
                <Image src={firstImage} alt={project.title} width={500} height={400} />
              </div>
              <div className="content">
                <div className="info">
                  <h3>{project.title}</h3>
                  <p>{project.description || project.category}</p>
                </div>
                <i className="fas fa-plus"></i>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
