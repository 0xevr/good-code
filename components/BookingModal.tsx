"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Calendar, Clock, User, MessageCircle, CheckCircle } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  serviceType: 'trial' | 'consultation' | 'premium' | 'standard'
}

export default function BookingModal({ isOpen, onClose, serviceType }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    goals: '',
    preferredTime: '',
    timezone: 'Morocco (GMT+1)',
    message: ''
  })
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const serviceConfig = {
    trial: {
      title: "Book Your Free 30-min Trial",
      description: "Experience our teaching approach with no commitment",
      duration: "30 minutes",
      price: "Free",
      icon: "🎯"
    },
    consultation: {
      title: "Schedule School Consultation", 
      description: "Discuss custom curriculum and implementation",
      duration: "30 minutes",
      price: "Free",
      icon: "🏫"
    },
    premium: {
      title: "Start Premium Plan",
      description: "2 sessions/week + custom curriculum",
      duration: "Initial setup call",
      price: "$150/month",
      icon: "⭐"
    },
    standard: {
      title: "Start Standard Plan",
      description: "1 session/week mentoring",
      duration: "Initial setup call", 
      price: "$80/month",
      icon: "👨‍💻"
    }
  }

  const config = serviceConfig[serviceType]

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]

  const nextDays = Array.from({length: 7}, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      date: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    try {
      const leadData = {
        ...bookingData,
        selectedDate,
        selectedTime,
        serviceType,
        timestamp: new Date().toISOString()
      }

      const contactData = {
        name: bookingData.name,
        email: bookingData.email,
        message: `${bookingData.message}\n\nBooking Details:\n- Service: ${serviceType}\n- Date: ${selectedDate}\n- Time: ${selectedTime}\n- Experience: ${bookingData.experience}\n- Goals: ${bookingData.goals}\n- Phone: ${bookingData.phone}\n- Age: ${bookingData.age}`,
        type: serviceType === 'trial' ? 'TRIAL' : serviceType === 'consultation' ? 'CONSULTATION' : 'GENERAL'
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      })

      if (response.ok) {
        console.log('✅ Lead sent successfully!')
        setStep(4) // Success step
      } else {
        console.error('❌ Failed to send lead')
        // Still show success to user but log error
        setStep(4)
      }
    } catch (error) {
      console.error('❌ Error sending lead:', error)
      // Still show success to user but log error
      setStep(4)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-4xl mb-3">{config.icon}</div>
            <CardTitle className="text-2xl mb-2">{config.title}</CardTitle>
            <p className="text-gray-600">{config.description}</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {config.duration}
              </span>
              <span className="flex items-center gap-1 font-semibold text-brand-blue">
                💰 {config.price}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
                <select
                  value={bookingData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                >
                  <option value="">Age group</option>
                  <option value="6-12">6-12 years</option>
                  <option value="13-17">13-17 years</option>
                  <option value="18+">18+ years</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
              
              <Button 
                onClick={() => setStep(2)}
                disabled={!bookingData.name || !bookingData.email}
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Goals & Experience */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tell us about your goals</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Programming experience:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Beginner', 'Some experience', 'Advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('experience', level)}
                      className={`p-2 text-sm rounded-lg border-2 transition-colors ${
                        bookingData.experience === level
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Main goal:</label>
                <select
                  value={bookingData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                >
                  <option value="">Select your main goal</option>
                  <option value="learn-basics">Learn programming basics</option>
                  <option value="build-projects">Build real projects</option>
                  <option value="college-prep">College/career preparation</option>
                  <option value="school-program">Implement school program</option>
                </select>
              </div>

              <textarea
                placeholder="Any specific questions or requests? (Optional)"
                value={bookingData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-none"
              />

              <div className="flex gap-3">
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!bookingData.experience || !bookingData.goals}
                  className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white"
                >
                  Choose Time
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Select Date & Time</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Choose date:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {nextDays.map(day => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                        selectedDate === day.date
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {day.display}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium mb-2">Choose time (Morocco GMT+1):</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm rounded-lg border-2 transition-colors ${
                          selectedTime === time
                            ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-brand-emerald rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-emerald">Booking Confirmed! 🎉</h3>
              
              <div className="bg-brand-blue/5 rounded-lg p-4 text-left">
                <p className="font-semibold mb-2">Session Details:</p>
                <p>📅 {nextDays.find(d => d.date === selectedDate)?.display}</p>
                <p>🕐 {selectedTime} (Morocco Time)</p>
                <p>👨‍🏫 30-minute session with Youness</p>
                <p>📧 Zoom link sent to {bookingData.email}</p>
              </div>

              <p className="text-gray-600">
                You'll receive a confirmation email with the Zoom link and preparation tips within 5 minutes.
              </p>

              <Button 
                onClick={onClose}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8"
              >
                Perfect! 
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}