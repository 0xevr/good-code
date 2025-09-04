"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  HelpCircle,
  Star,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
  RefreshCw
} from 'lucide-react'

interface Analytics {
  overview: {
    totalContacts: number
    totalTestimonials: number
    totalFAQs: number
    recentContacts: number
    conversionRate: number
    growthRate: number
  }
  contactsByType: Array<{
    type: string
    count: number
    percentage: number
  }>
  contactsByStatus: Array<{
    status: string
    count: number
    percentage: number
  }>
  testimonialsByRating: Array<{
    rating: number
    count: number
  }>
  timeSeriesData: {
    last30Days: Array<{
      date: string
      total: number
      trial: number
      consultation: number
      general: number
    }>
    last7Days: Array<{
      date: string
      total: number
      trial: number
      consultation: number
      general: number
    }>
  }
  recentActivity: Array<{
    id: string
    name: string
    type: string
    status: string
    createdAt: string
  }>
}

export default function Analytics() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7days' | '30days'>('30days')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }
    fetchAnalytics()
  }, [session, status, router])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/analytics')
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600 bg-yellow-100'
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100'
      case 'COMPLETED': return 'text-green-600 bg-green-100'
      case 'CANCELLED': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TRIAL': return '🎯'
      case 'CONSULTATION': return '🏫'
      default: return '📞'
    }
  }

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Website performance and engagement metrics</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={fetchAnalytics}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
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
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-brand-blue" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalContacts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Testimonials</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalTestimonials}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <HelpCircle className="h-8 w-8 text-brand-emerald" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active FAQs</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalFAQs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent (30d)</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.recentContacts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.conversionRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Activity className={`h-8 w-8 ${analytics.overview.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">{Math.abs(analytics.overview.growthRate)}%</p>
                  {analytics.overview.growthRate >= 0 ? (
                    <ArrowUp className="w-4 h-4 text-green-500 ml-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500 ml-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Contacts by Type */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts by Type</h3>
            <div className="space-y-4">
              {analytics.contactsByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{getTypeIcon(item.type)}</span>
                    <span className="text-sm font-medium text-gray-900">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-200 rounded-full h-2 w-24">
                      <div 
                        className="bg-brand-blue h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{item.count}</span>
                    <span className="text-xs text-gray-500 w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts by Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts by Status</h3>
            <div className="space-y-4">
              {analytics.contactsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full mr-3 ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-200 rounded-full h-2 w-24">
                      <div 
                        className="bg-brand-emerald h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{item.count}</span>
                    <span className="text-xs text-gray-500 w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Contact Trends Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Trends</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => setTimeRange('7days')}
                  variant={timeRange === '7days' ? 'default' : 'outline'}
                  size="sm"
                >
                  7 Days
                </Button>
                <Button
                  onClick={() => setTimeRange('30days')}
                  variant={timeRange === '30days' ? 'default' : 'outline'}
                  size="sm"
                >
                  30 Days
                </Button>
              </div>
            </div>
            
            <div className="h-64 flex items-end space-x-2 overflow-x-auto">
              {(timeRange === '30days' ? analytics.timeSeriesData.last30Days : analytics.timeSeriesData.last7Days)
                .slice(-14) // Show last 14 data points for better visibility
                .map((dataPoint, index) => (
                <div key={dataPoint.date} className="flex flex-col items-center min-w-8">
                  <div className="flex flex-col items-center space-y-1 mb-2">
                    {dataPoint.trial > 0 && (
                      <div 
                        className="bg-brand-blue rounded-sm w-6"
                        style={{ height: `${Math.max(4, (dataPoint.trial / Math.max(...analytics.timeSeriesData.last30Days.map(d => d.total), 1)) * 200)}px` }}
                        title={`Trials: ${dataPoint.trial}`}
                      ></div>
                    )}
                    {dataPoint.consultation > 0 && (
                      <div 
                        className="bg-brand-emerald rounded-sm w-6"
                        style={{ height: `${Math.max(4, (dataPoint.consultation / Math.max(...analytics.timeSeriesData.last30Days.map(d => d.total), 1)) * 200)}px` }}
                        title={`Consultations: ${dataPoint.consultation}`}
                      ></div>
                    )}
                    {dataPoint.general > 0 && (
                      <div 
                        className="bg-brand-cyan rounded-sm w-6"
                        style={{ height: `${Math.max(4, (dataPoint.general / Math.max(...analytics.timeSeriesData.last30Days.map(d => d.total), 1)) * 200)}px` }}
                        title={`General: ${dataPoint.general}`}
                      ></div>
                    )}
                    {dataPoint.total === 0 && <div className="bg-gray-200 rounded-sm w-6 h-1"></div>}
                  </div>
                  <span className="text-xs text-gray-500 transform -rotate-45 origin-bottom-left whitespace-nowrap">
                    {new Date(dataPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-brand-blue rounded mr-2"></div>
                <span className="text-sm text-gray-600">Trials</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-brand-emerald rounded mr-2"></div>
                <span className="text-sm text-gray-600">Consultations</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-brand-cyan rounded mr-2"></div>
                <span className="text-sm text-gray-600">General</span>
              </div>
            </div>
          </div>

          {/* Testimonial Ratings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Testimonial Ratings</h3>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const ratingData = analytics.testimonialsByRating.find(r => r.rating === rating)
                const count = ratingData?.count || 0
                const percentage = analytics.overview.totalTestimonials > 0 
                  ? Math.round((count / analytics.overview.totalTestimonials) * 100)
                  : 0

                return (
                  <div key={rating} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: rating }, (_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        {Array.from({ length: 5 - rating }, (_, i) => (
                          <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{rating} Stars</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                      <span className="text-xs text-gray-500 w-8">{percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getTypeIcon(activity.type)}</span>
                        <span className="text-sm text-gray-900">{activity.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}