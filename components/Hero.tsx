export default function Hero() {
  return (
    <section className="bg-brand-black py-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Badge */}
        <div className="relative inline-block mb-12">
          <div className="relative bg-red-500 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            </div>
            New clients<br />welcome<br />
            <span className="font-black">JOIN TODAY</span>
          </div>
          {/* Decorative edges */}
          <div className="absolute inset-0 bg-red-500 rounded-full -z-10" 
               style={{
                 clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)',
                 transform: 'scale(1.1)'
               }}>
          </div>
        </div>
        
        {/* Main Title */}
        <h1 className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
          Good<br />Code<span className="text-white">*</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
          Real skills. Taught with care
        </h2>
        
        {/* Description */}
        <p className="text-white text-lg sm:text-xl md:text-2xl mb-12 leading-relaxed">
          A trusted guide for students and schools.
        </p>
        
        {/* Bottom tagline */}
        <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
          Personalized lessons. Custom-built curriculum
        </p>
      </div>
    </section>
  )
}