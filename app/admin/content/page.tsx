"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Settings,
  Save,
  FileText,
  Image,
  Globe,
  Palette,
  Type
} from 'lucide-react'

interface SiteContent {
  id: string
  key: string
  value: any
  description: string | null
  createdAt: string
  updatedAt: string
}

interface ContentSection {
  id: string
  title: string
  icon: React.ReactNode
  fields: ContentField[]
}

interface ContentField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'color' | 'url'
  description?: string
  placeholder?: string
  rows?: number
}

const contentSections: ContentSection[] = [
  {
    id: 'hero',
    title: 'Hero Section',
    icon: <Globe className="w-5 h-5" />,
    fields: [
      { key: 'hero.title', label: 'Main Title', type: 'text', placeholder: 'Programming Education That Works' },
      { key: 'hero.subtitle', label: 'Subtitle', type: 'textarea', rows: 2, placeholder: 'Transform your coding journey with expert mentoring.' },
      { key: 'hero.cta_primary', label: 'Primary CTA Text', type: 'text', placeholder: 'Start Free Trial' },
      { key: 'hero.cta_secondary', label: 'Secondary CTA Text', type: 'text', placeholder: 'School Consultation' },
      { key: 'hero.stats_students', label: 'Students Count', type: 'text', placeholder: '500+ students' },
      { key: 'hero.stats_schools', label: 'Schools Count', type: 'text', placeholder: '25+ schools' },
    ]
  },
  {
    id: 'branding',
    title: 'Branding & Colors',
    icon: <Palette className="w-5 h-5" />,
    fields: [
      { key: 'brand.primary_color', label: 'Primary Color', type: 'color', placeholder: '#1e40af' },
      { key: 'brand.secondary_color', label: 'Secondary Color', type: 'color', placeholder: '#06b6d4' },
      { key: 'brand.accent_color', label: 'Accent Color', type: 'color', placeholder: '#10b981' },
      { key: 'brand.logo_text', label: 'Logo Text', type: 'text', placeholder: 'GoodCode' },
    ]
  },
  {
    id: 'about',
    title: 'About Section',
    icon: <Type className="w-5 h-5" />,
    fields: [
      { key: 'about.name', label: 'Instructor Name', type: 'text', placeholder: 'Youness' },
      { key: 'about.title', label: 'Section Title', type: 'text', placeholder: 'Programming Education That Works' },
      { key: 'about.description', label: 'Description', type: 'textarea', rows: 4, placeholder: 'Personalized mentoring and institutional programs...' },
      { key: 'about.experience_years', label: 'Years of Experience', type: 'number', placeholder: '10' },
    ]
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: <FileText className="w-5 h-5" />,
    fields: [
      { key: 'contact.email', label: 'Contact Email', type: 'text', placeholder: 'hello@goodcode.com' },
      { key: 'contact.phone', label: 'Phone Number', type: 'text', placeholder: '+212-xxx-xxx-xxx' },
      { key: 'contact.address', label: 'Address', type: 'textarea', rows: 2, placeholder: 'City, Country' },
      { key: 'contact.hours', label: 'Business Hours', type: 'text', placeholder: 'Mon-Fri 9AM-6PM GMT+1' },
    ]
  },
  {
    id: 'social',
    title: 'Social Media',
    icon: <Globe className="w-5 h-5" />,
    fields: [
      { key: 'social.website', label: 'Website URL', type: 'url', placeholder: 'https://goodcode.com' },
      { key: 'social.twitter', label: 'Twitter URL', type: 'url', placeholder: 'https://twitter.com/goodcode' },
      { key: 'social.linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/company/goodcode' },
      { key: 'social.github', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/goodcode' },
    ]
  },
  {
    id: 'seo',
    title: 'SEO Settings',
    icon: <Settings className="w-5 h-5" />,
    fields: [
      { key: 'seo.meta_title', label: 'Meta Title', type: 'text', placeholder: 'GoodCode - Programming Education That Works' },
      { key: 'seo.meta_description', label: 'Meta Description', type: 'textarea', rows: 3, placeholder: 'Transform your coding journey with expert mentoring...' },
      { key: 'seo.keywords', label: 'Keywords (comma separated)', type: 'textarea', rows: 2, placeholder: 'programming tutoring, coding mentorship, computer science education' },
      { key: 'seo.og_image', label: 'Open Graph Image URL', type: 'url', placeholder: 'https://goodcode.com/og-image.jpg' },
    ]
  }
]

export default function ContentManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [content, setContent] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }
    fetchContent()
  }, [session, status, router])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      
      const contentMap: Record<string, any> = {}
      data.content.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value
      })
      setContent(contentMap)
    } catch (error) {
      console.error('Failed to fetch content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Save each content field
      for (const section of contentSections) {
        for (const field of section.fields) {
          const value = content[field.key] || ''
          await fetch('/api/admin/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: field.key,
              value,
              description: field.description || field.label
            })
          })
        }
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save content:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleFieldChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const renderField = (field: ContentField) => {
    const value = content[field.key] || ''
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            rows={field.rows || 3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder={field.placeholder}
          />
        )
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder={field.placeholder}
          />
        )
      case 'boolean':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(field.key, e.target.checked)}
              className="rounded border-gray-300 text-brand-blue shadow-sm focus:border-brand-blue focus:ring focus:ring-offset-0 focus:ring-brand-blue focus:ring-opacity-20"
            />
            <span className="ml-2 text-sm text-gray-700">Enable</span>
          </label>
        )
      case 'color':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={value || '#1e40af'}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              placeholder={field.placeholder}
            />
          </div>
        )
      case 'url':
        return (
          <input
            type="url"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder={field.placeholder}
          />
        )
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder={field.placeholder}
          />
        )
    }
  }

  if (status === 'loading' || loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Site Content Management</h1>
              <p className="text-gray-600">Update website content and settings</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                onClick={() => router.push('/admin')}
                variant="outline"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {contentSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    {renderField(field)}
                    {field.description && (
                      <p className="mt-1 text-xs text-gray-500">{field.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Image className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Content Preview</h3>
              <p className="text-sm text-blue-700">
                Changes will be reflected on the website after saving. Some changes may require a page refresh to be visible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}