'use client'

import React, { useState } from 'react'
import './services.css'
import { useLanguage } from '../language/LanguageContext'

const serviceImages = ['/service/service1.jpg', '/service/service2.jpg', '/service/service3.jpg', '/service/service4.jpg', '/service/service5.jpg', '/service/service6.jpg', '/service/service7.jpg', '/service/service8.jpg', '/service/service9.jpg']
const COPY = {
  en: {
    eyebrowIndex: '09',
    eyebrowLabel: 'What we do',
    heading: 'Services',
    items: [
      { id: '01', image: serviceImages[0],
        title: 'Opening Events',
        desc: 'Full-service opening event production — from concept development to complete event execution.' },
      { id: '02', image: serviceImages[1],
        title: 'Brand Launches',
        desc: 'Launch events for new brands, products, and services — including concept development, creative solutions, and full event production.' },
      { id: '03', image: serviceImages[2],
        title: 'Promotional Events',
        desc: 'Promotional events and activations designed to create direct audience interaction, engagement, and meaningful brand experiences.' },
      { id: '04', image: serviceImages[3],
        title: 'Press Events & Lunches',
        desc: 'Press lunches, presentations, and exclusive events for media, partners, and invited guests.' },
      { id: '05', image: serviceImages[4],
        title: 'Kids & Family Activities',
        desc: 'Themed events and activities created for brands and commercial spaces — including International Children\u2019s Day, holiday events, and seasonal projects.' },
      { id: '06', image: serviceImages[5],
        title: 'Brand Experiences',
        desc: 'Creating immersive brand experiences and activities that build direct connections with audiences and strengthen brand engagement.' },
      { id: '07', image: serviceImages[6],
        title: 'Corporate Events',
        desc: 'Corporate anniversaries, annual celebrations, festive evenings, company milestones, and special occasions.' },
      { id: '08', image: serviceImages[7],
        title: 'Event Design & Creative Direction',
        desc: 'Creative event design and visual concepts for events, brands, and commercial spaces — from moodboards and visual identity to décor, styling, and overall event aesthetics.' },
      { id: '09', image: serviceImages[8],
        title: 'Event PR & Media Exposure',
        desc: 'Event PR and media support connecting with relevant media outlets, securing event coverage, and increasing brand visibility.' },
    ],
  },
  ka: {
    eyebrowIndex: '09',
    eyebrowLabel: 'რასაც ვაკეთებთ',
    heading: 'სერვისები',
    items: [
      { id: '01', image: serviceImages[0],
        title: 'გახსნის ღონისძიებები',
        desc: 'გახსნის ღონისძიებების სრული ორგანიზება — კონცეფციის შექმნიდან ღონისძიების სრულ წარმოებამდე.' },
      { id: '02', image: serviceImages[1],
        title: 'ბრენდის ლანჩები',
        desc: 'ახალი ბრენდების, პროდუქტებისა და სერვისების ლანჩი — კონცეფცია, კრეატიული გადაწყვეტა და ღონისძიების სრული წარმოება.' },
      { id: '03', image: serviceImages[2],
        title: 'საპრომოციო ღონისძიებები',
        desc: 'ბრენდების საპრომოციო ღონისძიებები და აქტივობები — კრეატიული ფორმატები აუდიტორიასთან პირდაპირი ინტერაქციისა და ბრენდის ჩართულობისთვის.' },
      { id: '04', image: serviceImages[3],
        title: 'პრეს ღონისძიებები და ლანჩები',
        desc: 'პრეს-ლანჩები, პრეზენტაციები და მედიისთვის, პარტნიორებისა და მოწვეული სტუმრებისთვის განკუთვნილი ღონისძიებები.' },
      { id: '05', image: serviceImages[4],
        title: 'საბავშვო აქტივობები',
        desc: 'ბრენდებისა და კომერციული სივრცეებისთვის შექმნილი თემატური ღონისძიებები და აქტივობები — ბავშვთა საერთაშორისო დღე, საახალწლო ღონისძიებები და სხვა სეზონური პროექტები.' },
      { id: '06', image: serviceImages[5],
        title: 'ბრენდული გამოცდილებები',
        desc: 'ბრენდთან დაკავშირებული გამოცდილებებისა და აქტივობების შექმნა, რომლებიც აუდიტორიასთან უშუალო კავშირს და ბრენდის გამოცდილებას აძლიერებს.' },
      { id: '07', image: serviceImages[6],
        title: 'კორპორაციული ღონისძიებები',
        desc: 'კომპანიის იუბილეები, წლის შემაჯამებელი ღონისძიებები, სადღესასწაულო საღამოები და მნიშვნელოვანი თარიღების აღნიშვნა.' },
      { id: '08', image: serviceImages[7],
        title: 'კრეატიული დიზაინი და არტ-დირექშენი',
        desc: 'ღონისძიებებისა და ბრენდებისთვის კრეატიული კონცეფციის, ვიზუალური მიმართულებისა და საერთო ესთეტიკის შექმნა — დეკორიდან და სტაილინგიდან ვიზუალურ დეტალებამდე.' },
      { id: '09', image: serviceImages[8],
        title: 'ღონისძიების PR და მედია გავრცელება',
        desc: 'ღონისძიების PR და მედია მხარდაჭერა, მედიებთან კომუნიკაცია, ღონისძიების გაშუქება და ბრენდის ხილვადობის გაზრდა.' },
    ],
  },
}

const SPANS = [
  'col2 row2', // 01
  'row2',      // 02
  'row2',      // 03
  'row2',      // 04
  'col2 row2', // 05
  'col2',      // 06
  'col2',      // 07
  'col2',      // 08
  'col2',      // 09
]

export default function Services() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [active, setActive] = useState(null)

  return (
    <section className="services" id="services" data-lang={lang}>
      <div className="services__intro">
        <span className="services__eyebrow">
          {t.eyebrowIndex} / {t.eyebrowLabel}
        </span>
        <h2 className="services__heading">{t.heading}</h2>
      </div>

      <div className="services__grid">
        {t.items.map((s, i) => {
          const spanClasses = SPANS[i]
            .split(' ')
            .filter(Boolean)
            .map((c) => `services__item--${c}`)
            .join(' ')

          return (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              className={`services__item ${spanClasses}`}
              style={{ backgroundImage: `url(${s.image})` }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              aria-expanded={active === i}
            >
              <div className="services__scrim" aria-hidden="true" />
              <span className="services__number">{s.id}</span>
              <div className="services__body">
                <span className="services__title">{s.title}</span>
                <span className="services__desc">{s.desc}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}