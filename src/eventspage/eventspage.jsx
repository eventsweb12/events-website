'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import './eventspage.css'
import { useLanguage } from '../language/LanguageContext'
import EventspageHero from './eventspagehero'
import Gallery from './gallery'
import EventsVideo from './eventsvideo'

const API_URL = 'https://events-admin-omega.vercel.app/api/events'
const FIELD_KEY = { ka: 'geo', en: 'eng' }

function pick(field, lang) {
  if (!field) return ''
  const key = FIELD_KEY[lang] || 'eng'
  return field[key] || field.eng || field.geo || ''
}

const LABELS = {
  en: {
    back: 'Back to events',
    client: 'Client',
    venue: 'Venue',
    format: 'Format',
    audience: 'Audience',
    year: 'Year',
    about: 'About the project',
    role: 'Our role',
    gallery: 'Gallery',
    video: 'Video',
    loading: 'Loading…',
    notFound: 'Event not found.',
    error: 'Could not load this event.',
  },
  ka: {
    back: 'ივენთებზე დაბრუნება',
    client: 'კლიენტი',
    venue: 'ლოკაცია',
    format: 'ფორმატი',
    audience: 'აუდიტორია',
    year: 'წელი',
    about: 'პროექტის შესახებ',
    role: 'ჩვენი როლი',
    gallery: 'გალერეა',
    video: 'ვიდეო',
    loading: 'იტვირთება…',
    notFound: 'ივენთი ვერ მოიძებნა.',
    error: 'ივენთის ჩატვირთვა ვერ მოხერხდა.',
  },
}

export default function Eventspage() {
  const { id: slug } = useParams()
  const router = useRouter()
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en

  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'notfound' | 'error'

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`${API_URL}/${slug}`, { cache: 'no-store' })

        if (res.status === 404) {
          if (!cancelled) setStatus('notfound')
          return
        }
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)

        const text = await res.text()
        if (!text) {
          if (!cancelled) setStatus('notfound')
          return
        }

        const found = JSON.parse(text)
        if (cancelled) return

        setEvent(found)
        setStatus('ready')
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch event:', err)
          setStatus('error')
        }
      }
    }

    if (slug) load()
    return () => { cancelled = true }
  }, [slug])

  // Full gallery grid — every photo (mainImage + gallery), unchanged behavior
  const gallerySlides = useMemo(() => {
    if (!event) return []
    const all = [event.mainImage, ...(event.gallery || [])].filter(Boolean)
    return Array.from(new Set(all))
  }, [event])

  // Hero carousel — ONLY the photos marked as carouselImages in the admin.
  // Falls back to mainImage if nothing was marked, so the hero is never empty.
  const heroSlides = useMemo(() => {
    if (!event) return []
    const marked = (event.carouselImages || []).filter(Boolean)
    return marked.length > 0
      ? Array.from(new Set(marked))
      : [event.mainImage].filter(Boolean)
  }, [event])

  // Go back to wherever the user came from (/#work or /eventslisting?page=N).
  // If there's no history to go back to (e.g. direct link/shared URL),
  // fall back to the events listing page instead of doing nothing.
  function goBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/eventslisting')
    }
  }

  if (status === 'loading') {
    return (
      <section className="eventpage" data-lang={lang}>
        <div className="eventpage__hero eventpage__hero--skeleton" aria-hidden="true" />
        <p className="eventpage__status">{t.loading}</p>
      </section>
    )
  }

  if (status === 'notfound' || status === 'error') {
    return (
      <section className="eventpage" data-lang={lang}>
        <div className="eventpage__empty">
          <p className="eventpage__status">
            {status === 'notfound' ? t.notFound : t.error}
          </p>
          <button type="button" onClick={goBack} className="eventpage__back">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.back}
          </button>
        </div>
      </section>
    )
  }

  const name = pick(event.eventName, lang) || pick(event.title, lang)
  const client = pick(event.client, lang)
  const venue = pick(event.venue, lang)
  const format = pick(event.format, lang)
  const audience = pick(event.audience, lang)
  const about = pick(event.about, lang)
  const role = pick(event.role, lang)

  const meta = [
    { label: t.client, value: client },
    { label: t.venue, value: venue },
    { label: t.format, value: format },
    { label: t.audience, value: audience },
    { label: t.year, value: event.year },
  ].filter((m) => m.value)

  return (
    <section className="eventpage" data-lang={lang}>
      <button type="button" onClick={goBack} className="eventpage__back">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t.back}
      </button>

      <EventspageHero slides={heroSlides} name={name} venue={venue} year={event.year} meta={meta} />

      <div className="eventpage__content">
        {(about || role) && (
          <div className="eventpage__summary">
            {about && (
              <div className="eventpage__about">
                <span className="eventpage__label">{t.about}</span>
                <p className="eventpage__about-text">{about}</p>
              </div>
            )}

            {(role || meta.length > 0) && (
              <aside className="eventpage__sidebar">
                {role && (
                  <div className="eventpage__role">
                    <span className="eventpage__label">{t.role}</span>
                    <p className="eventpage__role-text">{role}</p>
                  </div>
                )}

                {meta.length > 0 && (
                  <dl className="eventpage__meta-list">
                    {meta.map((m) => (
                      <div className="eventpage__meta-row" key={m.label}>
                        <dt>{m.label}</dt>
                        <dd>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </aside>
            )}
          </div>
        )}

        <Gallery slides={gallerySlides} name={name} label={t.gallery} />

        <EventsVideo url={event.youtubeUrl} label={t.video} />
      </div>
    </section>
  )
}