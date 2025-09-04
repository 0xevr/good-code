import { Calendar, Target, Code, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Calendar className="w-8 h-8" />,
      number: "01",
      title: "Book Free Trial",
      description: "30-minute session to meet your mentor and discuss your goals. No commitment required.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      number: "02", 
      title: "Get Your Plan",
      description: "We create a personalized learning roadmap based on your experience and goals.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      number: "03",
      title: "Start Coding",
      description: "Begin weekly sessions, build real projects, and track your progress.",
    }
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple 3-step process to start your coding journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Step number */}
              <div className="w-16 h-16 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan transform translate-x-8" />
              )}
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6">Join 500+ students who started with a free trial</p>
          <Button className="bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-blue-dark hover:to-brand-cyan-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Book Free Trial Now
          </Button>
        </div>
      </div>
    </section>
  )
}