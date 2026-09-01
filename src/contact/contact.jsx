'use client'

import React from 'react'
import Link from 'next/link'
import './contact.css'
import { useLanguage } from '../language/LanguageContext'

const logo = '/logos/logo3.gif'

const COPY = {
  en: {
    eyebrow: 'Get in touch',
    title: 'Contact us',
    lead: 'To provide you with the best possible offer, we’d like to learn more about your specific needs and requirements. Please don’t hesitate to get in touch with us.',
    fields: {
  name: 'Name',
  company: 'Company',
  phone: 'Phone',
  email: 'Email',
},
    agree: 'I agree to be contacted regarding my inquiry.',
    submit: 'Send',
    note: "We'll be in touch within 48 hours.",
  },
  ka: {
    eyebrow: 'დაგვიკავშირდით',
    title: 'კონტაქტი',
    lead: 'საუკეთესო შეთავაზების მოსამზადებლად გვსურს, უკეთ გავიგოთ თქვენი საჭიროებები და მოთხოვნები. მოგვწერეთ დაუყოვნებლივ.',
   fields: {
  name: 'სახელი',
  company: 'კომპანია',
  phone: 'ტელეფონი',
  email: 'ელ-ფოსტა',
},
    agree: 'ვეთანხმები, რომ დამიკავშირდნენ ჩემი მოთხოვნის შესახებ.',
    submit: 'გაგზავნა',
    note: 'დაგიკავშირდებით 48 საათის განმავლობაში.',
  },
}

// TODO: replace with real values
const CONTACT_INFO = {
  email: 'hello@motionconcept.ge',
  phone: '+995 551 11 13 11',
  phoneCode: '+995',
}

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/yourstudio',
    shape: 'circle',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M14.5 9H16V6.5h-1.5c-1.66 0-3 1.34-3 3V11H10v2.5h1.5V18H14v-4.5h1.75L16.25 11H14V9.5c0-.28.22-.5.5-.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yourstudio',
    shape: 'square',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/yourstudio',
    shape: 'square',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <rect x="4.2" y="9.2" width="2.6" height="8.4" rx="0.4" />
        <circle cx="5.5" cy="6" r="1.6" />
        <path d="M9.8 9.2h2.5v1.3c.5-.8 1.4-1.5 2.9-1.5 2.4 0 3.4 1.6 3.4 4v4.6h-2.6v-4.1c0-1.1-.4-1.8-1.4-1.8-1.1 0-1.6.7-1.6 1.8v4.1H9.8V9.2Z" />
      </svg>
    ),
  },
]

function Contact() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="contactpage" data-lang={lang}>
      <div className="contactpage__hero">
        <h1 className="contactpage__title">{t.title}</h1>
        <div className="contactpage__hero-rule" />
        <p className="contactpage__lead">{t.lead}</p>
      </div>

      <div className="contactpage__panel">
        <form className="contactpage__form" onSubmit={handleSubmit}>
          <div className="contactpage__field">
            <input type="text" placeholder=" " required />
            <label>{t.fields.name}</label>
          </div>

          <div className="contactpage__field">
            <input type="email" placeholder=" " required />
            <label>{t.fields.email}</label>
          </div>


<div className="contactpage__field">
  <input type="tel" placeholder=" " required />
  <label>{t.fields.phone}</label>
</div>


          <div className="contactpage__field">
            <input type="text" placeholder=" " required />
            <label>{t.fields.company}</label>
          </div>

          <label className="contactpage__checkbox">
            <input type="checkbox" required />
            <span className="contactpage__checkbox-box" aria-hidden="true" />
            <span className="contactpage__checkbox-text">{t.agree}</span>
          </label>

          <div className="contactpage__form-footer">
            <p className="contactpage__note">{t.note}</p>
            <button type="submit" className="contactpage__submit">
              {t.submit}
            </button>
          </div>
        </form>

        <div className="contactpage__info">
          <div className="contactpage__info-top">
            <img src={logo} alt="Logo" className="contactpage__logo" />

            <span className="contactpage__info-divider" aria-hidden="true" />

            <div className="contactpage__info-block">
              <a className="contactpage__info-line contactpage__info-link" href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </a>
              <a className="contactpage__info-line contactpage__info-link" href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}>
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          <div className="contactpage__socials">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contactpage__social contactpage__social--${s.shape}`}
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact