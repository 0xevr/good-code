import Hero from '@/components/Hero'
import Teaching from '@/components/Teaching'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import InteractivePricing from '@/components/InteractivePricing'
import FAQ from '@/components/FAQ'
import SmartContactForm from '@/components/SmartContactForm'
import Footer from '@/components/Footer'
import SocialProofNotifications from '@/components/SocialProofNotifications'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <Teaching />
      <TestimonialsCarousel />
      <InteractivePricing />
      <FAQ />
      <SmartContactForm />
      <Footer />
      <SocialProofNotifications />
    </main>
  )
}