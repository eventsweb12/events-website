'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, A11y, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export default function EventspageHero({ slides = [], name }) {
  const hasSlides = slides.length > 0

  return (
    <div className="eventpage__hero">
      {hasSlides ? (
        <Swiper
          modules={[Navigation, Pagination, Keyboard, A11y, EffectFade]}
          effect={slides.length > 1 ? 'fade' : undefined}
          fadeEffect={{ crossFade: true }}
          navigation={slides.length > 1 ? {
            prevEl: '.eventpage__hero-arrow--prev',
            nextEl: '.eventpage__hero-arrow--next',
          } : false}
          pagination={slides.length > 1 ? { clickable: true, el: '.eventpage__hero-pagination' } : false}
          keyboard={{ enabled: true }}
          loop={slides.length > 1}
          speed={700}
          className="eventpage__hero-swiper"
        >
          {slides.map((src, i) => (
            <SwiperSlide key={src + i}>
              <div className="eventpage__hero-slide">
                <img src={src} alt={name} className="eventpage__hero-img" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="eventpage__hero-slide eventpage__hero-slide--empty" />
      )}

      <div className="eventpage__hero-scrim" aria-hidden="true" />

      <div className="eventpage__hero-content">
        <h1 className="eventpage__hero-title">{name}</h1>
      </div>

      {slides.length > 1 && (
        <>
          <div className="eventpage__hero-pagination" />
          <button type="button" className="eventpage__hero-arrow eventpage__hero-arrow--prev" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="eventpage__hero-arrow eventpage__hero-arrow--next" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}