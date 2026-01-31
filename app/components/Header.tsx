'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SECTION_IDS = ['home', 'about', 'services', 'projects', 'contact', 'blogs'] as const

export default function Header() {
  const [navbarActive, setNavbarActive] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<'work' | 'about' | null>(null)
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const handleScroll = () => {
      setNavbarActive(false)
      setOpenDropdown(null)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id && SECTION_IDS.includes(id as typeof SECTION_IDS[number])) {
              setActiveSection(id)
            }
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const closeNav = () => {
    setNavbarActive(false)
    setOpenDropdown(null)
  }

  return (
    <>
      <header className="header">
        <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="logo-img-wrap">
            <Image 
              src="/images/logo.png" 
              alt="Embaby Carpentry" 
              width={48} 
              height={48}
              className="logo-img"
            />
          </span>
          <span style={{ fontSize: '2.2rem', fontWeight: '700' }}><span style={{ color: 'var(--text-primary)' }}>Embaby</span> <span style={{ color: 'var(--gold)' }}>Carpentry</span></span>
        </a>

        <button
          type="button"
          className="menu-btn"
          onClick={() => setNavbarActive((prev) => !prev)}
          aria-label={navbarActive ? 'Close menu' : 'Open menu'}
          aria-expanded={navbarActive}
        >
          <span className="menu-btn-bar" />
          <span className="menu-btn-bar" />
          <span className="menu-btn-bar" />
        </button>

        <nav className={`navbar ${navbarActive ? 'active' : ''}`} aria-hidden={!navbarActive}>
          <a href="#home" onClick={closeNav} className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#services" onClick={closeNav} className={activeSection === 'services' ? 'active' : ''}>Services</a>
          <div
            className={`nav-dropdown ${openDropdown === 'work' ? 'open' : ''}`}
            onMouseEnter={() => !navbarActive && setOpenDropdown('work')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'work' ? null : 'work')}
              aria-expanded={openDropdown === 'work'}
              aria-haspopup="true"
            >
              Our Work <i className="fas fa-chevron-down" style={{ fontSize: '1.2rem', marginLeft: '0.3rem' }} />
            </button>
            <div className="nav-dropdown-content">
              <a href="#projects" onClick={closeNav}>Projects</a>
              <a href="/woodworking" onClick={closeNav}>Woodworking</a>
            </div>
          </div>
          <div
            className={`nav-dropdown ${openDropdown === 'about' ? 'open' : ''}`}
            onMouseEnter={() => !navbarActive && setOpenDropdown('about')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
              aria-expanded={openDropdown === 'about'}
              aria-haspopup="true"
            >
              About <i className="fas fa-chevron-down" style={{ fontSize: '1.2rem', marginLeft: '0.3rem' }} />
            </button>
            <div className="nav-dropdown-content">
              <a href="#about" onClick={closeNav}>About Us</a>
            </div>
          </div>
          <a href="#contact" onClick={closeNav} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          <a href="#blogs" onClick={closeNav} className={activeSection === 'blogs' ? 'active' : ''}>Blogs</a>
        </nav>

        <div className="header-actions">
          <a href="#quote" className="header-cta-btn" onClick={closeNav}>
            GET A QUOTE
          </a>
        </div>
      </header>
    </>
  )
}
