import Hero from '@/components/Hero'
import Teaching from '@/components/Teaching'
import Pricing from '@/components/Pricing'
import HowItWorks from '@/components/HowItWorks'
import Showcase from '@/components/Showcase'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Teaching />
      <Pricing />
      <HowItWorks />
      <Showcase />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}