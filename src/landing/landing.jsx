'use client'

import React, { useEffect, useState } from 'react'
import './landing.css'
import Brands from '../brands/brands'

const heroImages = ['/backgrounds/bg1.jpg', '/backgrounds/bg2.jpg']

export default function Hero({
  eyebrowVideo = 'Watch the reel',
  badgeTop = 'TOP 100',
  badgeYear = '2026',
  badgeSub = 'EVENT AGENCIES',
  headline = ['Creative events &', 'Brand experiences'],
  intro = 'Your Agency is a full-service experiential and event marketing studio producing storytelling-driven design, immersive brand experiences, and large-scale product launches for the world\u2019s leading brands.',
}) {
  const badgeText = `\u2726 ${badgeSub} ${badgeYear} \u2726 ${badgeSub} ${badgeYear} `
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

          <button className="hero__play" type="button">
            <span className="hero__play-icon" aria-hidden="true">
              ▶
            </span>
            {eyebrowVideo}
          </button>

          <div className="hero__badge" aria-hidden="true">
            <svg className="hero__badge-ring" viewBox="0 0 140 140">
              <path
                id="heroBadgePath"
                fill="none"
                d="M 70,70 m -56,0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
              />
              <text>
                <textPath href="#heroBadgePath">{badgeText}</textPath>
              </text>
            </svg>
            <span className="hero__badge-core">
              <strong>{badgeTop}</strong>
              <em>100</em>
              <small>IT LIST</small>
            </span>
          </div>
        </div>

        <div className="hero__body">
          <h1 className="hero__headline">
            {headline.map((line, i) => (
              <span className="hero__headline-line" key={i}>
                {line}
              </span>
            ))}
          </h1>

          <div className="hero__intro">
            <p>{intro}</p>
            <span className="hero__scroll" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Brands />
    </>
  )
}