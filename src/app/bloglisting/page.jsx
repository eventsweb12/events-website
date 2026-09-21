import BlogListing from '../../bloglisting/bloglisting'

export const metadata = {
  title: "Blog | Motion Concept",
  description:
    "Insights, behind-the-scenes stories and updates from Motion Concept — Tbilisi's creative events agency. / სიახლეები და კულისებს მიღმა ისტორიები ჩვენი ღონისძიებებიდან.",
  alternates: { canonical: "/bloglisting" },
  openGraph: {
    title: "Blog | Motion Concept",
    description:
      "Insights, behind-the-scenes stories and updates from Motion Concept — Tbilisi's creative events agency.",
    url: "https://motionconcept.ge/bloglisting",
    type: "website",
  },
}

export default function Page() {
  return (
    <div>
      <BlogListing />
    </div>
  )
}