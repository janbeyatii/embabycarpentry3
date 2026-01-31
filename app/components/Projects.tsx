'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    lightGallery: any
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
    if (!containerRef.current || projects.length === 0 || typeof window === 'undefined') return
    const el = containerRef.current
    let attempts = 0
    const maxAttempts = 50
    const initGallery = () => {
      if (window.lightGallery) {
        window.lightGallery(el, {
          selector: '.box',
          speed: 300,
          subHtmlSelectorRelative: false,
        })
        return true
      }
      return false
    }
    if (initGallery()) return
    const t = setInterval(() => {
      attempts += 1
      if (initGallery() || attempts >= maxAttempts) clearInterval(t)
    }, 100)
    return () => clearInterval(t)
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
          const images = Array.isArray(project.images)
            ? project.images.filter((u): u is string => typeof u === 'string' && u.startsWith('http'))
            : []
          const firstImage = images.length > 0 ? images[0] : '/images/project-1.jpg'
          const description = project.description || project.category || ''
          const captionHtml = description
            ? `<h4 class="lg-caption-title">${escapeHtml(project.title)}</h4><p class="lg-caption-desc">${escapeHtml(description)}</p>`
            : escapeHtml(project.title)

          return (
            <a
              key={project.id}
              href={firstImage}
              className="box"
              data-sub-html={captionHtml}
            >
              <div className="image">
                <Image src={firstImage} alt={project.title} width={500} height={400} unoptimized={firstImage.startsWith('http')} />
              </div>
              <div className="content">
                <div className="info">
                  <h3>{project.title}</h3>
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
