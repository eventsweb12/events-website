'use client'

import React, { useEffect, useRef, useState } from 'react'
import './stats.css'
import { useLanguage } from '../language/LanguageContext'

const COPY = {
  en: {
    stats: [
       { value: 290, suffix: '+', label: 'Projects delivered' },
        { value: 50, suffix: '+', label: 'Clients served' },
      { value: 8, suffix: '+', label: 'Years of industry experience' },
     
     
    ],
  },
  ka: {
    stats: [
      { value: 290, suffix: '+', label: 'განხორციელებული პროექტი' },
      { value: 50, suffix: '+', label: 'კმაყოფილი კლიენტი' },
      { value: 8, suffix: '+', label: 'წლიანი გამოცდილება ინდუსტრიაში' },
      
    ],
  },
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

// Counts a value up to `target` once `active` becomes true.
function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(target)
      return
    }

    startRef.current = null

    const tick = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutExpo(progress) * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target, duration])

  return value
}

function StatValue({ target, active, delay }) {
  const value = useCountUp(target, active, 1300 + delay)
  return <span className="stats__number">{value}</span>
}

export default function Stats() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const sectionRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats" id="stats" data-lang={lang} ref={sectionRef}>
      <div className="stats__row">
        {t.stats.map((s, i) => (
          <div className="stats__item" key={s.label}>
            <div className="stats__value">
              <StatValue target={s.value} active={active} delay={i * 150} />
              <span className="stats__suffix">{s.suffix}</span>
            </div>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}