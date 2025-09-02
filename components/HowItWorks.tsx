import { Calendar, PlaneTakeoff, Code } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Calendar className="w-12 h-12 text-brand-green" />,
      title: "Book",
      description: "Schedule a free consultation to understand your learning goals and current skill level."
    },
    {
      icon: <PlaneTakeoff className="w-12 h-12 text-brand-green" />,
      title: "Plan",
      description: "We create a personalized curriculum tailored to your interests and learning pace."
    },
    {
      icon: <Code className="w-12 h-12 text-brand-green" />,
      title: "Build",
      description: "Start coding real projects with guided mentorship and hands-on practice."
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple. Fast. Personalized.
          </h2>
          <p className="text-gray-600">
            Learn programming in 3 easy steps with personalized guidance for students → all abilities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="flex justify-center mb-6">
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}