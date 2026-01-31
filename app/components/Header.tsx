'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [navbarActive, setNavbarActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [contactInfoActive, setContactInfoActive] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<'work' | 'about' | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setNavbarActive(false)
      setSearchActive(false)
      setContactInfoActive(false)
      setOpenDropdown(null)
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeNav = () => {
    setNavbarActive(false)
    setOpenDropdown(null)
  }

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Image 
            src="/images/logo.png" 
            alt="Embaby Carpentry" 
            width={48} 
            height={48}
            style={{ objectFit: 'contain' }}
          />
          <span style={{ fontSize: '2.2rem', fontWeight: '700' }}>Embaby <span style={{ color: 'var(--yellow)' }}>Carpentry</span></span>
        </a>

        <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
          <a href="#home" onClick={closeNav}>Home</a>
          <a href="#services" onClick={closeNav}>Services</a>
          <div
            className={`nav-dropdown ${openDropdown === 'work' ? 'open' : ''}`}
            onMouseEnter={() => !navbarActive && setOpenDropdown('work')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              className="nav-dropdown-trigger"
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
              className="nav-dropdown-trigger"
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
          <a href="#contact" onClick={closeNav}>Contact</a>
          <a href="#blogs" onClick={closeNav}>Blogs</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="icons">
            <div id="menu-btn" className="fas fa-bars" onClick={() => {
              setNavbarActive(!navbarActive)
              setSearchActive(false)
            }}></div>
            <div id="info-btn" className="fas fa-info-circle" onClick={() => setContactInfoActive(true)}></div>
            <div id="search-btn" className="fas fa-search" onClick={() => {
              setSearchActive(!searchActive)
              setNavbarActive(false)
            }}></div>
          </div>
        </div>

        <form className={`search-form ${searchActive ? 'active' : ''}`}>
          <input type="search" name="" placeholder="search here..." id="search-box" />
          <label htmlFor="search-box" className="fas fa-search"></label>
        </form>
      </header>

      <div className={`contact-info ${contactInfoActive ? 'active' : ''}`}>
        <div id="close-contact-info" className="fas fa-times" onClick={() => setContactInfoActive(false)}></div>

        <div className="info">
          <i className="fas fa-phone"></i>
          <h3>phone number</h3>
          <p>+123-456-7890</p>
          <p>+111-222-3333</p>
        </div>

        <div className="info">
          <i className="fas fa-envelope"></i>
          <h3>email address</h3>
          <p>shaikhanas@gmail.com</p>
          <p>anasbhai@gmail.com</p>
        </div>

        <div className="info">
          <i className="fas fa-map-marker-alt"></i>
          <h3>office address</h3>
          <p>Ottawa, ON, Canada</p>
        </div>

        <div className="share">
          <a href="#" className="fab fa-facebook-f"></a>
          <a href="#" className="fab fa-twitter"></a>
          <a href="#" className="fab fa-instagram"></a>
          <a href="#" className="fab fa-linkedin"></a>
        </div>
      </div>
    </>
  )
}
