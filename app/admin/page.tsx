"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  BarChart3,
  FileText
} from 'lucide-react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalContacts: 0,
    pendingContacts: 0,
    totalTestimonials: 0,
    activeFAQs: 0
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }

    // Load dashboard stats
    fetchStats()
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  const menuItems = [
    {
      title: 'Contact Management',
      description: 'Manage inquiries and bookings',
      icon: <MessageSquare className="w-8 h-8" />,
      href: '/admin/contacts',
      color: 'from-blue-500 to-blue-600',
      stat: `${stats.pendingContacts} pending`
    },
    {
      title: 'Testimonials',
      description: 'Manage customer testimonials',
      icon: <Users className="w-8 h-8" />,
      href: '/admin/testimonials',
      color: 'from-green-500 to-green-600',
      stat: `${stats.totalTestimonials} total`
    },
    {
      title: 'FAQ Management',
      description: 'Update frequently asked questions',
      icon: <HelpCircle className="w-8 h-8" />,
      href: '/admin/faq',
      color: 'from-purple-500 to-purple-600',
      stat: `${stats.activeFAQs} active`
    },
    {
      title: 'Site Content',
      description: 'Edit website content and settings',
      icon: <FileText className="w-8 h-8" />,
      href: '/admin/content',
      color: 'from-orange-500 to-orange-600',
      stat: 'Manage content'
    },
    {
      title: 'Analytics',
      description: 'View website and engagement analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      href: '/admin/analytics',
      color: 'from-indigo-500 to-indigo-600',
      stat: 'View metrics'
    },
    {
      title: 'Settings',
      description: 'System settings and configuration',
      icon: <Settings className="w-8 h-8" />,
      href: '/admin/settings',
      color: 'from-gray-500 to-gray-600',
      stat: 'Configure'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {session.user?.name || session.user?.email}</p>
            </div>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              View Site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.href)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {item.stat}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => router.push('/admin/contacts')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              Review New Contacts
            </Button>
            <Button
              onClick={() => router.push('/admin/content')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              Update Site Content
            </Button>
            <Button
              onClick={() => router.push('/admin/testimonials')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
            >
              Add Testimonial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}