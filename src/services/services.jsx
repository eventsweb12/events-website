'use client'

import React, { useRef, useState } from 'react'
import './services.css'
import { useLanguage } from '../language/LanguageContext'

const COPY = {
  en: {
    eyebrowIndex: '09',
    eyebrowLabel: 'What we do',
    heading: 'Services',
    toggleMore: 'Show all services',
    toggleLess: 'Show less',
    items: [
      { id: '01', variant: 'red', title: 'Opening Events',
        desc: 'Full-service opening event production — from concept development to complete event execution.' },
      { id: '02', variant: 'black', title: 'Brand Launches',
        desc: 'Launch events for new brands, products, and services — including concept development, creative solutions, and full event production.' },
      { id: '03', variant: 'white', title: 'Promotional Events',
        desc: 'Promotional events and activations designed to create direct audience interaction, engagement, and meaningful brand experiences.' },
      { id: '04', variant: 'black', title: 'Press Events & Lunches',
        desc: 'Press lunches, presentations, and exclusive events for media, partners, and invited guests.' },
      { id: '05', variant: 'white', title: 'Kids & Family Activities',
        desc: 'Themed events and activities created for brands and commercial spaces — including International Children\u2019s Day, holiday events, and seasonal projects.' },
      { id: '06', variant: 'red', title: 'Brand Experiences',
        desc: 'Creating immersive brand experiences and activities that build direct connections with audiences and strengthen brand engagement.' },
      { id: '07', variant: 'white', title: 'Corporate Events',
        desc: 'Corporate anniversaries, annual celebrations, festive evenings, company milestones, and special occasions.' },
      { id: '08', variant: 'red', title: 'Event Design & Creative Direction',
        desc: 'Creative event design and visual concepts for events, brands, and commercial spaces — from moodboards and visual identity to décor, styling, and overall event aesthetics.' },
      { id: '09', variant: 'black', title: 'Event PR & Media Exposure',
        desc: 'Event PR and media support connecting with relevant media outlets, securing event coverage, and increasing brand visibility.' },
    ],
  },
  ka: {
    eyebrowIndex: '09',
    eyebrowLabel: 'რასაც ვაკეთებთ',
    heading: 'სერვისები',
    toggleMore: 'ყველა სერვისის ნახვა',
    toggleLess: 'ნაკლების ჩვენება',
    items: [
      { id: '01', variant: 'red', title: 'გახსნის ღონისძიებები',
        desc: 'გახსნის ღონისძიებების სრული ორგანიზება — კონცეფციის შექმნიდან ღონისძიების სრულ წარმოებამდე.' },
      { id: '02', variant: 'black', title: 'ბრენდის ლანჩები',
        desc: 'ახალი ბრენდების, პროდუქტებისა და სერვისების ლანჩი — კონცეფცია, კრეატიული გადაწყვეტა და ღონისძიების სრული წარმოება.' },
      { id: '03', variant: 'white', title: 'საპრომოციო ღონისძიებები',
        desc: 'ბრენდების საპრომოციო ღონისძიებები და აქტივობები — კრეატიული ფორმატები აუდიტორიასთან პირდაპირი ინტერაქციისა და ბრენდის ჩართულობისთვის.' },
      { id: '04', variant: 'black', title: 'პრეს ღონისძიებები და ლანჩები',
        desc: 'პრეს-ლანჩები, პრეზენტაციები და მედიისთვის, პარტნიორებისა და მოწვეული სტუმრებისთვის განკუთვნილი ღონისძიებები.' },
      { id: '05', variant: 'white', title: 'საბავშვო აქტივობები',
        desc: 'ბრენდებისა და კომერციული სივრცეებისთვის შექმნილი თემატური ღონისძიებები და აქტივობები — ბავშვთა საერთაშორისო დღე, საახალწლო ღონისძიებები და სხვა სეზონური პროექტები.' },
      { id: '06', variant: 'red', title: 'ბრენდული გამოცდილებები',
        desc: 'ბრენდთან დაკავშირებული გამოცდილებებისა და აქტივობების შექმნა, რომლებიც აუდიტორიასთან უშუალო კავშირს და ბრენდის გამოცდილებას აძლიერებს.' },
      { id: '07', variant: 'white', title: 'კორპორაციული ღონისძიებები',
        desc: 'კომპანიის იუბილეები, წლის შემაჯამებელი ღონისძიებები, სადღესასწაულო საღამოები და მნიშვნელოვანი თარიღების აღნიშვნა.' },
      { id: '08', variant: 'red', title: 'კრეატიული დიზაინი და არტ-დირექშენი',
        desc: 'ღონისძიებებისა და ბრენდებისთვის კრეატიული კონცეფციის, ვიზუალური მიმართულებისა და საერთო ესთეტიკის შექმნა — დეკორიდან და სტაილინგიდან ვიზუალურ დეტალებამდე.' },
      { id: '09', variant: 'black', title: 'ღონისძიების PR და მედია გავრცელება',
        desc: 'ღონისძიების PR და მედია მხარდაჭერა, მედიებთან კომუნიკაცია, ღონისძიების გაშუქება და ბრენდის ხილვადობის გაზრდა.' },
    ],
  },
}

export default function Services() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [expanded, setExpanded] = useState(false)
  const toggleRef = useRef(null)

  const handleToggle = () => {
    const collapsing = expanded
    setExpanded((v) => !v)

    if (collapsing) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          toggleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        })
      })
    }
  }

  return (
    <section className="services" id="services" data-lang={lang}>
      <div className="services__inner">
        <div className="services__intro">
          <span className="services__eyebrow">
            {t.eyebrowIndex} / {t.eyebrowLabel}
          </span>
          <h2 className="services__heading">{t.heading}</h2>
        </div>

        <div className={`services__grid${expanded ? ' is-expanded' : ''}`}>
          {t.items.map((s) => (
            <div
              className="services__card"
              data-variant={s.variant}
              data-number={s.id}
              key={s.id}
            >
              <span className="services__card-number">{s.id}</span>
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="services__toggle"
          onClick={handleToggle}
          aria-expanded={expanded}
          ref={toggleRef}
        >
          {expanded ? t.toggleLess : t.toggleMore}
          <span className="services__toggle-arrow" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}