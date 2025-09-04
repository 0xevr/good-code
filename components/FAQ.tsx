"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does the free trial work?",
      answer: "The free trial is a 30-minute session where you'll meet your potential mentor, discuss your goals, and experience our teaching style. No credit card required, no strings attached. It's the perfect way to see if our approach works for you."
    },
    {
      question: "What programming languages do you teach?",
      answer: "We teach Python, JavaScript, HTML/CSS, Java, C++, and more depending on your goals. Whether you want to build websites, create games, or prepare for computer science courses, we customize the curriculum to your interests."
    },
    {
      question: "Do I need prior coding experience?",
      answer: "Not at all! We welcome complete beginners and work with students at all levels. During your trial session, we'll assess your current knowledge and create a learning path that's perfect for your experience level."
    },
    {
      question: "How do online sessions work?",
      answer: "Sessions are conducted via Zoom or Google Meet with screen sharing and interactive coding environments. You'll code alongside your mentor in real-time, making it feel like you're in the same room. All sessions are recorded for your review."
    },
    {
      question: "Can I switch between plans?",
      answer: "Absolutely! You can upgrade, downgrade, or pause your subscription at any time. For upgrades, we'll prorate the difference. There are no long-term contracts or cancellation fees."
    },
    {
      question: "What makes you different from online courses?",
      answer: "Unlike pre-recorded courses, you get personalized attention from an experienced mentor. We adapt to your learning pace, answer your specific questions, and provide real-time feedback on your code. It's education tailored to you, not the masses."
    },
    {
      question: "How do you help schools and organizations?",
      answer: "We design custom curricula, train teachers, and provide ongoing support for educational institutions. This includes lesson plans, assessment tools, and teacher development programs. We've successfully worked with 25+ schools to enhance their computer science programs."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied with your mentoring experience, we'll refund your payment, no questions asked. Your success and satisfaction are our top priorities."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="bg-brand-purple/10 text-brand-purple text-sm font-semibold px-4 py-2 rounded-full">
              💬 Common Questions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-black to-gray-700 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our programming education services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-brand-blue shadow-lg' 
                  : 'border-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between group"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    openIndex === index 
                      ? 'bg-brand-blue text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-brand-blue/10 group-hover:text-brand-blue'
                  }`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors duration-300">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 text-gray-400 transition-all duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index 
                      ? 'rotate-180 text-brand-blue' 
                      : 'group-hover:text-brand-blue'
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="ml-14">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-blue/5 to-brand-cyan/5 rounded-2xl p-8 border border-brand-blue/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">We're here to help! Reach out and we'll get back to you within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:youness@goodcode.ma" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-brand-blue-dark transition-colors duration-300"
              >
                📧 Email Us
              </a>
              <span className="text-gray-400">or</span>
              <span className="text-gray-600">Book a free trial to chat directly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}