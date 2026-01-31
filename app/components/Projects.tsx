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

/** Set to true to re-enable lightbox when clicking portfolio items */
const PORTFOLIO_LIGHTBOX_ENABLED = false

interface Project {
  id: string
  title: string
  description: string | null
  images: string[]
  category: string
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryInstanceRef = useRef<{ closeGallery?: () => void } | null>(null)
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
    if (!PORTFOLIO_LIGHTBOX_ENABLED || !containerRef.current || projects.length === 0 || typeof window === 'undefined') return
    const el = containerRef.current

    const onInit = (e: Event) => {
      const ev = e as CustomEvent<{ instance?: { closeGallery?: () => void } }>
      galleryInstanceRef.current = ev.detail?.instance ?? null
    }
    const onAfterOpen = () => {
      const existing = document.querySelector('.portfolio-lightbox-close')
      if (existing) return
      const container =
        document.querySelector('.lg-toolbar') ??
        document.querySelector('.lg-outer') ??
        document.querySelector('.lg-backdrop')
      if (!container) return
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'portfolio-lightbox-close'
      btn.setAttribute('aria-label', 'Close')
      btn.innerHTML = '×'
      btn.onclick = () => {
        if (typeof galleryInstanceRef.current?.closeGallery === 'function') {
          galleryInstanceRef.current.closeGallery()
        } else {
          ;(document.querySelector('.lg-close') as HTMLElement)?.click()
        }
      }
      container.appendChild(btn)
    }
    const onAfterClose = () => {
      document.querySelector('.portfolio-lightbox-close')?.remove()
    }

    el.addEventListener('lgInit', onInit as EventListener)
    el.addEventListener('lgAfterOpen', onAfterOpen as EventListener)
    el.addEventListener('lgAfterClose', onAfterClose as EventListener)

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
    if (initGallery()) {
      return () => {
        el.removeEventListener('lgInit', onInit as EventListener)
        el.removeEventListener('lgAfterOpen', onAfterOpen as EventListener)
        el.removeEventListener('lgAfterClose', onAfterClose as EventListener)
        document.querySelector('.portfolio-lightbox-close')?.remove()
      }
    }
    const t = setInterval(() => {
      attempts += 1
      if (initGallery() || attempts >= maxAttempts) {
        clearInterval(t)
      }
    }, 100)
    return () => {
      clearInterval(t)
      el.removeEventListener('lgInit', onInit as EventListener)
      el.removeEventListener('lgAfterOpen', onAfterOpen as EventListener)
      el.removeEventListener('lgAfterClose', onAfterClose as EventListener)
      document.querySelector('.portfolio-lightbox-close')?.remove()
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
              href={PORTFOLIO_LIGHTBOX_ENABLED ? firstImage : '#'}
              className="box"
              data-sub-html={captionHtml}
              onClick={(e) => !PORTFOLIO_LIGHTBOX_ENABLED && e.preventDefault()}
              style={!PORTFOLIO_LIGHTBOX_ENABLED ? { cursor: 'default' } : undefined}
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
