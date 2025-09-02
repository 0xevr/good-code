"use client"

import { useState } from "react"
import { MessageCircle, Linkedin, Mail, Github } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      value: "+212 6 61 23 45 67",
      href: "https://wa.me/212661234567"
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      value: "your-name",
      href: "https://linkedin.com/in/your-name"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      value: "your-name@gmail.com",
      href: "mailto:your-name@gmail.com"
    },
    {
      icon: <Github className="w-8 h-8" />,
      value: "github-name",
      href: "https://github.com/github-name"
    }
  ]

  return (
    <section className="py-20 px-4 bg-brand-yellow min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            Get in touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Contact Methods */}
          <div className="space-y-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-black hover:opacity-80 transition-opacity"
              >
                <div className="text-black">
                  {method.icon}
                </div>
                <span className="text-xl md:text-2xl font-medium">
                  {method.value}
                </span>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-0 border-b-2 border-black pb-3 text-xl md:text-2xl text-black placeholder:text-black/70 focus:outline-none focus:border-black/80"
                  required
                />
              </div>
              
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-0 border-b-2 border-black pb-3 text-xl md:text-2xl text-black placeholder:text-black/70 focus:outline-none focus:border-black/80"
                  required
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full bg-transparent border-0 border-b-2 border-black pb-3 text-xl md:text-2xl text-black placeholder:text-black/70 focus:outline-none focus:border-black/80 resize-none"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-black text-brand-yellow py-4 text-xl md:text-2xl font-bold hover:bg-black/90 transition-colors"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}