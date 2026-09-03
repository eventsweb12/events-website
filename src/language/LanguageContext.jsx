'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children, defaultLang = 'en' }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || defaultLang
    }
    return defaultLang
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

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