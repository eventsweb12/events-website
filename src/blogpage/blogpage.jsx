'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import './blogpage.css'
import { useLanguage } from '../language/LanguageContext'
import BlogpageHero from './blogpagehero'

const API_URL = 'https://events-admin-omega.vercel.app/api/blog'

const LABELS = {
  en: { back: 'Back', error: 'Could not load this post.', notFound: 'Post not found.', loading: 'Loading…' },
  ka: { back: 'უკან', error: 'პოსტის ჩატვირთვა ვერ მოხერხდა.', notFound: 'პოსტი ვერ მოიძებნა.', loading: 'იტვირთება…' },
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
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error' | 'notfound'

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

  // Same pattern as Eventspage: prefer real browser history (works whether
  // the user came from "/" via the blog section or from "/blog" directly),
  // and only fall back to a fixed route when there's no history to return to
  // (e.g. a shared link opened straight into this page).
  function goBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/blog')
    }
  }

  if (status === 'loading') {
    return (
      <section className="blogpage" data-lang={lang}>
        <div className="blogpage__hero blogpage__hero--skeleton" aria-hidden="true" />
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

  return (
    <section className="blogpage" data-lang={lang}>
      <button type="button" onClick={goBack} className="blogpage__back">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t.back}
      </button>

      <BlogpageHero slides={slides} title={title} date={date} />

      <div className="blogpage__content-wrap">
        <article className="blogpage__article">
          <div className="blogpage__content" dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </section>
  )
}