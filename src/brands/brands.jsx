'use client'

import React from 'react'
import './brands.css'
import { useLanguage } from '../language/LanguageContext'

// Row 1 is intentionally longer (more logos) than Row 2 — asymmetric marquee
const LOGOS_ROW_1 = [
  '/logos/l1.png', '/logos/l2.png', '/logos/l3.png', '/logos/l4.png',
  '/logos/l5.png', '/logos/l6.png', '/logos/l7.png', '/logos/l8.png',
]

const LOGOS_ROW_2 = [
  '/logos/l9.png', '/logos/l10.png', '/logos/l11.png',
  '/logos/l12.png', '/logos/l13.png', '/logos/l14.png',
]

const LABELS = {
  en: { eyebrow: 'Trusted by', heading: 'Brands' },
  ka: { eyebrow: 'ჩვენ გვენდობიან', heading: 'ბრენდები' },
}

function Row({ logos, direction, duration }) {
  // Duplicate the set so the track can loop seamlessly at -50%/50%
  const track = [...logos, ...logos]

  return (
    <div className={`brands__row brands__row--${direction}`}>
      <div
        className="brands__track"
        style={{ '--brands-duration': `${duration}s` }}
      >
        {track.map((src, i) => (
          <span className="brands__logo" key={`${src}-${i}`}>
            <img src={src} alt="" loading="lazy" draggable={false} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Brands() {
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en

  return (
    <section className="brands" id="brands" data-lang={lang}>
      <div className="brands__intro">
        <span className="brands__eyebrow">{t.eyebrow}</span>
        <h2 className="brands__heading">{t.heading}</h2>
      </div>

      <div className="brands__marquee">
        <Row logos={LOGOS_ROW_1} direction="left" duration={42} />
        <Row logos={LOGOS_ROW_2} direction="right" duration={26} />
      </div>
    </section>
  )
}