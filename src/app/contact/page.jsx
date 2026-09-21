import Contact from '../../contact/contact'

export const metadata = {
  title: "Contact | Motion Concept",
  description:
    "Get in touch with Motion Concept to plan your next event in Tbilisi — brand launches, corporate events, opening events and more. / დაგვიკავშირდით ღონისძიების დასაგეგმად.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Motion Concept",
    description:
      "Get in touch with Motion Concept to plan your next event in Tbilisi.",
    url: "https://motionconcept.ge/contact",
    type: "website",
  },
}

export default function contactPage(){
    return(
        <Contact/>
    )
}