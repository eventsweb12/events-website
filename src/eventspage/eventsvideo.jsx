'use client'

import React, { useMemo } from 'react'
import './eventspage.css'

function getYoutubeId(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1)
    }
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1]
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/shorts/')[1]
    }
  } catch {
    return null
  }
  return null
}

export default function EventsVideo({ url, label = 'Video' }) {
  const videoId = useMemo(() => getYoutubeId(url), [url])

  if (!videoId) return null

  return (
    <div className="eventpage__video">
      <span className="eventpage__label">{label}</span>
      <div className="eventpage__video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={label}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  )
}