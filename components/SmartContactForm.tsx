"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MessageCircle, ArrowRight, CheckCircle, Star } from 'lucide-react'

export default function SmartContactForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    experience: '',
    goals: '',
    urgency: '',
    message: ''
  })
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setStep(prev => prev + 1)
  }

  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const leadData = {
        ...formData,
        source: 'contact-form',
        timestamp: new Date().toISOString()
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      })

      if (response.ok) {
        console.log('✅ Contact form lead sent successfully!')
      } else {
        console.error('❌ Failed to send contact form lead')
      }
    } catch (error) {
      console.error('❌ Error sending contact form lead:', error)
    }

    setIsSubmitting(false)
    setStep(5) // Success step
  }

  const progressPercentage = (step / 4) * 100

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-brand-blue-50 via-brand-cyan-50 to-brand-purple-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Start Your Journey
          </h2>
          <p className="text-2xl font-bold text-black mb-2">
            Free trial session or custom school program.
          </p>
          <p className="text-lg text-black/80 mb-6">
            Book your free trial or schedule a consultation within 24 hours.
          </p>
          
          {/* Urgency Timer */}
          <div className="inline-flex items-center gap-3 bg-red-100 border border-red-200 rounded-full px-6 py-3 mb-8">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="text-red-700 font-semibold">
              Limited spots available: {formatTime(timeLeft)} remaining
            </span>
          </div>
          
          <p className="text-sm text-black/70 flex items-center justify-center gap-2">
            📧 <em>We reply directly to your email — no bots, just us.</em>
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
              <span className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-brand-blue to-brand-cyan h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">👋 Let&apos;s start with the basics</h3>
                <p className="text-gray-600">This helps me personalize your learning experience</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                />
              </div>
              
              <select
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
              >
                <option value="">I'm interested in...</option>
                <option value="free-trial">Free 30-min trial session</option>
                <option value="premium-plan">Premium Plan ($150/month)</option>
                <option value="standard-plan">Standard Plan ($80/month)</option>
                <option value="self-curriculum">Self-learning curriculum ($30)</option>
                <option value="school-program">School/Organization program</option>
              </select>

              <Button 
                onClick={nextStep}
                disabled={!formData.name || !formData.email || !formData.age}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-dark hover:to-brand-blue text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Experience & Goals */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">🎯 What's your main goal?</h3>
                <p className="text-gray-600">This helps me tailor the perfect learning path</p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Current coding experience:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Complete beginner', 'Some experience', 'Advanced/Teaching'].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('experience', level)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.experience === level
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">What would you like to build?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Learn Programming Basics', 'Build Real Projects', 'College/Career Prep', 'Implement School Program', 'Train Teachers', 'Create Custom Curriculum'].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleInputChange('goals', goal)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.goals === goal
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 py-4 rounded-xl"
                >
                  Back
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={!formData.experience || !formData.goals}
                  className="flex-1 bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-dark hover:to-brand-blue text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Urgency & Message */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">⚡ When would you like to start?</h3>
                <p className="text-gray-600">This helps me prioritize your request</p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Preferred timeline:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['This week', 'Next week', 'This month', 'Just exploring'].map((timeline) => (
                    <button
                      key={timeline}
                      onClick={() => handleInputChange('urgency', timeline)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.urgency === timeline
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Any specific questions or requests? (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell me about your coding dreams, concerns, or any specific questions you have..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 py-4 rounded-xl"
                >
                  Back
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={!formData.urgency}
                  className="flex-1 bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-dark hover:to-brand-blue text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Review & Send <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">📋 Review your information</h3>
                <p className="text-gray-600">Make sure everything looks correct before sending</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Age group:</strong> {formData.age}</div>
                <div><strong>Experience:</strong> {formData.experience}</div>
                <div><strong>Goals:</strong> {formData.goals}</div>
                <div><strong>Timeline:</strong> {formData.urgency}</div>
                {formData.message && <div><strong>Message:</strong> {formData.message}</div>}
              </div>

              <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-4">
                <p className="text-brand-blue font-semibold text-center">
                  🎉 You&apos;ll receive a personalized response within 24 hours!
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 py-4 rounded-xl"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-dark hover:to-brand-blue text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      Sending...
                    </>
                  ) : (
                    <>👉 Send Message</>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-brand-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-brand-emerald mb-4">Message Sent Successfully! 🎉</h3>
              
              <div className="space-y-4 max-w-md mx-auto">
                <p className="text-lg text-gray-700">
                  Thanks, {formData.name}! I&apos;ve received your message and I&apos;m excited to help you on your coding journey.
                </p>
                <p className="text-gray-600">
                  You&apos;ll hear from me within 24 hours with a personalized response based on your goals and experience level.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-yellow-800 font-semibold">
                  📧 Check your email for a confirmation and next steps!
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a Call
                </Button>
                <Button 
                  variant="outline"
                  className="border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Community
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}