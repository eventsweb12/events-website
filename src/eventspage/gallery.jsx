'use client'

import React, { useState } from 'react'


export default function Gallery({ slides, name, label }) {
  const [lightbox, setLightbox] = useState(null) // index into slides, or null

  if (!slides || slides.length === 0) return null

  return (
    <>
      <div className="eventpage__gallery-wrap">
        <span className="eventpage__label">{label}</span>
        <div className="eventpage__gallery">
          {slides.map((src, i) => (
            <button
              type="button"
              className="eventpage__gallery-item"
              key={src + i}
              onClick={() => setLightbox(i)}
            >
              <img src={src} alt={`${name} ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="eventpage__lightbox" onClick={() => setLightbox(null)}>
          <button
            type="button"
            className="eventpage__lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {slides.length > 1 && (
            <button
              type="button"
              className="eventpage__lightbox-nav eventpage__lightbox-nav--prev"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === 0 ? slides.length - 1 : i - 1))
              }}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <img
            src={slides[lightbox]}
            alt={name}
            className="eventpage__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          {slides.length > 1 && (
            <button
              type="button"
              className="eventpage__lightbox-nav eventpage__lightbox-nav--next"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === slides.length - 1 ? 0 : i + 1))
              }}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}