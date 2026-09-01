'use client'

import React from 'react'
import './footer.css'
import { useLanguage } from '../language/LanguageContext'

const logo = '/logos/logo3.gif'

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2.5" y="2.5" width="19" height="19" rx="6" />
        <circle cx="12" cy="12" r="4.3" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M14.5 8.2h-1.7a2 2 0 0 0-2 2V20M9.4 13.1h4.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <line x1="7.6" y1="10.3" x2="7.6" y2="16.8" strokeLinecap="round" />
        <circle cx="7.6" cy="7.3" r="1" fill="currentColor" stroke="none" />
        <path d="M11.6 16.8v-4.2a2.3 2.3 0 0 1 4.6 0v4.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="11.6" y1="10.3" x2="11.6" y2="16.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@youragency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.2 3.5v11.3a3.6 3.6 0 1 1-3.6-3.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.2 3.5c.4 2.5 2.3 4.4 4.8 4.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const COPY = {
  en: {
    navColumns: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', href: '/#home' },
          { label: 'About Us', href: '/#about' },
          { label: 'Our Work', href: '/eventslisting' },
          { label: 'Blog', href: '/bloglisting' },
          { label: 'contact', href: '/contact' },
        ],
      },
      {
        title: 'Services',
        links: [
          { label: 'Opening Events', href: '/#services' },
          { label: 'Brand Launches', href: '/#services' },
          { label: 'Promotional Events', href: '/#services' },
          { label: 'Press Events & Lunches', href: '/#services' },
          { label: 'Kids & Family Activities', href: '/#services' },
        ],
      },
      {
        title: 'Services',
        links: [
          { label: 'Brand Experiences', href: '/#services' },
          { label: 'Corporate Events', href: '/#services' },
          { label: 'Event Design & Creative Direction', href: '/#services' },
          { label: 'Event PR & Media Exposure', href: '/#services' },
        ],
      },
    ],
    studioTitle: 'Studio',
    studioLinks: [
      { label: '+995 551 11 13 11', href: 'tel:+995551111311' },
      { label: 'hello@motionconcept.ge', href: 'mailto:hello@motionconcept.ge' },
      { label: 'Get in touch', href: '/contact' },
    ],
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    creditPrefix: 'Designed & developed by',
  },
  ka: {
    navColumns: [
      {
        title: 'გვერდები',
        links: [
          { label: 'მთავარი', href: '/home' },
          { label: 'ჩვენ შესახებ', href: '/#about' },
          { label: 'ჩვენი ნამუშევრები', href: '/eventslisting' },
          { label: 'ბლოგი', href: '/bloglisting' },
          { label: 'კონტაქტი', href: '/contact' },
        ],
      },
      {
        title: 'სერვისები',
        links: [
          { label: 'გახსნის ღონისძიებები', href: '/#services' },
          { label: 'ბრენდის წარდგენა', href: '/#services' },
          { label: 'საპრომოციო ღონისძიებები', href: '/#services' },
          { label: 'პრეს ღონისძიებები და ბრენდის წარდგენა', href: '/#services' },
          { label: 'საბავშვო აქტივობები', href: '/#services' },
        ],
      },
      {
        title: 'სერვისები',
        links: [
          { label: 'ბრენდული გამოცდილებები', href: '/#services' },
          { label: 'კორპორაციული ღონისძიებები', href: '/#services' },
          { label: 'კრეატიული დიზაინი და არტ-დირექშენი', href: '/#services' },
          { label: 'ღონისძიების PR და მედია გავრცელება', href: '/#services' },
        ],
      },
    ],
    studioTitle: 'სტუდია',
    studioLinks: [
      { label: '+995 551 11 13 11', href: 'tel:+995551111311' },
      { label: 'info@motionconcept.ge', href: 'mailto:info@motionconcept.ge' },
      { label: 'დაგვიკავშირდით', href: '/contact' },
    ],
    rights: 'ყველა უფლება დაცულია.',
    privacy: 'კონფიდენციალურობის პოლიტიკა',
    terms: 'გამოყენების პირობები',
    creditPrefix: 'დამზადებულია',
  },
}

function Footer() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="footer" data-lang={lang}>
      <div className="footer__grid">
        <div>
          <img className="footer__brand-logo" src={logo} alt="Motion Concept" />
          <div className="footer__social">
            {SOCIAL_LINKS.map((social) => (
              
               <a key={social.name}
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

        {t.navColumns.map((col, i) => (
          <div key={`${col.title}-${i}`}>
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
          <p className="footer__col-title">{t.studioTitle}</p>
          <ul className="footer__col-list">
            {t.studioLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__legal">
          <span>© {year} Motion Concept. {t.rights}</span>
          <a href="/privacy-policy">{t.privacy}</a>
          <a href="/terms">{t.terms}</a>
          <span className="footer__credit">
            {t.creditPrefix}{' '}
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