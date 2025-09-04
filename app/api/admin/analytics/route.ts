import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get date ranges
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Basic stats
    const [
      totalContacts,
      totalTestimonials,
      totalFAQs,
      recentContacts,
      contactsByType,
      contactsByStatus,
      testimonialsByRating,
      contactsLast30Days,
      contactsLast7Days
    ] = await Promise.all([
      // Total counts
      prisma.contact.count(),
      prisma.testimonial.count({ where: { active: true } }),
      prisma.fAQ.count({ where: { active: true } }),
      
      // Recent contacts
      prisma.contact.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      }),

      // Contact breakdown by type
      prisma.contact.groupBy({
        by: ['type'],
        _count: { type: true }
      }),

      // Contact breakdown by status
      prisma.contact.groupBy({
        by: ['status'],
        _count: { status: true }
      }),

      // Testimonial breakdown by rating
      prisma.testimonial.groupBy({
        by: ['rating'],
        _count: { rating: true },
        where: { active: true }
      }),

      // Contacts over time - last 30 days
      prisma.contact.findMany({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        },
        select: {
          createdAt: true,
          type: true
        }
      }),

      // Contacts over time - last 7 days
      prisma.contact.findMany({
        where: {
          createdAt: {
            gte: sevenDaysAgo
          }
        },
        select: {
          createdAt: true,
          type: true
        }
      })
    ])

    // Process time series data for charts
    const processTimeSeriesData = (contacts: any[], days: number) => {
      const dateMap = new Map()
      const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      
      // Initialize all dates with 0
      for (let i = 0; i < days; i++) {
        const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
        const dateKey = date.toISOString().split('T')[0]
        dateMap.set(dateKey, { date: dateKey, total: 0, trial: 0, consultation: 0, general: 0 })
      }

      // Count contacts by date
      contacts.forEach(contact => {
        const dateKey = contact.createdAt.toISOString().split('T')[0]
        if (dateMap.has(dateKey)) {
          const entry = dateMap.get(dateKey)
          entry.total++
          entry[contact.type.toLowerCase()]++
        }
      })

      return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date))
    }

    // Calculate conversion rates
    const trialRequests = contactsByType.find(c => c.type === 'TRIAL')?._count.type || 0
    const completedContacts = contactsByStatus.find(c => c.status === 'COMPLETED')?._count.status || 0
    const conversionRate = totalContacts > 0 ? (completedContacts / totalContacts * 100) : 0

    // Growth calculations
    const growthRate = contactsLast7Days > 0 && contactsLast30Days > 0 
      ? ((contactsLast7Days * 4.29 - contactsLast30Days) / contactsLast30Days * 100)
      : 0

    const analytics = {
      overview: {
        totalContacts,
        totalTestimonials,
        totalFAQs,
        recentContacts,
        conversionRate: Math.round(conversionRate * 100) / 100,
        growthRate: Math.round(growthRate * 100) / 100
      },
      contactsByType: contactsByType.map(item => ({
        type: item.type,
        count: item._count.type,
        percentage: Math.round((item._count.type / totalContacts) * 100)
      })),
      contactsByStatus: contactsByStatus.map(item => ({
        status: item.status,
        count: item._count.status,
        percentage: Math.round((item._count.status / totalContacts) * 100)
      })),
      testimonialsByRating: testimonialsByRating.map(item => ({
        rating: item.rating,
        count: item._count.rating
      })),
      timeSeriesData: {
        last30Days: processTimeSeriesData(contactsLast30Days, 30),
        last7Days: processTimeSeriesData(contactsLast7Days, 7)
      },
      recentActivity: await prisma.contact.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          createdAt: true
        }
      })
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}