'use client'

import React from 'react'
import './brands.css'

// All logos combined into a single marquee row
const LOGOS = [
  '/logos/l1.png', '/logos/l2.png', '/logos/l3.png', '/logos/l4.png',
  '/logos/l5.png', '/logos/l6.png', '/logos/l7.png', '/logos/l8.png',
  '/logos/l9.png', '/logos/l10.png', '/logos/l11.png',
  '/logos/l12.png', '/logos/l13.png', '/logos/l14.png',
]

function Row({ logos, duration }) {
  // Duplicate the set so the track can loop seamlessly at -50%/50%
  const track = [...logos, ...logos]

  return (
    <div className="brands__row">
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
  return (
    <section className="brands" id="clients">
      <Row logos={LOGOS} duration={48} />
    </section>
  )
}