"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  const [isStudent, setIsStudent] = useState(true)

  const plans = [
    {
      name: "Starter",
      subtitle: "Self-Learning kit",
      price: isStudent ? "Free" : "$20",
      description: "Essential resources to begin your coding journey",
      features: [
        "Free learning resources",
        "Self-paced learning",
        "Community access",
        "Basic project templates"
      ],
      isPopular: false,
      buttonText: "Start Free"
    },
    {
      name: "Guided Program",
      subtitle: "Build with Me",
      price: isStudent ? "Free" : "$50",
      description: "Personalized guidance with live sessions",
      features: [
        "Live personalized sessions",
        "Curriculum-based projects",
        "Progress tracking",
        "Direct feedback"
      ],
      isPopular: false,
      buttonText: "Get Started"
    },
    {
      name: "Mentorship",
      subtitle: "Plus",
      price: isStudent ? "Free" : "$100",
      description: "Complete learning experience with community",
      features: [
        "Monthly coaching calls",
        "Private learning community",
        "Priority project reviews",
        "All previous perks"
      ],
      isPopular: true,
      buttonText: "Join Now"
    }
  ]

  return (
    <section className="py-20 px-4 bg-brand-yellow">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Choose your path
          </h2>
          
          <div className="inline-flex items-center bg-black/10 rounded-full p-1">
            <button
              onClick={() => setIsStudent(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isStudent 
                  ? 'bg-black text-brand-yellow' 
                  : 'text-black hover:bg-black/5'
              }`}
            >
              I am a student
            </button>
            <button
              onClick={() => setIsStudent(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                !isStudent 
                  ? 'bg-black text-brand-yellow' 
                  : 'text-black hover:bg-black/5'
              }`}
            >
              I am a parent
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`${
                plan.isPopular 
                  ? 'bg-brand-black text-white border-0 shadow-2xl' 
                  : 'bg-white border-0 shadow-sm'
              } relative`}
            >
              <CardHeader className="pb-4">
                <div className="text-center">
                  <CardTitle className="text-lg font-bold">
                    {plan.name}
                  </CardTitle>
                  <p className={`text-sm ${plan.isPopular ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.subtitle}
                  </p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {!plan.price.includes('Free') && (
                      <span className={`text-sm ${plan.isPopular ? 'text-white/60' : 'text-gray-500'}`}>
                        /month
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-2 ${plan.isPopular ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.isPopular ? 'text-brand-yellow' : 'text-brand-green'
                      }`} />
                      <span className={`text-sm ${plan.isPopular ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.isPopular ? "brand" : "brandDark"}
                  className="w-full"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}