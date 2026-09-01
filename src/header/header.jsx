'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import './header.css'
import Link from 'next/link'
import { useLanguage } from '../language/LanguageContext'

const NAV_LINKS = [
  { href: '/', en: 'Home', ka: 'მთავარი' },
  { href: '/#about', en: 'About Us', ka: 'ჩვენ შესახებ' },
  { href: '/#services', en: 'Services', ka: 'სერვისები' },
  { href: '/eventslisting', en: 'Our Work', ka: 'პროექტები' },
  { href: '/bloglisting', en: 'Blog', ka: 'ბლოგი' },
  { href: '/contact', en: 'Contact', ka: 'კონტაქტი' },
]

const logo = '/logos/logo3.gif'

const COPY = {
  en: { callUs: 'Call us' },
  ka: { callUs: 'დაგვირეკეთ' },
}

export default function Header({
  logoText = 'YOUR AGENCY',
  phone = '+1 (555) 010-0100',
}) {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { lang, toggleLang } = useLanguage()
  const t = COPY[lang]

  React.useEffect(() => {
    setMounted(true) // portal target only exists client-side
  }, [])

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the sidebar is open
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavClick = (e, href) => {
    if (href === '/' && window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setOpen(false)
    }
  }

  const mobileMenu = (
    <>
      {/* Overlay */}
      <div
        className={`header__overlay${open ? ' header__overlay--open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sliding sidebar */}
      <div
        className={`header__mobile${open ? ' header__mobile--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="header__mobile-top">
          <span className="header__mobile-brand">
            <img src={logo} alt={logoText} />
          </span>
          <button
            className="header__mobile-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href)
                  setOpen(false)
                }}
              >
                <span>{link[lang]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <nav className="header__nav">
        <Link className="header__logo" href="/" onClick={handleLogoClick}>
          <img src={logo} alt={logoText} />
        </Link>

        <ul className="header__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                <span>{link[lang]}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="header__nav-right">
          <button
            className="header__lang"
            type="button"
            onClick={toggleLang}
            aria-label="Switch language"
          >
            <span className={lang === 'en' ? 'is-active' : ''}>ENG</span>
            <span className="header__lang-sep">/</span>
            <span className={lang === 'ka' ? 'is-active' : ''}>GE</span>
          </button>

          <button
            className={`header__menu${open ? ' header__menu--open' : ''}`}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* overlay + sidebar rendered outside .header's stacking context */}
      {mounted && createPortal(mobileMenu, document.body)}
    </header>
  )
}