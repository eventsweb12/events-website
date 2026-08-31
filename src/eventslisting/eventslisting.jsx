'use client'

import React, { useEffect, useState } from 'react'
import './eventslisting.css'
import { useLanguage } from '../language/LanguageContext'

const API_URL = 'https://events-admin-omega.vercel.app/api/events'
const PER_PAGE = 9

const LABELS = {
  en: {
    eyebrowLabel: 'Selected work',
    heading: 'Events',
    empty: 'No events yet.',
    error: 'Could not load events.',
    prev: 'Previous',
    next: 'Next',
  },
  ka: {
    eyebrowLabel: 'შერჩეული პროექტები',
    heading: 'ივენთები',
    empty: 'ივენთები ჯერ არ არის.',
    error: 'ივენთების ჩატვირთვა ვერ მოხერხდა.',
    prev: 'წინა',
    next: 'შემდეგი',
  },
}

// API stores multilingual fields as { geo, eng } — map our lang codes to those keys.
const FIELD_KEY = { ka: 'geo', en: 'eng' }

function pick(field, lang) {
  if (!field) return ''
  const key = FIELD_KEY[lang] || 'eng'
  return field[key] || field.eng || field.geo || ''
}

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

export default function EventsListing() {
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en

  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(API_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          const sorted = Array.isArray(data) ? [...data].sort(byLatest) : []
          setEvents(sorted)
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

  const totalPages = Math.max(1, Math.ceil(events.length / PER_PAGE))
  const start = (page - 1) * PER_PAGE
  const pageEvents = events.slice(start, start + PER_PAGE)

  function goTo(p) {
    const clamped = Math.min(Math.max(p, 1), totalPages)
    setPage(clamped)
    // scroll back to top of the section on page change
    document.getElementById('events-listing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="eventslisting" data-lang={lang} id="events-listing">
      <div className="eventslisting__intro">
        <span className="eventslisting__eyebrow">{t.eyebrowLabel}</span>
        <h2 className="eventslisting__heading">{t.heading}</h2>
      </div>

      {status === 'loading' && (
        <div className="eventslisting__grid" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => {
            const timing = skeletonTiming(i)
            return (
              <div
                className="eventslisting__card eventslisting__card--skeleton"
                key={i}
                style={timing}
              >
                <div className="eventslisting__image-wrap eventslisting__image-wrap--skeleton">
                  <div className="eventslisting__skeleton-shimmer" />
                </div>
                <div className="eventslisting__body">
                  <span className="eventslisting__skel eventslisting__skel--meta" style={skeletonTiming(i + 2)} />
                  <span className="eventslisting__skel eventslisting__skel--name" style={skeletonTiming(i + 4)} />
                  <span className="eventslisting__skel eventslisting__skel--desc" style={skeletonTiming(i + 6)} />
                  <span className="eventslisting__skel eventslisting__skel--desc-short" style={skeletonTiming(i + 8)} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {status === 'error' && <p className="eventslisting__status">{t.error}</p>}

      {status === 'ready' && events.length === 0 && (
        <p className="eventslisting__status">{t.empty}</p>
      )}

      {status === 'ready' && events.length > 0 && (
        <>
          <div className="eventslisting__grid">
            {pageEvents.map((ev) => {
              const name = pick(ev.eventName, lang) || pick(ev.title, lang)
              const desc = pick(ev.about, lang)
              const meta = [pick(ev.venue, lang), ev.year].filter(Boolean).join(' · ')

              return (
                
                 <a key={ev._id}
                  className="eventslisting__card"
                  href={`/events/${ev._id}`}
                >
                  <div className="eventslisting__image-wrap">
                    {ev.mainImage && (
                      <img
                        className="eventslisting__image"
                        src={ev.mainImage}
                        alt={name}
                        loading="lazy"
                      />
                    )}
                    <div className="eventslisting__scrim" aria-hidden="true" />
                  </div>

                  <div className="eventslisting__body">
                    {meta && <span className="eventslisting__meta">{meta}</span>}
                    <h3 className="eventslisting__name">{name}</h3>
                    {desc && <p className="eventslisting__desc">{desc}</p>}
                  </div>
                </a>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="eventslisting__pagination">
              <button
                type="button"
                className="eventslisting__arrow"
                aria-label={t.prev}
                disabled={page === 1}
                onClick={() => goTo(page - 1)}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="eventslisting__pages">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const num = i + 1
                  return (
                    <button
                      key={num}
                      type="button"
                      className={`eventslisting__page${num === page ? ' is-active' : ''}`}
                      onClick={() => goTo(num)}
                    >
                      {String(num).padStart(2, '0')}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="eventslisting__arrow"
                aria-label={t.next}
                disabled={page === totalPages}
                onClick={() => goTo(page + 1)}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}