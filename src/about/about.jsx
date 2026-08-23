'use client'

import React from 'react'
import './about.css'
import { useLanguage } from '../language/LanguageContext'

const COPY = {
  en: {
    eyebrow: 'About Us',
    lead: [
      'Every extraordinary event starts with an idea.',
      'An idea with the power to bring people together, create emotion and turn a moment into an unforgettable experience.',
      'From creative concept to flawless execution, every detail has one purpose — to create an event with its own character, energy and meaning.',
    ],
    pillars: [
      { word: 'Creativity', desc: 'to see beyond the expected.' },
      { word: 'Precision', desc: 'to turn every idea into reality.' },
      { word: 'Energy', desc: 'to make every moment feel alive.' },
    ],
       closing: [
      'It’s not simply about creating events.',
      'It’s about creating atmosphere, emotion and stories that connect people.',
      'Because the best events are the ones people leave saying:',
    ],
    quote: 'That was truly something special.',
  },
  ka: {
    eyebrow: 'ჩვენ შესახებ',
    lead: [
      'ყველა განსაკუთრებული ღონისძიება იდეით იწყება.',
      'იდეით, რომელსაც შეუძლია ადამიანების გაერთიანება, ემოციის შექმნა და მომენტის დაუვიწყარ გამოცდილებად ქცევა.',
      'კრეატიული კონცეფციიდან იდეალურ შესრულებამდე, თითოეული დეტალი ერთ მიზანს ემსახურება — შეიქმნას ღონისძიება, რომელსაც თავისი ხასიათი აქვს და რომელიც ადამიანებს დარჩებათ.',
    ],
    pillars: [
      { word: 'კრეატიულობა', desc: 'ახალი ხედვების მოსაძებნად.' },
      { word: 'სიზუსტე', desc: 'იდეის სრულყოფილად განსახორციელებლად.' },
      { word: 'ენერგია', desc: 'თითოეული მომენტი ცოცხალი და განსაკუთრებული რომ იყოს.' },
    ],
    closing: [
      'აქ არ იქმნება უბრალოდ ღონისძიებები.',
      'იქმნება ატმოსფერო, ემოცია და ისტორიები, რომლებიც ადამიანებს ერთმანეთთან აკავშირებს.',
      'რადგან საუკეთესო ღონისძიება ის არის, რომლის დასრულების შემდეგაც ამბობენ:',
    ],
    quote: 'ეს ნამდვილად განსაკუთრებული იყო.',
  },
}

export default function About() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="about" id="about" data-lang={lang}>
      <span className="about__eyebrow">{t.eyebrow}</span>

      <div className="about__top">
        <div className="about__lead">
          <p className="about__lead-line about__lead-line--big">{t.lead[0]}</p>
          <p className="about__lead-line">{t.lead[1]}</p>
          <p className="about__lead-line">{t.lead[2]}</p>
        </div>

        <ul className="about__pillars">
          {t.pillars.map((p) => (
            <li className="about__pillar" key={p.word}>
              <span className="about__pillar-word">{p.word}</span>
              <span className="about__pillar-desc">{p.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__closing">
        <div className="about__closing-text">
          {t.closing.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <blockquote className="about__stamp">
          <span className="about__stamp-mark" aria-hidden="true">"</span>
          <p>{t.quote}</p>
        </blockquote>
      </div>
    </section>
  )
}