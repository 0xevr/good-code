import { Card, CardContent } from "@/components/ui/card"
import { User, School, Users, BookOpen, BarChart, Award, Clock, TrendingUp } from "lucide-react"

export default function Features() {
  const individualFeatures = [
    {
      icon: <User className="w-8 h-8 text-brand-blue" />,
      title: "Personalized",
      subtitle: "mentoring",
      description: "1-on-1 sessions tailored to individual learning styles. Continuous support between sessions and real project development with ongoing guidance."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-blue" />,
      title: "Flexible",
      subtitle: "scheduling",
      description: "Sessions that fit your schedule. Online or in-person options with makeup sessions available. Long-term mentoring relationships that adapt to your growth."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-blue" />,
      title: "Measurable",
      subtitle: "progress",
      description: "Track skill development with portfolio projects. Regular assessments and goal-setting ensure continuous advancement and career readiness."
    }
  ]

  const institutionalFeatures = [
    {
      icon: <School className="w-8 h-8 text-brand-cyan" />,
      title: "Curriculum",
      subtitle: "design",
      description: "Complete program development from beginner to advanced levels. Age-appropriate content with hands-on projects and real-world applications."
    },
    {
      icon: <Users className="w-8 h-8 text-brand-cyan" />,
      title: "Teacher",
      subtitle: "training",
      description: "Comprehensive educator preparation including modern pedagogy, classroom management, and ongoing professional development support."
    },
    {
      icon: <BarChart className="w-8 h-8 text-brand-cyan" />,
      title: "Assessment",
      subtitle: "systems",
      description: "Built-in evaluation tools, progress tracking, and performance analytics to ensure program effectiveness and student success."
    }
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Individual Services */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Individual <span className="text-brand-blue">Mentoring</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">Personalized learning paths for lasting success</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {individualFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {feature.title}
                </h3>
                <h4 className="text-xl font-bold text-gray-600 mb-4">
                  {feature.subtitle}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Institutional Services */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Institutional <span className="text-brand-cyan">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">Complete educational solutions for schools and organizations</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {institutionalFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {feature.title}
                </h3>
                <h4 className="text-xl font-bold text-gray-600 mb-4">
                  {feature.subtitle}
                </h4>
                <p className="text-gray-600 leading-relaxed">
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