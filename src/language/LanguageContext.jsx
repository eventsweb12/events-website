'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children, defaultLang = 'en' }) {
  // Must be identical on server and on the first client render
  const [lang, setLang] = useState(defaultLang)
  const [ready, setReady] = useState(false)

  // 1) After hydration: read the saved language
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'ka') setLang(saved)
    } catch {}
    setReady(true)
  }, [])

  // 2) Save only after the saved value has been read,
  //    otherwise 'en' would overwrite the stored 'ka'
  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem('lang', lang)
    } catch {}
    document.documentElement.lang = lang
  }, [lang, ready])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'ka' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}