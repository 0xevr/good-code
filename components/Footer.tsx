import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-black py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-brand-cyan font-bold text-lg mb-4">GoodCode</h3>
            <p className="text-gray-400 text-sm">
              Professional programming education for students and institutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-sm">
              <Link href="/services" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                Free Trial
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                Premium Mentoring
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                Standard Mentoring
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                School Programs
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/#about" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                About Youness
              </Link>
              <Link href="/#testimonials" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                Success Stories
              </Link>
              <Link href="/#contact" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Get Started</h4>
            <div className="space-y-2 text-sm">
              <Link href="/#pricing" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                View Pricing
              </Link>
              <a href="mailto:youness@goodcode.ma" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                youness@goodcode.ma
              </a>
              <a href="tel:+212123456789" className="text-gray-400 hover:text-brand-cyan transition-colors block">
                +212 12 34 56 789
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2025 GoodCode. All Rights Reserved.
          </p>
          <div className="flex justify-center items-center gap-4 text-gray-500 text-sm">
            <span>🇲🇦 Based in Morocco</span>
            <span>·</span>
            <span>🌍 Serving Global Students</span>
            <span>·</span>
            <span>🏫 25+ Partner Schools</span>
          </div>
        </div>
      </div>
    </footer>
  )
}