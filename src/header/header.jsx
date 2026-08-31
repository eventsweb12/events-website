'use client'

import React from 'react'
import './header.css'
import Link from 'next/link'
import { useLanguage } from '../language/LanguageContext'

const NAV_LINKS = [
  { href: '/#home', en: 'Home', ka: 'მთავარი' },
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
  const { lang, toggleLang } = useLanguage()
  const t = COPY[lang]

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavClick = (e, href) => {
    if (href === '/#home' && window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setOpen(false)
    }
  }

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

      <div className={`header__mobile${open ? ' header__mobile--open' : ''}`}>
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
    </header>
  )
}