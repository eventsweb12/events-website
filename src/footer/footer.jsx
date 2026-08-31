'use client'

import React from 'react'
import './footer.css'

const logo = '/logos/logo3.gif'

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 8h-2a2 2 0 0 0-2 2v10M9 13h4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
        <circle cx="7.5" cy="7.2" r="0.8" fill="currentColor" stroke="none" />
        <path d="M11.5 16.5v-4a2 2 0 0 1 4 0v4" />
        <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 4c.4 2.2 2 3.8 4.2 4.1" />
      </svg>
    ),
  },
]

const NAV_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/#home' },
      { label: 'About Us', href: '/#about' },
      { label: 'Why Us', href: '/#why-us' },
      { label: 'Our Work ', href: '/eventslisting' },
      { label: 'Blog', href: '/bloglisting' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Opening Events', href: '/#services' },
      { label: 'Brand Launches', href: '/#services' },
      { label: 'Promotional Events', href: '/#services' },
      { label: 'Corporate Events', href: '/#services' },
      { label: 'Event Design & Creative Direction', href: '/#services' },
    ],
  },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <img className="footer__brand-logo" src={logo} alt="Motion Concept" />
          <p className="footer__brand-tagline">
            A full-service experiential and event marketing studio producing
            storytelling-driven design and large-scale product launches for
            the world's leading brands.
          </p>
          <div className="footer__social">
            {SOCIAL_LINKS.map((social) => (
              
              <a  key={social.name}
                className="footer__social-link"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {NAV_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="footer__col-title">{col.title}</p>
            <ul className="footer__col-list">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="footer__col-title">Studio</p>
          <ul className="footer__col-list">
            <li><a href="/#contact">123 Placeholder St, Tbilisi</a></li>
            <li><a href="tel:+995000000000">+995 000 00 00 00</a></li>
            <li><a href="mailto:hello@youragency.com">hello@youragency.com</a></li>
            <li><a href="/#contact">Get in touch</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__legal">
          <span>© {year} Motion Concept. All rights reserved.</span>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <span className="footer__credit">
            Designed &amp; developed by{' '}
            <a href="https://sitefy.ge/" target="_blank" rel="noopener noreferrer">
              Sitefy
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer