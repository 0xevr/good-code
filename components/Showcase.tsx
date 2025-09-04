import { Code, Globe, Bot, Gamepad2, Laptop, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Showcase() {
  const projects = [
    {
      id: 1,
      title: "Snake Game in Python",
      student: "Ahmed, 14",
      duration: "Built in 6 weeks",
      description: "From zero coding experience to building a fully functional Snake game with score tracking and level progression.",
      emoji: "🐍",
      icon: <Gamepad2 className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      skills: ["Python", "Game Logic", "UI Design"],
      achievement: "First complete project"
    },
    {
      id: 2,
      title: "Personal Portfolio Website", 
      student: "Sara, 17",
      duration: "Built in 4 weeks",
      description: "Responsive portfolio showcasing her art projects with interactive galleries and contact forms.",
      emoji: "🌐",
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      skills: ["HTML", "CSS", "JavaScript"],
      achievement: "College application ready"
    },
    {
      id: 3,
      title: "Smart Study Assistant",
      student: "Youssef, 15",
      duration: "Built in 8 weeks",
      description: "AI-powered study bot that sends homework reminders and tracks study sessions with progress analytics.",
      emoji: "🤖",
      icon: <Bot className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600",
      skills: ["Python", "APIs", "Data Analysis"],
      achievement: "Advanced project mastery"
    },
    {
      id: 4,
      title: "Mobile Expense Tracker",
      student: "Lina, 16", 
      duration: "Built in 10 weeks",
      description: "React Native app for tracking family expenses with categories, charts, and budget alerts.",
      emoji: "📱",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
      skills: ["React Native", "Mobile Dev", "Charts"],
      achievement: "App Store ready"
    },
    {
      id: 5,
      title: "School Management System",
      student: "Omar, 16",
      duration: "Built in 12 weeks",
      description: "Full-stack web app for managing student grades, attendance, and parent communication.",
      emoji: "🏫",
      icon: <Laptop className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-600",
      skills: ["Full Stack", "Database", "Authentication"],
      achievement: "Professional-level project"
    },
    {
      id: 6,
      title: "E-commerce Marketplace",
      student: "Fatima, 18",
      duration: "Built in 16 weeks",
      description: "Complete marketplace platform with payment integration, seller dashboards, and order management.",
      emoji: "🛒",
      icon: <Code className="w-8 h-8" />,
      color: "from-teal-500 to-blue-600",
      skills: ["React", "Node.js", "Payment APIs"],
      achievement: "Industry-ready portfolio"
    }
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-brand-black to-gray-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="bg-brand-emerald/10 text-brand-emerald text-sm font-semibold px-4 py-2 rounded-full">
              🚀 Real Student Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Student Project <span className="text-brand-cyan">Showcase</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From first lines of code to portfolio-ready projects — see what our students build with dedicated mentoring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500 border border-gray-700/50 hover:border-brand-cyan/30 group"
            >
              {/* Header with gradient and emoji */}
              <div className={`bg-gradient-to-br ${project.color} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-6xl opacity-20 transform translate-x-4 -translate-y-2">
                  {project.emoji}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="font-semibold">{project.student}</span>
                    <span>•</span>
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Achievement badge */}
                <div className="flex items-center gap-2 text-brand-emerald text-sm font-medium">
                  🏆 {project.achievement}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats & CTA */}
        <div className="text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-cyan mb-2">200+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-emerald mb-2">50+</div>
              <div className="text-gray-400">Portfolio-Ready</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue mb-2">95%</div>
              <div className="text-gray-400">Project Success Rate</div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your First Project?</h3>
            <p className="text-gray-300 mb-6">
              Join our students and start building real projects that showcase your skills and passion for programming.
            </p>
            <Button className="bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-blue-dark hover:to-brand-cyan-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              🎯 Start Your Project Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}