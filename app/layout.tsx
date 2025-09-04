import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://goodcode.com'),
  title: {
    default: "GoodCode - Programming Education That Works",
    template: "%s | GoodCode"
  },
  description: "Transform your coding journey with expert mentoring. Monthly subscriptions for consistent programming education with personalized 1-on-1 sessions and institutional programs.",
  keywords: [
    "programming tutoring",
    "coding mentorship",
    "computer science education",
    "python tutoring",
    "javascript mentoring",
    "programming courses",
    "coding bootcamp",
    "software development training",
    "personalized coding education",
    "programming instructor"
  ],
  authors: [{ name: "Youness", url: "https://goodcode.com" }],
  creator: "GoodCode",
  publisher: "GoodCode",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://goodcode.com",
    siteName: "GoodCode",
    title: "GoodCode - Programming Education That Works",
    description: "Transform your coding journey with expert mentoring. Free trial session for every new student.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GoodCode - Programming Education That Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodCode - Programming Education That Works",
    description: "Transform your coding journey with expert mentoring. Free trial session for every new student.",
    images: ["/og-image.jpg"],
    creator: "@goodcode",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "education",
  classification: "Education, Programming, Technology",
  alternates: {
    canonical: "https://goodcode.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "GoodCode",
              "description": "Programming education and mentoring services with personalized 1-on-1 sessions and institutional programs",
              "url": "https://goodcode.com",
              "logo": "https://goodcode.com/logo.png",
              "founder": {
                "@type": "Person",
                "name": "Youness"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+212-xxx-xxx-xxx",
                "contactType": "customer service",
                "email": "hello@goodcode.com"
              },
              "sameAs": [
                "https://twitter.com/goodcode",
                "https://linkedin.com/company/goodcode",
                "https://github.com/goodcode"
              ],
              "offers": {
                "@type": "Offer",
                "name": "Programming Mentoring",
                "description": "Personalized programming education with expert mentoring",
                "category": "Education"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}