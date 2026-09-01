'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'
import './events.css'
import { useLanguage } from '../language/LanguageContext'

const API_URL = 'https://events-admin-omega.vercel.app/api/events'
const MAX_EVENTS = 7

const LABELS = {
  en: { eyebrowLabel: 'Selected work', heading: 'Events', empty: 'No events yet.', error: 'Could not load events.', prev: 'Previous', next: 'Next' },
  ka: { eyebrowLabel: 'შერჩეული პროექტები', heading: 'ივენთები', empty: 'ივენთები ჯერ არ არის.', error: 'ივენთების ჩატვირთვა ვერ მოხერხდა.', prev: 'წინა', next: 'შემდეგი' },
}

// The API stores multilingual fields as { geo, eng } — not { ka, en } —
// so we map our app's lang codes to the API's field keys here.
const FIELD_KEY = { ka: 'geo', en: 'eng' }

function pick(field, lang) {
  if (!field) return ''
  const key = FIELD_KEY[lang] || 'eng'
  return field[key] || field.eng || field.geo || ''
}

// Newest-first, using whatever timestamp the API gives us. Falls back to
// the Mongo/Sanity-style _id, which embeds a creation timestamp, so the
// ordering is still correct even if createdAt is missing.
function byLatest(a, b) {
  const ta = new Date(a.createdAt || a._createdAt || a.publishedAt || 0).getTime()
  const tb = new Date(b.createdAt || b._createdAt || b.publishedAt || 0).getTime()
  if (ta !== tb) return tb - ta
  return String(b._id).localeCompare(String(a._id))
}

// Pseudo-random but stable per-index timing so skeleton cards breathe
// independently instead of pulsing together as one bright wave.
function skeletonTiming(i) {
  const delay = ((i * 0.53) % 1.6).toFixed(2)
  const duration = (1.6 + ((i * 0.29) % 1.1)).toFixed(2)
  return { '--sk-delay': `${delay}s`, '--sk-duration': `${duration}s` }
}

export default function Events() {
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en
  const swiperRef = useRef(null)

  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [activeIndex, setActiveIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(API_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          const sorted = Array.isArray(data) ? [...data].sort(byLatest) : []
          setEvents(sorted.slice(0, MAX_EVENTS))
          setStatus('ready')
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch events:', err)
          setStatus('error')
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const showControls = status === 'ready' && events.length > 1

  return (
    <section className="events" data-lang={lang} id="work">
      <div className="events__intro">
        <span className="events__eyebrow">{t.eyebrowLabel}</span>

        <div className="events__heading-row">
          <h2 className="events__heading">{t.heading}</h2>

          {showControls && (
            <div className="events__controls">
              <span className="events__count">
                <span className="events__count-active">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="events__count-sep">/</span>
                <span className="events__count-total">
                  {String(events.length).padStart(2, '0')}
                </span>
              </span>

              <button
                type="button"
                className="events__arrow events__arrow--prev"
                aria-label={t.prev}
                disabled={atStart}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                className="events__arrow events__arrow--next"
                aria-label={t.next}
                disabled={atEnd}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {status === 'loading' && (
        <div className="events__grid events__grid--skeleton" aria-hidden="true">
          {[0, 1, 2].map((i) => {
            const timing = skeletonTiming(i)
            return (
              <div
                className="events__card events__card--skeleton"
                key={i}
                style={timing}
              >
                <div className="events__image-wrap events__image-wrap--skeleton">
                  <div className="events__skeleton-shimmer" />
                </div>
                <div className="events__body">
                  <span className="events__skel events__skel--meta" style={skeletonTiming(i + 2)} />
                  <span className="events__skel events__skel--name" style={skeletonTiming(i + 4)} />
                  <span className="events__skel events__skel--desc" style={skeletonTiming(i + 6)} />
                  <span className="events__skel events__skel--desc-short" style={skeletonTiming(i + 8)} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {status === 'error' && <p className="events__status">{t.error}</p>}

      {status === 'ready' && events.length === 0 && (
        <p className="events__status">{t.empty}</p>
      )}

      {status === 'ready' && events.length > 0 && (
        <Swiper
          modules={[Navigation, Keyboard, A11y]}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
            setAtStart(swiper.isBeginning)
            setAtEnd(swiper.isEnd)
          }}
          spaceBetween={28}
          slidesPerView={1.15}
          keyboard={{ enabled: true }}
          a11y={{ prevSlideMessage: t.prev, nextSlideMessage: t.next }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 28 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="events__swiper"
        >
          {events.map((ev) => {
            const name = pick(ev.eventName, lang) || pick(ev.title, lang)
            const desc = pick(ev.about, lang)
           

            return (
              <SwiperSlide key={ev._id}>

                 <a className="events__card"
                 href={`/events/${ev._id}`}
                >
                  <div className="events__image-wrap">
                    {ev.mainImage && (
                      <img
                        className="events__image"
                        src={ev.mainImage}
                        alt={name}
                        loading="lazy"
                      />
                    )}
                    <div className="events__scrim" aria-hidden="true" />
                  </div>

                  <div className="events__body">
                   
                    <h3 className="events__name">{name}</h3>
                    {desc && <p className="events__desc">{desc}</p>}
                  </div>
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </section>
  )
}