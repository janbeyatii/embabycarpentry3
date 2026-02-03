'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

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
    if (pathname === '/blog' || pathname.startsWith('/blog')) return 'blog'
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
    else if (pathname === '/blog' || pathname.startsWith('/blog')) setActiveSection('blog')
    else if (pathname === '/') setActiveSection('home')
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

        <nav className="navbar navbar-desktop" aria-hidden={navbarActive}>
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
          <a href="/blog" onClick={closeNav} className={activeSection === 'blog' ? 'active' : ''}>Blog</a>
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

      <div className={`mobile-menu-overlay ${navbarActive ? 'active' : ''}`} onClick={closeNav} aria-hidden={!navbarActive} />

      <div className={`mobile-menu-pane ${navbarActive ? 'active' : ''}`} aria-hidden={!navbarActive}>
          <button
            type="button"
            className="mobile-menu-close"
            onClick={closeNav}
            aria-label="Close menu"
          >
            <i className="fas fa-times" aria-hidden />
          </button>

          <nav className="navbar">
            <a href="/" onClick={closeNav} className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}>
              <span>HOME</span>
              <span className="mobile-nav-dot" />
            </a>
            <a href="/about" onClick={closeNav} className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}>
              <span>ABOUT US</span>
              <span className="mobile-nav-dot" />
            </a>
            <div className={`nav-dropdown mobile-nav-dropdown ${openDropdown ? 'open' : ''}`}>
              <button
                type="button"
                className={`mobile-nav-link nav-dropdown-trigger ${activeSection === 'services' ? 'active' : ''}`}
                onClick={() => setOpenDropdown(!openDropdown)}
                aria-expanded={openDropdown}
                aria-haspopup="true"
              >
                <span>SERVICES</span>
                <span className="mobile-nav-dot" />
              </button>
              <div className="nav-dropdown-content">
                {SERVICES_DROPDOWN.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeNav}>{item.label}</a>
                ))}
              </div>
            </div>
            <a href="/our-work" onClick={closeNav} className={`mobile-nav-link ${activeSection === 'projects' ? 'active' : ''}`}>
              <span>OUR PROJECTS</span>
              <span className="mobile-nav-dot" />
            </a>
            <a href="/blog" onClick={closeNav} className={`mobile-nav-link ${activeSection === 'blog' ? 'active' : ''}`}>
              <span>BLOG</span>
              <span className="mobile-nav-dot" />
            </a>
            <a href="/contact" onClick={closeNav} className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
              <span>CONTACT</span>
              <span className="mobile-nav-dot" />
            </a>
          </nav>

          <a href="/contact" className="mobile-menu-cta" onClick={closeNav}>
            GET A QUOTE
          </a>

          <div className="mobile-menu-support">
            <span className="mobile-menu-support-title">DIRECT SUPPORT</span>
            <a href="tel:+16138163764" className="mobile-menu-support-phone">
              <i className="fas fa-phone" aria-hidden />
              (613) 816-3764
            </a>
            <span className="mobile-menu-support-hours">Available 8am – 6pm Mon–Sat (Closed Sunday)</span>
          </div>
        </div>
    </>
  )
}
