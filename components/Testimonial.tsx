export default function Testimonial() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
          &ldquo;The best teacher I&apos;ve ever had. I didn&apos;t just learn code, I built things I&apos;m proud of.&rdquo;
        </blockquote>
        
        <cite className="text-gray-600 font-medium">
          — Student name, age
        </cite>
      </div>
    </section>
  )
}