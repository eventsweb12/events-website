'use client'

import React, { useEffect, useState } from 'react'
import './landing.css'
import Brands from '../brands/brands'

const heroImages = ['/backgrounds/bg1.jpg', '/backgrounds/bg2.jpg']

export default function Hero({
  headline = 'Creative events & brand experiences',
}) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (heroImages.length < 2) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) return

    const id = setInterval(() => {
      setActiveImage((i) => (i + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(id)
  }, [])

  return (
    <>
      <section className="hero" id="home">
        <div className="hero__media">
          {heroImages.map((src, i) => (
            <img
              key={src}
              className={`hero__image${i === activeImage ? ' is-active' : ''}`}
              src={src}
              alt=""
            />
          ))}
          <div className="hero__scrim" />
          <div className="hero__clip" />
        </div>

        <div className="hero__body">
          <h1 className="hero__headline">{headline}</h1>
        </div>
      </section>

      <Brands />
    </>
  )
}