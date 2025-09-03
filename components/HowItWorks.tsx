import { Calendar, PlaneTakeoff, Code } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Calendar className="w-12 h-12 text-brand-green" />,
      title: "Book",
      description: "Pick the program that fits your goals."
    },
    {
      icon: <PlaneTakeoff className="w-12 h-12 text-brand-green" />,
      title: "Plan",
      description: "We create a roadmap tailored to your needs."
    },
    {
      icon: <Code className="w-12 h-12 text-brand-green" />,
      title: "Build",
      description: "Start coding real projects and share your progress."
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-brand-gray-900">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative group">
              <div className="bg-gradient-to-br from-brand-green/10 to-brand-yellow/10 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-brand-green/20">
                {step.icon}
              </div>
              
              <div className="bg-brand-green text-white text-sm font-bold px-3 py-1 rounded-full mx-auto w-fit mb-4">
                Step {index + 1}
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-brand-gray-900">
                {step.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-12 h-0.5 bg-gradient-to-r from-brand-green to-brand-yellow transform translate-x-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}