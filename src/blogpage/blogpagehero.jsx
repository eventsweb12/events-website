'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, A11y, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export default function BlogpageHero({ slides, title }) {
  return (
    <div className="blogpage__media">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, A11y, EffectFade]}
        effect={slides.length > 1 ? 'fade' : undefined}
        fadeEffect={{ crossFade: true }}
        navigation={slides.length > 1 ? {
          prevEl: '.blogpage__media-arrow--prev',
          nextEl: '.blogpage__media-arrow--next',
        } : false}
        pagination={slides.length > 1 ? { clickable: true, el: '.blogpage__media-pagination' } : false}
        keyboard={{ enabled: true }}
        loop={slides.length > 1}
        speed={700}
        className="blogpage__media-swiper"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={src + i}>
            <div className="blogpage__media-slide">
              <img src={src} alt={title} className="blogpage__media-img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {slides.length > 1 && (
        <>
          <div className="blogpage__media-pagination" />
          <button type="button" className="blogpage__media-arrow blogpage__media-arrow--prev" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="blogpage__media-arrow blogpage__media-arrow--next" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}