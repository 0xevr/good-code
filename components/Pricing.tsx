"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  const [isStudent, setIsStudent] = useState(true)

  const plans = [
    {
      name: "Self-Learning Kit",
      subtitle: "",
      price: "Free | $20/month",
      description: "Perfect for independent learners who want to explore at their own pace.",
      features: [
        "💻 Interactive exercises",
        "📚 Project-based resources"
      ],
      isPopular: false,
      buttonText: "Start Free"
    },
    {
      name: "Guided Program",
      subtitle: "Most Popular",
      price: "$50/month",
      description: "Structured, live sessions with personalized feedback.",
      features: [
        "👨‍🏫 1-on-1 mentorship",
        "✅ Custom learning roadmap",
        "🎯 Build real-world projects"
      ],
      isPopular: true,
      buttonText: "Get Started"
    },
    {
      name: "Membership Plus",
      subtitle: "",
      price: "$80/month",
      description: "For learners who want ongoing support and community.",
      features: [
        "🌍 Join our coding community",
        "🔁 Weekly challenges",
        "🚀 Continuous skill growth"
      ],
      isPopular: false,
      buttonText: "Join Community"
    }
  ]

  return (
    <section className="py-20 px-4 bg-brand-yellow">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-black">
            Choose Your Path
          </h2>
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