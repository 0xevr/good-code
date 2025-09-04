"use client"

import { useState, useEffect } from 'react'
import { User, MapPin, Clock } from 'lucide-react'

export default function SocialProofNotifications() {
  const [currentNotification, setCurrentNotification] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const notifications = [
    {
      name: "Ahmed from Agadir",
      action: "just started the Python course",
      time: "2 minutes ago",
      avatar: "🧑‍💻"
    },
    {
      name: "Sara from Casablanca", 
      action: "completed her first website project",
      time: "5 minutes ago",
      avatar: "👩‍💻"
    },
    {
      name: "Youssef from Rabat",
      action: "booked a free consultation",
      time: "8 minutes ago", 
      avatar: "👨‍🎓"
    },
    {
      name: "Aicha from Marrakech",
      action: "joined the coding community",
      time: "12 minutes ago",
      avatar: "👩‍🎓"
    }
  ]

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 4000)
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length)
      }, 5000)
    }

    // Initial delay
    const initialTimeout = setTimeout(showNotification, 3000)

    // Recurring notifications
    const interval = setInterval(showNotification, 15000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const notification = notifications[currentNotification]

  return (
    <div className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{notification.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-brand-green" />
              <span className="font-semibold text-sm text-gray-900 truncate">
                {notification.name}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {notification.action}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {notification.time}
            </div>
          </div>
          <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}