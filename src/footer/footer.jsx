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

const COPY = {
  en: {
    tagline:
      "A full-service experiential and event marketing studio producing storytelling-driven design and large-scale product launches for the world's leading brands.",
    navColumns: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', href: '/#home' },
          { label: 'About Us', href: '/#about' },
          { label: 'Why Us', href: '/#why-us' },
          { label: 'Our Work', href: '/eventslisting' },
          { label: 'Blog', href: '/bloglisting' },
        ],
      },
      {
        title: 'Services',
        split: true,
        links: [
          { label: 'Opening Events', href: '/#services' },
          { label: 'Brand Launches', href: '/#services' },
          { label: 'Promotional Events', href: '/#services' },
          { label: 'Press Events & Lunches', href: '/#services' },
          { label: 'Kids & Family Activities', href: '/#services' },
          { label: 'Brand Experiences', href: '/#services' },
          { label: 'Corporate Events', href: '/#services' },
          { label: 'Event Design & Creative Direction', href: '/#services' },
          { label: 'Event PR & Media Exposure', href: '/#services' },
        ],
      },
    ],
    studioTitle: 'Studio',
    studioLinks: [
      { label: '123 Placeholder St, Tbilisi', href: '/#contact' },
      { label: '+995 000 00 00 00', href: 'tel:+995000000000' },
      { label: 'hello@youragency.com', href: 'mailto:hello@youragency.com' },
      { label: 'Get in touch', href: '/#contact' },
    ],
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    creditPrefix: 'Designed & developed by',
  },
  ka: {
    tagline:
      'სრული ციკლის ივენთ-მარკეტინგის სტუდია, რომელიც ქმნის სთორითელინგზე დაფუძნებულ დიზაინსა და მასშტაბურ ღონისძიებებს მოწამყვანე ბრენდებისთვის.',
    navColumns: [
      {
        title: 'გვერდები',
        links: [
          { label: 'მთავარი', href: '/#home' },
          { label: 'ჩვენ შესახებ', href: '/#about' },
          { label: 'რატომ ჩვენ', href: '/#why-us' },
          { label: 'ჩვენი ნამუშევრები', href: '/eventslisting' },
          { label: 'ბლოგი', href: '/bloglisting' },
        ],
      },
      {
        title: 'სერვისები',
        split: true,
        links: [
          { label: 'გახსნის ღონისძიებები', href: '/#services' },
          { label: 'ბრენდის წარდგენა', href: '/#services' },
          { label: 'საპრომოციო ღონისძიებები', href: '/#services' },
          { label: 'პრეს ღონისძიებები და ბრენდის წარდგენა', href: '/#services' },
          { label: 'საბავშვო აქტივობები', href: '/#services' },
          { label: 'ბრენდული გამოცდილებები', href: '/#services' },
          { label: 'კორპორაციული ღონისძიებები', href: '/#services' },
          { label: 'კრეატიული დიზაინი და არტ-დირექშენი', href: '/#services' },
          { label: 'ღონისძიების PR და მედია გავრცელება', href: '/#services' },
        ],
      },
    ],
    studioTitle: 'სტუდია',
    studioLinks: [
      { label: '123 Placeholder St, Tbilisi', href: '/#contact' },
      { label: '+995 000 00 00 00', href: 'tel:+995000000000' },
      { label: 'hello@youragency.com', href: 'mailto:hello@youragency.com' },
      { label: 'დაგვიკავშირდით', href: '/#contact' },
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
          <p className="footer__brand-tagline">{t.tagline}</p>
          <div className="footer__social">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
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

        {t.navColumns.map((col) => (
          <div key={col.title}>
            <p className="footer__col-title">{col.title}</p>
            <ul className={`footer__col-list${col.split ? ' footer__col-list--split' : ''}`}>
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