import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Log the lead to console
    console.log('🎯 NEW LEAD RECEIVED:', {
      timestamp: new Date().toISOString(),
      ...data
    })
    
    // Send lead to Formspree for email delivery
    try {
      const formspreeData = new FormData()
      
      // Add all lead data to Formspree
      formspreeData.append('name', data.name || '')
      formspreeData.append('email', data.email || '')
      formspreeData.append('phone', data.phone || '')
      formspreeData.append('service', data.serviceType || data.age || 'Contact Form')
      formspreeData.append('experience', data.experience || '')
      formspreeData.append('goals', data.goals || '')
      formspreeData.append('urgency', data.urgency || '')
      formspreeData.append('message', data.message || '')
      formspreeData.append('selectedDate', data.selectedDate || '')
      formspreeData.append('selectedTime', data.selectedTime || '')
      formspreeData.append('source', data.source || 'booking-modal')
      formspreeData.append('timestamp', new Date().toLocaleString())
      
      // Send to your Formspree endpoint
      const formspreeResponse = await fetch('https://formspree.io/f/xzzakbzk', {
        method: 'POST',
        body: formspreeData
      })
      
      if (formspreeResponse.ok) {
        console.log('✅ Lead sent to email via Formspree!')
      } else {
        console.error('❌ Formspree submission failed:', formspreeResponse.statusText)
      }
      
    } catch (formspreeError) {
      console.error('❌ Error sending to Formspree:', formspreeError)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully',
      leadId: `lead_${Date.now()}` 
    })
    
  } catch (error) {
    console.error('Error capturing lead:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}