"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What age group are your lessons for?",
      answer: "We teach kids, teens, and beginners of all ages."
    },
    {
      question: "Do I need prior coding experience?",
      answer: "Not at all — we start from the basics."
    },
    {
      question: "How do online lessons work?",
      answer: "Live via Zoom or Google Meet with interactive coding tools."
    },
    {
      question: "What if my child struggles to keep up?",
      answer: "We adjust the pace and provide extra support."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            FAQs
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-black">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
              >
                <h3 className="text-xl md:text-2xl font-bold text-black pr-4">
                  {faq.question}
                </h3>
                <ChevronRight 
                  className={`w-6 h-6 text-black transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="pb-6 pr-10">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}