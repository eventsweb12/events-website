import "./globals.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import { LanguageProvider } from "../language/LanguageContext";

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'), // შეცვალე რეალურით
  title: {
    default: "Motion Concept | Creative Events & Brand Experiences",
    template: "%s | Motion Concept",
  },
  description:
    "Motion Concept is a full-service creative events agency in Tbilisi with 10+ years of experience. We deliver opening events, brand launches, promotional events, corporate events, and brand experiences — from concept to flawless execution.",
  keywords: [
    "event agency Tbilisi",
    "creative events Georgia",
    "brand launch events",
    "corporate events Tbilisi",
    "event production Georgia",
    "opening events",
    "brand experiences",
    "event design and creative direction",
    "ღონისძიებების სააგენტო",
    "ივენთების ორგანიზება თბილისში",
    "ბრენდის ღონისძიება",
  ],
  authors: [{ name: "Motion Concept" }],
  creator: "Motion Concept",
  publisher: "Motion Concept",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ka-GE": "/ka",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ka_GE",
    url: "https://yourdomain.com",
    siteName: "Motion Concept",
    title: "Motion Concept | Creative Events & Brand Experiences",
    description:
      "Full-service creative events agency delivering opening events, brand launches, and unforgettable brand experiences across Georgia and beyond.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630 რეკომენდირებული
        width: 1200,
        height: 630,
        alt: "Motion Concept — Creative Events & Brand Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motion Concept | Creative Events & Brand Experiences",
    description:
      "Full-service creative events agency delivering opening events, brand launches, and unforgettable brand experiences.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}