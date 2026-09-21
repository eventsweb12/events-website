import EventsListing from '../../eventslisting/eventslisting'

export const metadata = {
  title: "Events | Motion Concept",
  description:
    "Explore Motion Concept's portfolio of creative events in Tbilisi — brand launches, opening events, corporate events and unforgettable brand experiences. / ჩვენი ღონისძიებების პორტფოლიო — ბრენდის გახსნები, კორპორატიული და პრომო ღონისძიებები თბილისში.",
  alternates: { canonical: "/eventslisting" },
  openGraph: {
    title: "Events | Motion Concept",
    description:
      "Explore Motion Concept's portfolio of creative events in Tbilisi — brand launches, opening events, corporate events and brand experiences.",
    url: "https://motionconcept.ge/eventslisting",
    type: "website",
  },
}

export default function EventsPage() {
  return (
    <main className="events-page">
      <EventsListing />
    </main>
  )
}