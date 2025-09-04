"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, Users } from "lucide-react"
import BookingModal from "./BookingModal"

export default function InteractivePricing() {
  const [selectedPlan, setSelectedPlan] = useState(1)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingType, setBookingType] = useState<'trial' | 'consultation' | 'premium' | 'standard'>('trial')

  const plans = [
    {
      name: "Free Trial",
      price: "Free",
      originalPrice: null,
      description: "Experience our teaching approach risk-free",
      tagline: "Perfect to get started",
      features: [
        { text: "30-minute trial session", icon: "🎯" },
        { text: "Comprehensive skill assessment", icon: "📝" },
        { text: "Meet your dedicated mentor", icon: "👨‍🏫" },
        { text: "Personalized learning roadmap", icon: "🗺️" },
        { text: "No credit card required", icon: "✅" }
      ],
      icon: <Zap className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      popular: false,
      cta: "Book Free Trial",
      timeCommitment: "30 min",
      idealFor: "New students"
    },
    {
      name: "Premium Mentoring",
      price: "$150",
      originalPrice: "$200",
      description: "Accelerated learning with intensive support",
      tagline: "2x faster results",
      features: [
        { text: "Two 1-hour sessions per week", icon: "👨‍🏫" },
        { text: "Custom curriculum designed for you", icon: "📚" },
        { text: "30-min monthly goal-setting call", icon: "📞" },
        { text: "Curated resources & tools library", icon: "🔗" },
        { text: "Priority support & code reviews", icon: "⚡" },
        { text: "Weekly progress assessments", icon: "📊" },
        { text: "Advanced project mentorship", icon: "🚀" }
      ],
      icon: <Star className="w-8 h-8" />,
      color: "from-brand-blue to-brand-blue-light",
      popular: true,
      cta: "Start Premium",
      timeCommitment: "8+ hrs/month",
      idealFor: "Serious learners"
    },
    {
      name: "Standard Mentoring",
      price: "$80",
      originalPrice: "$100",
      description: "Steady progress with consistent guidance",
      tagline: "Most popular choice",
      features: [
        { text: "One 1-hour session per week", icon: "👨‍🏫" },
        { text: "Personalized learning path", icon: "🎯" },
        { text: "Real-world project development", icon: "🚀" },
        { text: "Email support between sessions", icon: "📧" },
        { text: "Progress tracking dashboard", icon: "📊" },
        { text: "Portfolio development guidance", icon: "🏆" }
      ],
      icon: <Users className="w-8 h-8" />,
      color: "from-brand-cyan to-brand-cyan-light",
      popular: false,
      cta: "Start Standard",
      timeCommitment: "4 hrs/month",
      idealFor: "Consistent learners"
    }
  ]

  const currentPlan = plans[selectedPlan]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="bg-brand-blue/10 text-brand-blue text-sm font-semibold px-4 py-2 rounded-full">
              🎆 Start Your Coding Journey Today
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-black to-gray-700 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Start with a <span className="font-semibold text-brand-emerald">free trial</span>, then choose the mentoring level that accelerates your learning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative cursor-pointer transition-all duration-500 group ${
                selectedPlan === index ? 'transform scale-105' : 'hover:scale-[1.02]'
              }`}
              onClick={() => setSelectedPlan(index)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-brand-blue to-brand-blue-light text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`relative bg-white rounded-2xl border transition-all duration-500 group-hover:shadow-2xl ${
                selectedPlan === index
                  ? 'border-brand-blue shadow-2xl ring-4 ring-brand-blue/20'
                  : plan.popular
                    ? 'border-brand-blue/30 shadow-xl'
                    : 'border-gray-200 shadow-lg group-hover:border-brand-blue/40'
              }`}>
                
                {/* Header */}
                <div className="p-8 text-center border-b border-gray-100">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                      )}
                      {plan.price !== "Free" && <span className="text-gray-600 text-lg">/month</span>}
                    </div>
                    {plan.tagline && (
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 text-sm font-medium rounded-full">
                        {plan.tagline}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="p-8 pt-6">
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={(e) => {
                      e.stopPropagation()
                      if (plan.name === "Free Trial") {
                        setBookingType('trial')
                      } else if (plan.name === "Premium Mentoring") {
                        setBookingType('premium')
                      } else {
                        setBookingType('standard')
                      }
                      setShowBookingModal(true)
                    }}
                    className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                      selectedPlan === index
                        ? plan.name === 'Free Trial'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-dark hover:to-brand-blue text-white shadow-lg hover:shadow-xl'
                        : plan.popular
                          ? 'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-md hover:shadow-lg'
                          : 'bg-gray-900 hover:bg-black text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-brand-emerald/10 to-brand-blue/10 rounded-2xl p-8 mb-8 max-w-4xl mx-auto border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brand-emerald mb-1">500+</div>
                <div className="text-sm text-gray-600">students mentored</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brand-blue mb-1">4.9/5</div>
                <div className="text-sm text-gray-600">average rating</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brand-cyan mb-1">95%</div>
                <div className="text-sm text-gray-600">trial conversion rate</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8 flex-wrap">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-emerald" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-emerald" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-emerald" />
              Free trial for everyone
            </span>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Compare Plans</h3>
            <p className="text-xl text-gray-600">Find the perfect fit for your learning goals</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                    <th className="text-center p-6 font-semibold text-emerald-600">Free Trial</th>
                    <th className="text-center p-6 font-semibold text-brand-cyan">Standard</th>
                    <th className="text-center p-6 font-semibold text-brand-blue bg-brand-blue/5">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-6 font-medium">Session Duration</td>
                    <td className="p-6 text-center">30 minutes</td>
                    <td className="p-6 text-center">60 minutes</td>
                    <td className="p-6 text-center bg-brand-blue/5">60 minutes</td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="p-6 font-medium">Sessions per Week</td>
                    <td className="p-6 text-center">One-time</td>
                    <td className="p-6 text-center">1 session</td>
                    <td className="p-6 text-center bg-brand-blue/5">2 sessions</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium">Custom Curriculum</td>
                    <td className="p-6 text-center">❌</td>
                    <td className="p-6 text-center">Basic</td>
                    <td className="p-6 text-center bg-brand-blue/5">✅ Full Custom</td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="p-6 font-medium">Between-session Support</td>
                    <td className="p-6 text-center">❌</td>
                    <td className="p-6 text-center">Email only</td>
                    <td className="p-6 text-center bg-brand-blue/5">Priority support</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium">Progress Tracking</td>
                    <td className="p-6 text-center">Basic assessment</td>
                    <td className="p-6 text-center">✅ Dashboard</td>
                    <td className="p-6 text-center bg-brand-blue/5">✅ Advanced analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Schools Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 rounded-3xl p-12 border border-brand-purple/20">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                🏫 Schools & Organizations
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Custom curriculum development, teacher training, and program implementation for educational institutions.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    📚
                  </div>
                  <h4 className="font-semibold mb-2">Curriculum Design</h4>
                  <p className="text-sm text-gray-600">Age-appropriate programs from beginner to advanced levels</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    👥
                  </div>
                  <h4 className="font-semibold mb-2">Teacher Training</h4>
                  <p className="text-sm text-gray-600">Comprehensive educator preparation and ongoing support</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    📈
                  </div>
                  <h4 className="font-semibold mb-2">Implementation</h4>
                  <p className="text-sm text-gray-600">Full program rollout with performance tracking</p>
                </div>
              </div>
              <Button 
                onClick={() => {
                  setBookingType('consultation')
                  setShowBookingModal(true)
                }}
                size="lg"
                className="bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-purple/90 hover:to-brand-cyan/90 text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                📞 Schedule Free Consultation
              </Button>
              <p className="text-sm text-gray-500 mt-4">Custom pricing based on your institution's needs</p>
            </div>
          </div>
        </div>
      </div>
      
      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        serviceType={bookingType}
      />
    </section>
  )
}