"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Eye,
  Edit,
  Trash2,
  Star,
  Plus,
  User,
  Calendar,
  Filter,
  Search
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string | null
  content: string
  rating: number
  featured: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}

interface TestimonialsResponse {
  testimonials: Testimonial[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function TestimonialsManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ featured: '', active: '', search: '' })
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create'>('view')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }
    fetchTestimonials()
  }, [session, status, router, pagination.page, filters])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.featured && { featured: filters.featured }),
        ...(filters.active && { active: filters.active }),
      })

      const response = await fetch(`/api/admin/testimonials?${params}`)
      const data: TestimonialsResponse = await response.json()
      
      setTestimonials(data.testimonials)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFeatured = async (testimonialId: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured })
      })

      if (response.ok) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Failed to update testimonial:', error)
    }
  }

  const handleToggleActive = async (testimonialId: string, active: boolean) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active })
      })

      if (response.ok) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Failed to update testimonial:', error)
    }
  }

  const handleDelete = async (testimonialId: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/admin/testimonials/${testimonialId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
    }
  }

  const openModal = (type: 'view' | 'edit' | 'create', testimonial?: Testimonial) => {
    setModalType(type)
    setSelectedTestimonial(testimonial || null)
    setShowModal(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (status === 'loading') {
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
              <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
              <p className="text-gray-600">Manage customer testimonials and reviews</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => openModal('create')}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
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
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
              <select
                value={filters.featured}
                onChange={(e) => setFilters(prev => ({ ...prev, featured: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              >
                <option value="">All</option>
                <option value="true">Featured</option>
                <option value="false">Not Featured</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.active}
                onChange={(e) => setFilters(prev => ({ ...prev, active: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={fetchTestimonials}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full p-8 text-center">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full p-8 text-center text-gray-500">No testimonials found</div>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-10 w-10 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      {testimonial.role && (
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {testimonial.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      testimonial.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {testimonial.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.content}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => openModal('view', testimonial)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    onClick={() => openModal('edit', testimonial)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>

                <div className="flex space-x-2 mt-2">
                  <Button
                    onClick={() => handleToggleFeatured(testimonial.id, testimonial.featured)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    {testimonial.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button
                    onClick={() => handleToggleActive(testimonial.id, testimonial.active)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    {testimonial.active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    onClick={() => handleDelete(testimonial.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && testimonials.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {((pagination.page - 1) * pagination.limit) + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{pagination.total}</span>{' '}
                  results
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.pages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for View/Edit/Create */}
      {showModal && (
        <TestimonialModal
          type={modalType}
          testimonial={selectedTestimonial}
          onClose={() => setShowModal(false)}
          onSave={() => {
            fetchTestimonials()
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

// Testimonial Modal Component
function TestimonialModal({
  type,
  testimonial,
  onClose,
  onSave
}: {
  type: 'view' | 'edit' | 'create'
  testimonial: Testimonial | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    role: testimonial?.role || '',
    content: testimonial?.content || '',
    rating: testimonial?.rating || 5,
    featured: testimonial?.featured || false,
    active: testimonial?.active !== false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = type === 'create' ? '/api/admin/testimonials' : `/api/admin/testimonials/${testimonial?.id}`
      const method = type === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSave()
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {type === 'create' ? 'Add New Testimonial' : type === 'edit' ? 'Edit Testimonial' : 'Testimonial Details'}
          </h2>
        </div>

        <div className="p-6">
          {type === 'view' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{testimonial?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <p className="text-gray-900">{testimonial?.role || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center">
                  {renderStars(testimonial?.rating || 0)}
                  <span className="ml-2">({testimonial?.rating}/5)</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <p className="text-gray-900 whitespace-pre-wrap">{testimonial?.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    testimonial?.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {testimonial?.featured ? 'Yes' : 'No'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    testimonial?.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {testimonial?.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                <p className="text-gray-900">{testimonial ? new Date(testimonial.createdAt).toLocaleString() : ''}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  placeholder="e.g., Student, Teacher, Director"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  placeholder="Enter the testimonial content..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300 text-brand-blue shadow-sm focus:border-brand-blue focus:ring focus:ring-offset-0 focus:ring-brand-blue focus:ring-opacity-20"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                      className="rounded border-gray-300 text-brand-blue shadow-sm focus:border-brand-blue focus:ring focus:ring-offset-0 focus:ring-brand-blue focus:ring-opacity-20"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <Button onClick={onClose} variant="outline">
            {type === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {type !== 'view' && (
            <Button
              onClick={handleSubmit}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              {type === 'create' ? 'Create Testimonial' : 'Save Changes'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}