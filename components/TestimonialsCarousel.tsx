"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const testimonials = [
    {
      name: "Ahmed El Mansouri",
      age: 14,
      location: "Premium Plan Student",
      project: "6-month Subscription",
      quote: "The Premium plan with 2 sessions per week was perfect! Youness created a custom curriculum just for me. I went from zero to building my own games in 4 months.",
      rating: 5,
      image: "🧑‍💻",
      achievement: "Built 3 games and 2 web apps"
    },
    {
      name: "Dr. Amina Benali",
      age: null,
      location: "International School of Agadir", 
      project: "Institutional Partnership",
      quote: "Our partnership transformed our computer science program. Student engagement increased 300% and project completion rates hit 95%. Worth every dirham!",
      rating: 5,
      image: "👩‍🏫",
      achievement: "Program adopted by 8 partner schools"
    },
    {
      name: "Sara Cherkaoui",
      age: 17,
      location: "Standard Plan Student",
      project: "College Prep Program",
      quote: "Started with the free trial, then Standard plan. After 8 months of weekly sessions, I had an amazing portfolio. Got into my dream engineering program!",
      rating: 5,
      image: "👩‍🎓",
      achievement: "Accepted to top engineering school"
    },
    {
      name: "Hassan Boukhari",
      age: null,
      location: "Tech Academy Casablanca",
      project: "Teacher Training & Curriculum",
      quote: "The 30-min consultation turned into a full partnership. Youness trained our faculty and designed our entire curriculum. Results exceeded all expectations.",
      rating: 5,
      image: "👨‍💼",
      achievement: "25 teachers certified, 400+ students impacted"
    }
  ]

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-black to-gray-700 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">Real students, real achievements, real impact</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-blue/10 to-brand-cyan/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              {/* Quote icon */}
              <Quote className="w-12 h-12 text-brand-blue/30 mb-6" />

              {/* Testimonial content */}
              <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Student info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-full flex items-center justify-center text-2xl">
                  {currentTestimonial.image}
                </div>
                <div>
                  <div className="font-bold text-xl text-gray-900">
                    {currentTestimonial.name}, {currentTestimonial.age}
                  </div>
                  <div className="text-gray-600">{currentTestimonial.location}</div>
                  <div className="text-brand-blue font-semibold">
                    Project: {currentTestimonial.project}
                  </div>
                </div>
              </div>

              {/* Achievement badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 px-4 py-2 rounded-full border border-brand-blue/20">
                <span className="text-sm font-semibold text-gray-700">
                  🏆 {currentTestimonial.achievement}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlay(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-brand-blue scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">300+</div>
            <div className="text-gray-600">Active Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">95%</div>
            <div className="text-gray-600">Trial to Paid Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">25+</div>
            <div className="text-gray-600">Partner Schools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}