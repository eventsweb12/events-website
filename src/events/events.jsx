'use client'

import React, { useEffect, useState } from 'react'
import './events.css'
import { useLanguage } from '../language/LanguageContext'

const API_URL = 'https://events-admin-omega.vercel.app/api/events'

const LABELS = {
  en: { eyebrowLabel: 'Selected work', heading: 'Events', empty: 'No events yet.', error: 'Could not load events.' },
  ka: { eyebrowLabel: 'შერჩეული პროექტები', heading: 'ივენთები', empty: 'ივენთები ჯერ არ არის.', error: 'ივენთების ჩატვირთვა ვერ მოხერხდა.' },
}

// The API stores multilingual fields as { geo, eng } — not { ka, en } —
// so we map our app's lang codes to the API's field keys here.
const FIELD_KEY = { ka: 'geo', en: 'eng' }

function pick(field, lang) {
  if (!field) return ''
  const key = FIELD_KEY[lang] || 'eng'
  return field[key] || field.eng || field.geo || ''
}

export default function Events() {
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en

  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(API_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setEvents(Array.isArray(data) ? data : [])
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

  return (
    <section className="events" id="events" data-lang={lang}>
      <div className="events__intro">
        <span className="events__eyebrow">{t.eyebrowLabel}</span>
        <h2 className="events__heading">{t.heading}</h2>
      </div>

      {status === 'loading' && (
        <div className="events__grid" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div className="events__card events__card--skeleton" key={i}>
              <div className="events__image events__image--skeleton" />
              <div className="events__line events__line--skeleton" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && <p className="events__status">{t.error}</p>}

      {status === 'ready' && events.length === 0 && (
        <p className="events__status">{t.empty}</p>
      )}

      {status === 'ready' && events.length > 0 && (
        <div className="events__grid">
          {events.map((ev) => {
            const name = pick(ev.eventName, lang) || pick(ev.title, lang)
            const desc = pick(ev.about, lang)
            const meta = [pick(ev.venue, lang), ev.year].filter(Boolean).join(' · ')

            return (
              <a
                className="events__card"
                href={ev.slug ? `/events/${ev.slug}` : undefined}
                key={ev._id}
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
                  {meta && <span className="events__meta">{meta}</span>}
                  <h3 className="events__name">{name}</h3>
                  {desc && <p className="events__desc">{desc}</p>}
                </div>
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}