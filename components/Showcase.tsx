import Image from "next/image"

export default function Showcase() {
  const projects = [
    {
      id: 1,
      title: "Snake Game in Python",
      student: "Ali (13)",
      description: "Built his first Snake Game in Python 🐍",
      image: "/images/project-1-placeholder.png"
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      student: "Sara (16)",
      description: "Designed a personal portfolio website 🌐",
      image: "/images/project-2-placeholder.png"
    },
    {
      id: 3,
      title: "Homework Reminder Bot",
      student: "Adam (12)",
      description: "Automated his homework reminders with Python 🤖",
      image: "/images/project-3-placeholder.png"
    }
  ]

  return (
    <section className="py-20 px-4 bg-brand-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Students Projects Showcase
          </h2>
          <p className="text-gray-400 text-xl">See what our students are building:</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700"
            >
              <div className="aspect-video bg-gradient-to-br from-brand-green/20 to-brand-yellow/20 relative flex items-center justify-center">
                <div className="text-6xl">
                  {project.id === 1 ? '🐍' : project.id === 2 ? '🌐' : '🤖'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-brand-yellow font-semibold text-sm mb-2">
                  {project.student}
                </p>
                <p className="text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="bg-gradient-to-r from-brand-green to-brand-yellow text-black font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform duration-300">
            👉 See More Projects
          </button>
        </div>
      </div>
    </section>
  )
}