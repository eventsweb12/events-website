'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import './contact.css'
import { useLanguage } from '../language/LanguageContext'
import { useForm, ValidationError } from '@formspree/react'

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
    sending: 'Sending...',
    note: "We'll be in touch within 48 hours.",
    errors: {
      required: 'This field is required.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      agree: 'Please check the box to confirm before sending.',
    },
    modal: {
      title: 'Message sent!',
      body: 'Thank you for reaching out. We will be in touch within 48 hours.',
      close: 'Close',
    },
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
    sending: 'იგზავნება...',
    note: 'დაგიკავშირდებით 48 საათის განმავლობაში.',
    errors: {
      required: 'გთხოვთ, შეავსოთ ეს ველი.',
      email: 'გთხოვთ, შეიყვანოთ სწორი ელ-ფოსტის მისამართი.',
      phone: 'გთხოვთ, შეიყვანოთ სწორი ტელეფონის ნომერი.',
      agree: 'გთხოვთ, მონიშნეთ ველი გასაგზავნად.',
    },
    modal: {
      title: 'შეტყობინება გაიგზავნა!',
      body: 'გმადლობთ მოწერისთვის. დაგიკავშირდებით 48 საათის განმავლობაში.',
      close: 'დახურვა',
    },
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

// Georgian mobile format: 9 digits starting with 5, optional +995 country code.
// Spaces / dashes / parentheses are allowed while typing and stripped before checking.
const PHONE_REGEX = /^(\+995)?5\d{8}$/

function isValidPhone(rawValue) {
  const cleaned = rawValue.trim().replace(/[\s\-()]/g, '')
  return PHONE_REGEX.test(cleaned)
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contact() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  const formRef = useRef(null)
  const [state, handleSubmit] = useForm('xvkoapgz')
  const [showModal, setShowModal] = useState(false)

  // Explicit, React-driven validation errors — we don't rely on the browser's
  // native validation bubble because it gets clipped/hidden by the
  // floating-label field styling (overflow/position tricks), which made the
  // form silently refuse to submit with no visible message.
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (state.succeeded) {
      setShowModal(true)
      setErrors({})
      formRef.current?.reset()
    }
  }, [state.succeeded])

  function closeModal() {
    setShowModal(false)
  }

  // Validates a single field by name/value, returns an error string or ''
  function validateField(name, value, checked) {
    if (name === 'agree') {
      return checked ? '' : t.errors.agree
    }
    const v = (value || '').trim()
    if (v === '') return t.errors.required
    if (name === 'email' && !EMAIL_REGEX.test(v)) return t.errors.email
    if (name === 'phone' && !isValidPhone(v)) return t.errors.phone
    return ''
  }

  // Re-check on every keystroke/toggle and clear/set that field's message live
  function handleFieldChange(e) {
    const el = e.target
    const value = el.type === 'checkbox' ? undefined : el.value
    const checked = el.type === 'checkbox' ? el.checked : undefined
    const message = validateField(el.name, value, checked)
    setErrors((prev) => ({ ...prev, [el.name]: message }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const form = formRef.current
    const data = new FormData(form)
    const nextErrors = {
      name: validateField('name', data.get('name')),
      email: validateField('email', data.get('email')),
      phone: validateField('phone', data.get('phone')),
      company: validateField('company', data.get('company')),
      agree: validateField('agree', undefined, form.elements.agree?.checked),
    }
    setErrors(nextErrors)

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) return

    handleSubmit(e)
  }

  return (
    <div className="contactpage" data-lang={lang}>
      <div className="contactpage__hero">
        <h1 className="contactpage__title">{t.title}</h1>
        <div className="contactpage__hero-rule" />
        <p className="contactpage__lead">{t.lead}</p>
      </div>

      <div className="contactpage__panel">
        <form
          ref={formRef}
          className="contactpage__form"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="contactpage__field">
            <input
              type="text"
              name="name"
              placeholder=" "
              onChange={handleFieldChange}
              aria-invalid={Boolean(errors.name)}
            />
            <label>{t.fields.name}</label>
            {errors.name && <p className="contactpage__field-error">{errors.name}</p>}
            <ValidationError prefix={t.fields.name} field="name" errors={state.errors} />
          </div>

          <div className="contactpage__field">
            <input
              type="email"
              name="email"
              placeholder=" "
              onChange={handleFieldChange}
              aria-invalid={Boolean(errors.email)}
            />
            <label>{t.fields.email}</label>
            {errors.email && <p className="contactpage__field-error">{errors.email}</p>}
            <ValidationError prefix={t.fields.email} field="email" errors={state.errors} />
          </div>

          <div className="contactpage__field">
            <input
              type="tel"
              name="phone"
              placeholder=" "
              onChange={handleFieldChange}
              aria-invalid={Boolean(errors.phone)}
            />
            <label>{t.fields.phone}</label>
            {errors.phone && <p className="contactpage__field-error">{errors.phone}</p>}
            <ValidationError prefix={t.fields.phone} field="phone" errors={state.errors} />
          </div>

          <div className="contactpage__field">
            <input
              type="text"
              name="company"
              placeholder=" "
              onChange={handleFieldChange}
              aria-invalid={Boolean(errors.company)}
            />
            <label>{t.fields.company}</label>
            {errors.company && <p className="contactpage__field-error">{errors.company}</p>}
            <ValidationError prefix={t.fields.company} field="company" errors={state.errors} />
          </div>

          <label className="contactpage__checkbox">
            <input
              type="checkbox"
              name="agree"
              onChange={handleFieldChange}
              aria-invalid={Boolean(errors.agree)}
            />
            <span className="contactpage__checkbox-box" aria-hidden="true" />
            <span className="contactpage__checkbox-text">{t.agree}</span>
          </label>
          {errors.agree && <p className="contactpage__field-error">{errors.agree}</p>}

          <div className="contactpage__form-footer">
            <p className="contactpage__note">{t.note}</p>
            <button type="submit" className="contactpage__submit" disabled={state.submitting}>
              {state.submitting ? t.sending : t.submit}
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

      {showModal && (
        <div className="contactpage__modal-overlay" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="contactpage__modal" onClick={(e) => e.stopPropagation()}>
            <div className="contactpage__modal-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.5 12.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="contactpage__modal-title">{t.modal.title}</h2>
            <p className="contactpage__modal-body">{t.modal.body}</p>
            <button className="contactpage__modal-close" onClick={closeModal}>
              {t.modal.close}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact