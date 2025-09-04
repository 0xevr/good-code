"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Eye,
  Edit,
  Trash2,
  Plus,
  HelpCircle,
  Calendar,
  Filter,
  Search,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

interface FAQResponse {
  faqs: FAQ[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function FAQManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ active: '', search: '' })
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create'>('view')
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }
    fetchFAQs()
  }, [session, status, router, pagination.page, filters])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.active && { active: filters.active }),
      })

      const response = await fetch(`/api/admin/faq?${params}`)
      const data: FAQResponse = await response.json()
      
      setFaqs(data.faqs)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (faqId: string, active: boolean) => {
    try {
      const response = await fetch(`/api/admin/faq/${faqId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active })
      })

      if (response.ok) {
        fetchFAQs()
      }
    } catch (error) {
      console.error('Failed to update FAQ:', error)
    }
  }

  const handleUpdateOrder = async (faqId: string, newOrder: number) => {
    try {
      const response = await fetch(`/api/admin/faq/${faqId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder })
      })

      if (response.ok) {
        fetchFAQs()
      }
    } catch (error) {
      console.error('Failed to update FAQ order:', error)
    }
  }

  const handleDelete = async (faqId: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const response = await fetch(`/api/admin/faq/${faqId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchFAQs()
      }
    } catch (error) {
      console.error('Failed to delete FAQ:', error)
    }
  }

  const openModal = (type: 'view' | 'edit' | 'create', faq?: FAQ) => {
    setModalType(type)
    setSelectedFAQ(faq || null)
    setShowModal(true)
  }

  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs)
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId)
    } else {
      newExpanded.add(faqId)
    }
    setExpandedFAQs(newExpanded)
  }

  const moveUp = (faq: FAQ) => {
    handleUpdateOrder(faq.id, faq.order - 1)
  }

  const moveDown = (faq: FAQ) => {
    handleUpdateOrder(faq.id, faq.order + 1)
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
              <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
              <p className="text-gray-600">Manage frequently asked questions</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => openModal('create')}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>
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
                onClick={fetchFAQs}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">Loading FAQs...</div>
          ) : faqs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">No FAQs found</div>
          ) : (
            faqs.map((faq, index) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-8 w-8 text-brand-blue" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            Order: {faq.order}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            faq.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {faq.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <h3 
                          className="font-semibold text-gray-900 cursor-pointer hover:text-brand-blue"
                          onClick={() => toggleExpanded(faq.id)}
                        >
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => moveUp(faq)}
                        disabled={index === 0}
                        variant="outline"
                        size="sm"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => moveDown(faq)}
                        disabled={index === faqs.length - 1}
                        variant="outline"
                        size="sm"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {expandedFAQs.has(faq.id) && (
                    <div className="mb-4 pl-11">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pl-11">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created {new Date(faq.createdAt).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => toggleExpanded(faq.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {expandedFAQs.has(faq.id) ? 'Collapse' : 'Expand'}
                      </Button>
                      <Button
                        onClick={() => openModal('edit', faq)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleToggleActive(faq.id, faq.active)}
                        variant="outline"
                        size="sm"
                      >
                        {faq.active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        onClick={() => handleDelete(faq.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && faqs.length > 0 && (
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

      {/* Modal for Edit/Create */}
      {showModal && (
        <FAQModal
          type={modalType}
          faq={selectedFAQ}
          onClose={() => setShowModal(false)}
          onSave={() => {
            fetchFAQs()
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

// FAQ Modal Component
function FAQModal({
  type,
  faq,
  onClose,
  onSave
}: {
  type: 'view' | 'edit' | 'create'
  faq: FAQ | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    order: faq?.order || 0,
    active: faq?.active !== false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = type === 'create' ? '/api/admin/faq' : `/api/admin/faq/${faq?.id}`
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
      console.error('Failed to save FAQ:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {type === 'create' ? 'Add New FAQ' : 'Edit FAQ'}
          </h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
              <input
                type="text"
                required
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="Enter the question..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
              <textarea
                required
                rows={6}
                value={formData.answer}
                onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="Enter the answer..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  placeholder="Display order"
                />
              </div>
              <div>
                <label className="flex items-center pt-7">
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
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
          >
            {type === 'create' ? 'Create FAQ' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}