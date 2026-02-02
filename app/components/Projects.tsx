'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPortfolioPreview } from '@/lib/portfolio-preview-cache'

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

interface ProjectsProps {
  /** When set, fetches random projects from blob portfolio (different each load) */
  previewCount?: number
}

export default function Projects({ previewCount }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryInstanceRef = useRef<{ closeGallery?: () => void } | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (previewCount != null && previewCount > 0) {
      getPortfolioPreview(previewCount)
        .then((data) => {
          if (Array.isArray(data)) setProjects(data as Project[])
          setLoading(false)
        })
        .catch(() => setLoading(false))
      return
    }
    fetch('/api/portfolio/carpentry')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [previewCount])

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
          <p style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>No projects available at the moment.</p>
          <Link href="/our-work" className="btn" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
            View Our Projects
          </Link>
        </div>
      </section>
    )
  }

  const isCompact = previewCount != null && previewCount > 0

  return (
    <section className={`projects ${isCompact ? 'projects--compact' : ''}`} id="projects">
      <h1 className="heading"> our projects </h1>

      <div className="projects-grid" ref={containerRef}>
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
            <Link
              key={project.id}
              href="/our-work"
              className="projects-card"
              data-sub-html={captionHtml}
            >
              <div className="projects-card-image">
                <Image src={firstImage} alt={project.title} width={500} height={400} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="projects-card-overlay">
                  <h3 className="projects-card-title">{project.title}</h3>
                  <span className="projects-card-photos">{images.length} photo{images.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="projects-cta">
        <Link href="/our-work" className="projects-cta-btn">
          View Our Projects
        </Link>
      </div>
    </section>
  )
}
