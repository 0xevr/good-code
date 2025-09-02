import Image from "next/image"

export default function Showcase() {
  const projects = [
    {
      id: 1,
      title: "Snake Game",
      description: "Classic snake game built with JavaScript",
      image: "/images/project-1-placeholder.png"
    },
    {
      id: 2,
      title: "Weather App",
      description: "Real-time weather app using APIs",
      image: "/images/project-2-placeholder.png"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Personal portfolio with animations",
      image: "/images/project-3-placeholder.png"
    },
    {
      id: 4,
      title: "Chat Bot",
      description: "AI-powered chatbot interface",
      image: "/images/project-4-placeholder.png"
    },
    {
      id: 5,
      title: "Calculator App",
      description: "Scientific calculator with history",
      image: "/images/project-5-placeholder.png"
    },
    {
      id: 6,
      title: "To-Do Manager",
      description: "Task management with local storage",
      image: "/images/project-6-placeholder.png"
    }
  ]

  return (
    <section className="py-20 px-4 bg-brand-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            students projects showcase
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-video bg-gray-700 relative">
                <Image
                  src={project.image}
                  alt={project.description}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}