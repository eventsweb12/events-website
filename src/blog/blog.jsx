'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'
import './blog.css'
import { useLanguage } from '../language/LanguageContext'

const API_URL = 'https://events-admin-omega.vercel.app/api/blog'
const TOTAL = 8 // total posts fetched, all shown in the slider

const LABELS = {
  en: { eyebrowLabel: 'From the journal', heading: 'Blog', empty: 'No posts yet.', error: 'Could not load posts.', prev: 'Previous', next: 'Next' },
  ka: { eyebrowLabel: 'ბლოგიდან', heading: 'ბლოგი', empty: 'პოსტები ჯერ არ არის.', error: 'პოსტების ჩატვირთვა ვერ მოხერხდა.', prev: 'წინა', next: 'შემდეგი' },
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

export default function Blog() {
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en
  const swiperRef = useRef(null)

  const [posts, setPosts] = useState([])
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
          const sorted = Array.isArray(data)
            ? [...data].filter((p) => p.published !== false).sort(byLatest)
            : []
          setPosts(sorted.slice(0, TOTAL))
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

  const showSwiperControls = status === 'ready' && posts.length > 4

  return (
    <section className="blog" data-lang={lang} id="blog">
      <div className="blog__intro">
        <span className="blog__eyebrow">{t.eyebrowLabel}</span>
        <h2 className="blog__heading">{t.heading}</h2>
      </div>

      {status === 'loading' && (
        <div className="blog__grid" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="blog__card blog__card--skeleton" key={i}>
              <div className="blog__image blog__image--skeleton" />
              <div className="blog__line blog__line--skeleton" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && <p className="blog__status">{t.error}</p>}

      {status === 'ready' && posts.length === 0 && (
        <p className="blog__status">{t.empty}</p>
      )}

      {status === 'ready' && posts.length > 0 && (
        <div className="blog__swiper-block">
          <div className="blog__swiper-head">
            {showSwiperControls && (
              <div className="blog__controls">
                <span className="blog__count">
                  <span className="blog__count-active">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="blog__count-sep">/</span>
                  <span className="blog__count-total">
                    {String(posts.length).padStart(2, '0')}
                  </span>
                </span>

                <button
                  type="button"
                  className="blog__arrow blog__arrow--prev"
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
                  className="blog__arrow blog__arrow--next"
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
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            className="blog__swiper"
          >
            {posts.map((post) => {
              const title = pick(post.title, lang)
              const excerpt = pick(post.excerpt, lang)
              const image = pickImage(post)

              return (
                <SwiperSlide key={post._id}>
                  <a className="blog__card" href={`/blog/${post.slug || post._id}`}>
                    <div className="blog__image-wrap">
                      {image && (
                        <img className="blog__image" src={image} alt={title} loading="lazy" />
                      )}
                      <div className="blog__scrim" aria-hidden="true" />
                    </div>

                    <div className="blog__body">
                      <h3 className="blog__name">{title}</h3>
                      {excerpt && <p className="blog__desc">{excerpt}</p>}
                    </div>
                  </a>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      )}
    </section>
  )
}