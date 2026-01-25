'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [navbarActive, setNavbarActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [loginActive, setLoginActive] = useState(false)
  const [contactInfoActive, setContactInfoActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavbarActive(false)
      setSearchActive(false)
      setLoginActive(false)
      setContactInfoActive(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="header">
        <a href="#" className="logo">We<span>Build</span></a>

        <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
          <a href="#home">home</a>
          <a href="#about">about</a>
          <a href="#services">services</a>
          <a href="#projects">projects</a>
          <a href="#pricing">pricing</a>
          <a href="#contact">contact</a>
          <a href="#blogs">blogs</a>
        </nav>

        <div className="icons">
          <div id="menu-btn" className="fas fa-bars" onClick={() => {
            setNavbarActive(!navbarActive)
            setSearchActive(false)
            setLoginActive(false)
          }}></div>
          <div id="info-btn" className="fas fa-info-circle" onClick={() => setContactInfoActive(true)}></div>
          <div id="search-btn" className="fas fa-search" onClick={() => {
            setSearchActive(!searchActive)
            setNavbarActive(false)
            setLoginActive(false)
          }}></div>
          <div id="login-btn" className="fas fa-user" onClick={() => {
            setLoginActive(!loginActive)
            setNavbarActive(false)
            setSearchActive(false)
          }}></div>
        </div>

        <form className={`search-form ${searchActive ? 'active' : ''}`}>
          <input type="search" name="" placeholder="search here..." id="search-box" />
          <label htmlFor="search-box" className="fas fa-search"></label>
        </form>

        <form className={`login-form ${loginActive ? 'active' : ''}`}>
          <h3>login form</h3>
          <input type="email" placeholder="enter your email" className="box" />
          <input type="password" placeholder="enter your password" className="box" />
          <div className="flex">
            <input type="checkbox" name="" id="remember-me" />
            <label htmlFor="remember-me">remember me</label>
            <a href="#">forgot password?</a>
          </div>
          <input type="submit" value="login now" className="btn" />
          <p>don&apos;t have an account <a href="#">create one!</a></p>
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
          <p>mumbai, india - 400104</p>
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
