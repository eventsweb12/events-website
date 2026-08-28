'use client'

import React, { useEffect, useState } from 'react'
import './bloglisting.css'
import { useLanguage } from '../language/LanguageContext'

const API_URL = 'https://events-admin-omega.vercel.app/api/blog'
const PER_PAGE = 12

const LABELS = {
  en: {
    eyebrowLabel: 'From the journal',
    heading: 'Blog',
    empty: 'No posts yet.',
    error: 'Could not load posts.',
    prev: 'Previous',
    next: 'Next',
  },
  ka: {
    eyebrowLabel: 'ბლოგიდან',
    heading: 'ბლოგი',
    empty: 'პოსტები ჯერ არ არის.',
    error: 'პოსტების ჩატვირთვა ვერ მოხერხდა.',
    prev: 'წინა',
    next: 'შემდეგი',
  },
}

// Blog API keys fields directly as { ka, en } — unlike events, which uses { geo, eng }.
function pick(field, lang) {
  if (!field) return ''
  return field[lang] || field.en || field.ka || ''
}

// images[] entries are objects: { alt: { ka, en }, url, _id } — not plain strings.
function pickImage(post) {
  const img = post.images && post.images[0]
  return img && img.url ? img.url : ''
}

function byLatest(a, b) {
  const ta = new Date(a.publishedAt || a.createdAt || 0).getTime()
  const tb = new Date(b.publishedAt || b.createdAt || 0).getTime()
  if (ta !== tb) return tb - ta
  return String(b._id).localeCompare(String(a._id))
}

export default function BlogListing() {
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en

  const [posts, setPosts] = useState([])
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
          const sorted = Array.isArray(data)
            ? [...data].filter((p) => p.published !== false).sort(byLatest)
            : []
          setPosts(sorted)
          setStatus('ready')
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch blog posts:', err)
          setStatus('error')
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
  const start = (page - 1) * PER_PAGE
  const pagePosts = posts.slice(start, start + PER_PAGE)

  function goTo(p) {
    const clamped = Math.min(Math.max(p, 1), totalPages)
    setPage(clamped)
    // scroll back to top of the section on page change
    document.getElementById('blog-listing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="bloglisting" data-lang={lang} id="blog-listing">
      <div className="bloglisting__intro">
        <span className="bloglisting__eyebrow">{t.eyebrowLabel}</span>
        <h2 className="bloglisting__heading">{t.heading}</h2>
      </div>

      {status === 'loading' && (
        <div className="bloglisting__grid" aria-hidden="true">
          {Array.from({ length: PER_PAGE }).map((_, i) => (
            <div className="bloglisting__card bloglisting__card--skeleton" key={i}>
              <div className="bloglisting__image bloglisting__image--skeleton" />
              <div className="bloglisting__line bloglisting__line--skeleton" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && <p className="bloglisting__status">{t.error}</p>}

      {status === 'ready' && posts.length === 0 && (
        <p className="bloglisting__status">{t.empty}</p>
      )}

      {status === 'ready' && posts.length > 0 && (
        <>
          <div className="bloglisting__grid">
            {pagePosts.map((post) => {
              const title = pick(post.title, lang)
              const excerpt = pick(post.excerpt, lang)
              const image = pickImage(post)

              return (
                
                 <a key={post._id}
  className="bloglisting__card"
  href={`/blog/${post.slug || post._id}`}
>
                  <div className="bloglisting__image-wrap">
                    {image && (
                      <img
                        className="bloglisting__image"
                        src={image}
                        alt={title}
                        loading="lazy"
                      />
                    )}
                    <div className="bloglisting__scrim" aria-hidden="true" />
                  </div>

                  <div className="bloglisting__body">
                    <h3 className="bloglisting__name">{title}</h3>
                    {excerpt && <p className="bloglisting__desc">{excerpt}</p>}
                  </div>
                </a>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="bloglisting__pagination">
              <button
                type="button"
                className="bloglisting__arrow"
                aria-label={t.prev}
                disabled={page === 1}
                onClick={() => goTo(page - 1)}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="bloglisting__pages">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const num = i + 1
                  return (
                    <button
                      key={num}
                      type="button"
                      className={`bloglisting__page${num === page ? ' is-active' : ''}`}
                      onClick={() => goTo(num)}
                    >
                      {String(num).padStart(2, '0')}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="bloglisting__arrow"
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