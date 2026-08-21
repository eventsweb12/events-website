'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, A11y, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export default function BlogpageHero({ slides, title, date }) {
  const showEyebrow = Boolean(date)

  return (
    <div className="blogpage__hero">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, A11y, EffectFade]}
        effect={slides.length > 1 ? 'fade' : undefined}
        fadeEffect={{ crossFade: true }}
        navigation={slides.length > 1 ? {
          prevEl: '.blogpage__hero-arrow--prev',
          nextEl: '.blogpage__hero-arrow--next',
        } : false}
        pagination={slides.length > 1 ? { clickable: true, el: '.blogpage__hero-pagination' } : false}
        keyboard={{ enabled: true }}
        loop={slides.length > 1}
        speed={700}
        className="blogpage__hero-swiper"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={src + i}>
            <div className="blogpage__hero-slide">
              <img src={src} alt={title} className="blogpage__hero-img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="blogpage__hero-scrim" aria-hidden="true" />

      <div className="blogpage__hero-content">
        {showEyebrow && <span className="blogpage__hero-eyebrow">{date}</span>}
        <h1 className="blogpage__hero-title">{title}</h1>
      </div>

      {slides.length > 1 && (
        <>
          <div className="blogpage__hero-pagination" />
          <button type="button" className="blogpage__hero-arrow blogpage__hero-arrow--prev" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="blogpage__hero-arrow blogpage__hero-arrow--next" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}