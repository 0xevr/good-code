import { Button } from "@/components/ui/button"
import { Clock, User, CheckCircle, Star, Award, Users } from "lucide-react"
import Image from "next/image"
import CodePlayground from "./CodePlayground"

export default function Teaching() {
  const features = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Individual Mentoring",
      description: "Personalized 1-on-1 sessions with ongoing support. Track progress, build real projects, and develop lasting coding skills.",
      highlight: "500+ students mentored"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Institutional Programs", 
      description: "Complete curriculum design and implementation for schools and organizations. From lesson plans to teacher training.",
      highlight: "25+ partner schools"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Proven Results",
      description: "Continuous follow-through ensures students don't just learn—they master. Measurable outcomes and long-term success.",
      highlight: "95% success rate"
    }
  ]

  const stats = [
    { number: "500+", label: "Students Mentored", icon: "🎓" },
    { number: "25+", label: "Partner Schools", icon: "🏫" },
    { number: "4.9/5", label: "Average Rating", icon: "⭐" },
    { number: "95%", label: "Success Rate", icon: "🏆" }
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="bg-brand-emerald/10 text-brand-emerald text-sm font-semibold px-4 py-2 rounded-full">
              🎯 Meet Your Mentor
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-black to-gray-700 bg-clip-text text-transparent">
            Programming Education That Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized mentoring and institutional programs designed for real-world success
          </p>
        </div>

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Hi, I'm <span className="text-brand-blue">Youness</span>
              </h3>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  A programming educator specializing in personalized learning paths and institutional curriculum development.
                </p>
                <p>
                  From one-on-one mentoring to complete educational program design, I help individuals master coding while empowering schools to deliver world-class programming education.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 rounded-3xl blur-2xl transform scale-110"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
                <CodePlayground />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different</h3>
            <p className="text-xl text-gray-600">Comprehensive programming education tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-700 leading-relaxed mb-6">{feature.description}</p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-emerald/10 text-brand-emerald rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="text-center bg-gradient-to-r from-brand-blue/5 to-brand-cyan/5 rounded-3xl p-12 border border-brand-blue/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-4xl mb-6">💬</div>
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
              "Youness transformed our computer science program. Student engagement increased 300% and project completion rates hit 95%."
            </blockquote>
            <cite className="text-lg text-gray-600 font-medium">
              — Dr. Amina Benali, Academic Director, International School of Agadir
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}