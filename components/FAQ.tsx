"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What age group are your courses designed for?",
      answer: "Our courses are designed for students aged 8-18, with content adapted to different skill levels. We offer beginner-friendly introductions for younger students and more advanced programming concepts for teenagers. Each lesson is personalized based on the student's age, experience, and learning style."
    },
    {
      question: "What age group are your courses designed for?",
      answer: "Our courses are designed for students aged 8-18, with content adapted to different skill levels. We offer beginner-friendly introductions for younger students and more advanced programming concepts for teenagers. Each lesson is personalized based on the student's age, experience, and learning style."
    },
    {
      question: "What age group are your courses designed for?",
      answer: "Our courses are designed for students aged 8-18, with content adapted to different skill levels. We offer beginner-friendly introductions for younger students and more advanced programming concepts for teenagers. Each lesson is personalized based on the student's age, experience, and learning style."
    },
    {
      question: "What age group are your courses designed for?",
      answer: "Our courses are designed for students aged 8-18, with content adapted to different skill levels. We offer beginner-friendly introductions for younger students and more advanced programming concepts for teenagers. Each lesson is personalized based on the student's age, experience, and learning style."
    },
    {
      question: "What age group are your courses designed for?",
      answer: "Our courses are designed for students aged 8-18, with content adapted to different skill levels. We offer beginner-friendly introductions for younger students and more advanced programming concepts for teenagers. Each lesson is personalized based on the student's age, experience, and learning style."
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