'use client'

import React from 'react'
import './whyus.css'
import { useLanguage } from '../language/LanguageContext'

const LABELS = {
  en: {
    eyebrow: 'Why us',
    heading: 'Why Us?',
    lead: 'We combine creativity, unconventional approaches, and an individual perspective to turn every project into a distinctive and memorable experience.',
    body: 'With 10 years of experience in the events industry, we have the expertise to plan every idea thoughtfully, pay attention to every detail, and bring it to life with excellence. We work with both local and international brands and believe that strong collaboration is the foundation for creating and delivering exceptional ideas.',
    statNumber: '10',
    statLabel: 'Years of experience',
  },
  ka: {
    eyebrow: 'რატომ ჩვენ',
    heading: 'რატომ ჩვენ?',
    lead: 'ჩვენ ვაერთიანებთ კრეატიულობას, არასტანდარტულ მიდგომებსა და ინდივიდუალურ ხედვას, რათა თითოეული პროექტი გამორჩეულ და დასამახსოვრებელ გამოცდილებად ვაქციოთ.',
    body: 'ივენთების სფეროში 10-წლიანი გამოცდილება გვაძლევს შესაძლებლობას, იდეა სწორად დავგეგმოთ, ყველა დეტალი გავითვალისწინოთ და ხარისხიანად განვახორციელოთ. ვთანამშრომლობთ როგორც ადგილობრივ, ისე საერთაშორისო ბრენდებთან და გვჯერა, რომ ძლიერი კოლაბორაციები საუკეთესო იდეების შექმნის მნიშვნელოვანი ნაწილია.',
    statNumber: '10',
    statLabel: 'წლიანი გამოცდილება',
  },
}

export default function WhyUs() {
  const { lang } = useLanguage()
  const t = LABELS[lang] || LABELS.en

  return (
    <section className="whyus" id="whyus" data-lang={lang}>
      <div className="whyus__intro">
        <span className="whyus__eyebrow">{t.eyebrow}</span>
        <h2 className="whyus__heading">{t.heading}</h2>
      </div>

      <div className="whyus__content">
        <div className="whyus__text">
          <p className="whyus__lead">{t.lead}</p>
          <p className="whyus__body">{t.body}</p>
        </div>

        <div className="whyus__stat">
          <span className="whyus__stat-number">{t.statNumber}</span>
          <span className="whyus__stat-label">{t.statLabel}</span>
        </div>
      </div>
    </section>
  )
}