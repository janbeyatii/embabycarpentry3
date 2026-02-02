'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const SECTION_IDS = ['home', 'about', 'services', 'projects', 'contact'] as const

const SERVICES_DROPDOWN = [
  { label: 'All Services', href: '/services' },
  { label: 'Kitchens', href: '/services/kitchens' },
  { label: 'Bath', href: '/services/bath' },
  { label: 'Basement', href: '/services/basement' },
  { label: 'Decks', href: '/services/decks' },
  { label: 'Fences', href: '/services/fences' },
  { label: 'Sheds, Gazebos & Pergolas', href: '/services/sheds-gazebos-pergolas' },
  { label: 'Custom Woodworking', href: '/woodworking' },
]

export default function Header() {
  const pathname = usePathname()
  const [navbarActive, setNavbarActive] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (pathname === '/our-work') return 'projects'
    if (pathname === '/about') return 'about'
    if (pathname === '/services' || pathname.startsWith('/services')) return 'services'
    if (pathname === '/contact') return 'contact'
    return 'home'
  })

  useEffect(() => {
    const handleScroll = () => {
      setNavbarActive(false)
      setOpenDropdown(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (navbarActive) {
      root.classList.add('menu-open')
      document.body.classList.add('menu-open')
    } else {
      root.classList.remove('menu-open')
      document.body.classList.remove('menu-open')
    }
    return () => {
      root.classList.remove('menu-open')
      document.body.classList.remove('menu-open')
    }
  }, [navbarActive])

  useEffect(() => {
    if (pathname === '/our-work') setActiveSection('projects')
    else if (pathname === '/about') setActiveSection('about')
    else if (pathname === '/services' || pathname.startsWith('/services')) setActiveSection('services')
    else if (pathname === '/contact') setActiveSection('contact')
    else if (pathname === '/') setActiveSection('home')
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') return
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
  }, [pathname])

  const closeNav = () => {
    setNavbarActive(false)
    setOpenDropdown(false)
  }

  return (
    <>
      <header className="header">
        <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="logo-img-wrap">
            <Image src="/images/logo.png" alt="Embaby Carpentry" width={48} height={48} className="logo-img" />
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
          <a href="/" onClick={closeNav} className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="/about" onClick={closeNav} className={activeSection === 'about' ? 'active' : ''}>About Us</a>
          <div
            className={`nav-dropdown ${openDropdown ? 'open' : ''}`}
            onMouseEnter={() => !navbarActive && setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger ${activeSection === 'services' ? 'active' : ''}`}
              onClick={() => setOpenDropdown(!openDropdown)}
              aria-expanded={openDropdown}
              aria-haspopup="true"
            >
              Services <i className="fas fa-chevron-down" style={{ fontSize: '1.2rem', marginLeft: '0.3rem' }} />
            </button>
            <div className="nav-dropdown-content">
              {SERVICES_DROPDOWN.map((item) => (
                <a key={item.href} href={item.href} onClick={closeNav}>{item.label}</a>
              ))}
            </div>
          </div>
          <a href="/our-work" onClick={closeNav} className={activeSection === 'projects' ? 'active' : ''}>Our Projects</a>
          <a href="/contact" onClick={closeNav} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </nav>

        <div className="header-actions">
          <a href="/woodworking" className="header-cta-btn" onClick={closeNav}>
            CUSTOM WOODWORKING
          </a>
          <a href="/contact" className="header-cta-btn" onClick={closeNav}>
            GET A QUOTE
          </a>
        </div>
      </header>
    </>
  )
}
