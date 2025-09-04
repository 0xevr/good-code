"use client"

import { useState, useEffect } from 'react'
import { MessageCircle, X, Calendar, Play } from 'lucide-react'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const actions = [
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Book Free Call',
      color: 'bg-brand-yellow text-black',
      action: () => console.log('Book call')
    },
    {
      icon: <Play className="w-5 h-5" />,
      label: 'Start Learning',
      color: 'bg-brand-green text-black',
      action: () => console.log('Start learning')
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Quick Question',
      color: 'bg-blue-500 text-white',
      action: () => console.log('Quick question')
    }
  ]

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-center gap-3 animate-slideInRight"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="bg-black text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
              {action.label}
            </span>
            <button
              onClick={action.action}
              className={`${action.color} p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200`}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r from-brand-green to-brand-yellow p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-black" /> : <MessageCircle className="w-6 h-6 text-black" />}
      </button>

      {/* Pulse effect */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-green to-brand-yellow animate-ping opacity-20"></div>
      )}
    </div>
  )
}