"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import AnimatedBackground from "./AnimatedBackground"
import BookingModal from "./BookingModal"

export default function Hero() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showConsultationModal, setShowConsultationModal] = useState(false)

  return (
    <section className="bg-gradient-to-br from-brand-black via-brand-navy to-brand-slate py-20 px-4 min-h-screen flex items-center relative overflow-hidden">
      <AnimatedBackground />
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
          <div className="text-brand-cyan-light text-lg md:text-xl font-bold mb-6 tracking-wider">
            GoodCode
          </div>
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
            Programming Education{' '}
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue-light bg-clip-text text-transparent">
              That Works
            </span>
          </h1>
        </div>
        
        {/* Subheadline */}
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto">
          Transform your coding journey with expert mentoring. Free trial included.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button 
            onClick={() => setShowTrialModal(true)}
            className="bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-dark hover:to-brand-blue text-white font-bold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            🎯 Start Free Trial
          </Button>
          <Button 
            onClick={() => setShowConsultationModal(true)}
            variant="outline" 
            className="border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-black font-bold text-lg px-10 py-6 rounded-xl transition-all duration-300 w-full sm:w-auto"
          >
            📞 School Consultation
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free trial
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
500+ students
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
25+ schools
          </div>
        </div>
      </div>
      
      <BookingModal 
        isOpen={showTrialModal}
        onClose={() => setShowTrialModal(false)}
        serviceType="trial"
      />
      
      <BookingModal 
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
        serviceType="consultation"
      />
    </section>
  )
}