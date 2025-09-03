import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-black via-brand-black to-brand-gray-900 py-20 px-4 min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl text-white font-mono">{'{ }'}</div>
        <div className="absolute top-40 right-20 text-4xl text-white font-mono">{'</>'}</div>
        <div className="absolute bottom-20 left-20 text-5xl text-white font-mono">{'( )'}</div>
        <div className="absolute bottom-40 right-10 text-3xl text-white font-mono">{'[ ]'}</div>
      </div>
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Brand Title */}
        <div className="mb-12">
          <div className="text-brand-yellow text-lg md:text-xl font-bold mb-6 tracking-wider">
            GoodCode
          </div>
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
            Learn to Code with{' '}
            <span className="bg-gradient-to-r from-brand-green to-brand-yellow bg-clip-text text-transparent">
              Confidence
            </span>
          </h1>
        </div>
        
        {/* Subheadline */}
        <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl mb-16 leading-relaxed max-w-4xl mx-auto">
          Interactive lessons and real projects designed for kids, teens, and beginners of all ages.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button className="bg-gradient-to-r from-brand-green to-brand-green/90 hover:from-brand-green/90 hover:to-brand-green text-black font-bold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            👉 Start Learning Today
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black font-bold text-lg px-10 py-6 rounded-xl transition-all duration-300 w-full sm:w-auto"
          >
            📅 Book a Free Call
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No commitment required
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100+ students taught
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Trusted by schools
          </div>
        </div>
      </div>
    </section>
  )
}