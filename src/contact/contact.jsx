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
      phone: 'Tel',
      email: 'Email',
    },
    agree: 'I agree to be contacted regarding my inquiry.',
    submit: 'Send',
    note: "We'll be in touch within 48 hours.",
    infoTitle: 'Contact details',
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
    infoTitle: 'საკონტაქტო ინფორმაცია',
  },
}

// TODO: replace with real values
const CONTACT_INFO = {
  address: 'Tbilisi, Georgia',
  email: 'info@yourstudio.com',
  phone: '+995 000 00 00 00',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/yourstudio' },
    { label: 'Facebook', href: 'https://facebook.com/yourstudio' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/yourstudio' },
  ],
}

function Contact() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="contactpage" data-lang={lang}>
      <div className="contactpage__hero">
        <p className="contactpage__eyebrow">{t.eyebrow}</p>
        <h1 className="contactpage__title">{t.title}</h1>
        <div className="contactpage__hero-rule" />
        <p className="contactpage__lead">{t.lead}</p>
      </div>

      <div className="contactpage__body">
        <form className="contactpage__form" onSubmit={handleSubmit}>
          <div className="contactpage__row">
            <div className="contactpage__field">
              <input type="text" placeholder=" " required />
              <label>{t.fields.name}</label>
            </div>
          </div>

          <div className="contactpage__row">
            <div className="contactpage__field">
              <input type="email" placeholder=" " required />
              <label>{t.fields.email}</label>
            </div>
            <div className="contactpage__field">
              <input type="tel" placeholder=" " required />
              <label>{t.fields.phone}</label>
            </div>
          </div>

          <div className="contactpage__row">
            <div className="contactpage__field">
              <input type="text" placeholder=" " required />
              <label>{t.fields.company}</label>
            </div>
          </div>

          <label className="contactpage__checkbox">
            <input type="checkbox" required />
            <span className="contactpage__checkbox-box" aria-hidden="true" />
            <span className="contactpage__checkbox-text">{t.agree}</span>
          </label>

          <button type="submit" className="contactpage__submit">
            {t.submit}
          </button>
          <p className="contactpage__note">{t.note}</p>
        </form>

        <div className="contactpage__divider" aria-hidden="true" />

        <div className="contactpage__info">
          <img src={logo} alt="Logo" className="contactpage__logo" />

          <div className="contactpage__info-block">
            <span className="contactpage__info-label">{t.infoTitle}</span>
            <p className="contactpage__info-line">{CONTACT_INFO.address}</p>
            <a className="contactpage__info-line contactpage__info-link" href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </a>
            <a className="contactpage__info-line contactpage__info-link" href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}>
              {CONTACT_INFO.phone}
            </a>
          </div>

          <div className="contactpage__socials">
            {CONTACT_INFO.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contactpage__social">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact