import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const content = await prisma.siteContent.findMany({
      orderBy: { key: 'asc' }
    })

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error fetching site content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { key, value, description } = body

    const content = await prisma.siteContent.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description }
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error saving site content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}