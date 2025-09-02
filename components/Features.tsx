import { Card, CardContent } from "@/components/ui/card"
import { User, Clock, TrendingUp } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <User className="w-8 h-8 text-brand-green" />,
      title: "Personalized",
      subtitle: "curriculum",
      description: "Each lesson is tailored to match your child's learning style and pace. We build on their strengths and gently work on areas that need improvement, creating a unique path for every student."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-green" />,
      title: "Flexible",
      subtitle: "scheduling",
      description: "Learn at your own time, anywhere. Book sessions that work with your schedule. We find the perfect time slots that fit both your life and their learning rhythm."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-green" />,
      title: "Proven",
      subtitle: "success",
      description: "Our students don't just learn to code - they create projects they're proud of. From games to websites, they build real things that showcase their growing skills and confidence."
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {feature.title}
                </h3>
                <h4 className="text-xl font-bold text-gray-600 mb-4">
                  {feature.subtitle}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}