'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import './blogpage.css'
import { useLanguage } from '../language/LanguageContext'
import BlogpageHero from './blogpagehero'

const API_URL = 'https://events-admin-omega.vercel.app/api/blog'

const LABELS = {
  en: { back: 'Back', error: 'Could not load this post.', notFound: 'Post not found.', loading: 'Loading…', source: 'Source', readFull: 'Read full article' },
  ka: { back: 'უკან', error: 'პოსტის ჩატვირთვა ვერ მოხერხდა.', notFound: 'პოსტი ვერ მოიძებნა.', loading: 'იტვირთება…', source: 'წყარო', readFull: 'სრული სტატიის ნახვა' },
}

function pick(field, lang) {
  if (!field) return ''
  return field[lang] || field.en || field.ka || ''
}

function formatDate(post, lang) {
  const raw = post?.publishedAt || post?.createdAt
  if (!raw) return ''
  const d = new Date(raw)
  return d.toLocaleDateString(lang === 'ka' ? 'ka-GE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const { id } = useParams()
  const router = useRouter()
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en

  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    if (!id) return

    async function load() {
      try {
        const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' })
        if (res.status === 404) {
          if (!cancelled) setStatus('notfound')
          return
        }
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setPost(data)
          setStatus('ready')
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch blog post:', err)
          setStatus('error')
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [id])

  const slides = useMemo(() => {
    if (!post) return []
    const urls = (post.images || []).map((img) => img?.url).filter(Boolean)
    return Array.from(new Set(urls))
  }, [post])

  function goBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/bloglisting')
    }
  }

  if (status === 'loading') {
    return (
      <section className="blogpage" data-lang={lang}>
        <div className="blogpage__media blogpage__media--skeleton" aria-hidden="true" />
        <p className="blogpage__status">{t.loading}</p>
      </section>
    )
  }

  if (status === 'notfound' || status === 'error') {
    return (
      <section className="blogpage" data-lang={lang}>
        <div className="blogpage__empty">
          <p className="blogpage__status">{status === 'notfound' ? t.notFound : t.error}</p>
          <button type="button" onClick={goBack} className="blogpage__back blogpage__back--standalone">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.back}
          </button>
        </div>
      </section>
    )
  }

  const title = pick(post.title, lang)
  const content = pick(post.content, lang)
  const date = formatDate(post, lang)
  const sourceName = post.source?.name
  const sourceUrl = post.source?.url

  return (
    <section className="blogpage blogpage--split" data-lang={lang}>
      <div className="blogpage__split">
        <BlogpageHero slides={slides} title={title} />

        <div className="blogpage__panel">
          <button type="button" onClick={goBack} className="blogpage__back blogpage__back--inline">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.back}
          </button>

          {date && <span className="blogpage__badge">{date}</span>}
          <h1 className="blogpage__title">{title}</h1>

          <article className="blogpage__article">
            <div className="blogpage__content" dangerouslySetInnerHTML={{ __html: content }} />

      {sourceName && sourceUrl && (
  <div className="blogpage__source">
    
      <a href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="blogpage__source-cta"
    >
      {t.readFull}
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>

    
     <a href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="blogpage__source-label"
    >
      {t.source}: {sourceName}
    </a>
  </div>
)}
          </article>
        </div>
      </div>
    </section>
  )
}