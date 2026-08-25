'use client'

import React from 'react'
import './contact.css'
import { useLanguage } from '../language/LanguageContext'

const COPY = {
  en: {
    eyebrow: 'Get in touch',
    title: 'Contact us',
    lead: 'We handle everything from strategy, planning, and production. Hand us a brief. We handle the rest.',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      title: 'Title',
      company: 'Company',
      website: 'Website',
      phone: 'Phone',
      email: 'Email',
      budget: 'Budget',
      keywords: 'Keywords searched',
      details: 'Project details (What? When? Where?)',
    },
    submit: 'Send',
    note: "We'll be in touch within 48 hours.",
  },
  ka: {
    eyebrow: 'დაგვიკავშირდით',
    title: 'კონტაქტი',
    lead: 'ჩვენ ვმართავთ ყველაფერს — სტრატეგიიდან დაგეგმვამდე და წარმოებამდე. გადმოგვეცით თქვენი იდეა, დანარჩენს ჩვენ ვიღებთ თავზე.',
    fields: {
      firstName: 'სახელი',
      lastName: 'გვარი',
      title: 'თანამდებობა',
      company: 'კომპანია',
      website: 'ვებგვერდი',
      phone: 'ტელეფონი',
      email: 'ელ-ფოსტა',
      budget: 'ბიუჯეტი',
      keywords: 'საძიებო სიტყვები',
      details: 'პროექტის დეტალები (რა? როდის? სად?)',
    },
    submit: 'გაგზავნა',
    note: 'დაგიკავშირდებით 48 საათის განმავლობაში.',
  },
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
              <label>{t.fields.firstName}</label>
            </div>
            <div className="contactpage__field">
              <input type="text" placeholder=" " required />
              <label>{t.fields.lastName}</label>
            </div>
          </div>

          <div className="contactpage__row">
            <div className="contactpage__field">
              <input type="text" placeholder=" " required />
              <label>{t.fields.company}</label>
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
              <label>{t.fields.budget}</label>
            </div>
          </div>

          <div className="contactpage__row">
            <div className="contactpage__field">
              <textarea placeholder=" " required />
              <label>{t.fields.details}</label>
            </div>
          </div>

          <button type="submit" className="contactpage__submit">
            {t.submit}
          </button>
          <p className="contactpage__note">{t.note}</p>
        </form>
      </div>
    </div>
  )
}

export default Contact