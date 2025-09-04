import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, Users, BookOpen, Star, Zap } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      id: 'trial',
      name: 'Free 30-min Trial',
      price: 'Free',
      duration: '30 minutes',
      description: 'Experience our teaching approach with no commitment. Perfect for getting started!',
      features: [
        'Skill assessment and learning goals discussion',
        'Meet your potential mentor',
        'See our interactive teaching style',
        'Get a personalized learning roadmap',
        'No credit card required'
      ],
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      highlight: 'Perfect for beginners'
    },
    {
      id: 'standard',
      name: 'Standard Mentoring',
      price: '$80/month',
      duration: '4 hours/month',
      description: 'Weekly 1-on-1 sessions for consistent skill development and project building.',
      features: [
        'One 1-hour session per week',
        'Personalized learning path',
        'Real-world project development',
        'Email support between sessions',
        'Progress tracking dashboard',
        'Portfolio development guidance'
      ],
      icon: <Users className="w-8 h-8" />,
      color: 'from-brand-cyan to-brand-cyan-light',
      highlight: 'Most popular for students'
    },
    {
      id: 'premium',
      name: 'Premium Mentoring',
      price: '$150/month',
      duration: '8+ hours/month',
      description: 'Intensive mentoring with custom curriculum and accelerated learning.',
      features: [
        'Two 1-hour sessions per week',
        'Custom learning curriculum designed for you',
        '30-min goal-setting and planning call',
        'Curated free resources and tools',
        'Priority email/chat support',
        'Weekly progress reviews',
        'Advanced project mentorship'
      ],
      icon: <Star className="w-8 h-8" />,
      color: 'from-brand-blue to-brand-blue-light',
      highlight: 'Best value - 2x faster results'
    },
    {
      id: 'curriculum',
      name: 'Self-Learning Curriculum',
      price: '$30 one-time',
      duration: 'Self-paced',
      description: 'Custom learning path with curated resources and 30-min planning call.',
      features: [
        '30-minute goal-setting consultation',
        'Personalized curriculum roadmap',
        'Curated free resources and tutorials',
        'Learning milestone checkpoints',
        'Email support for questions',
        'Access to community Discord'
      ],
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-500',
      highlight: 'Great for self-motivated learners'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-navy via-brand-slate to-brand-black">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-brand-cyan">Services</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            From free trials to intensive mentoring - find the perfect learning path for your programming journey.
          </p>
          <Link href="/#pricing">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3">
              ← Back to Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white`}>
                    {service.icon}
                  </div>
                  <div className="mb-2">
                    <span className="bg-brand-emerald/10 text-brand-emerald text-xs font-semibold px-3 py-1 rounded-full">
                      {service.highlight}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{service.name}</CardTitle>
                  <div className="text-3xl font-bold text-brand-blue mb-2">{service.price}</div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${
                      service.id === 'trial' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' 
                        : 'bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-dark hover:to-brand-blue'
                    } text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {service.id === 'trial' ? '🎯 Book Free Trial' : `🚀 Get Started`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 border-brand-purple/30 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-4">
                🏫 Schools & Organizations
              </CardTitle>
              <p className="text-xl text-gray-200 mb-6">
                Transform your institution's programming education with our comprehensive solutions.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                    📚
                  </div>
                  <h4 className="font-semibold mb-2 text-white">Curriculum Development</h4>
                  <p className="text-sm text-gray-200">Custom programs aligned with your educational goals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                    👥
                  </div>
                  <h4 className="font-semibold mb-2 text-white">Teacher Training</h4>
                  <p className="text-sm text-gray-200">Comprehensive educator preparation and ongoing support</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                    📈
                  </div>
                  <h4 className="font-semibold mb-2 text-white">Implementation</h4>
                  <p className="text-sm text-gray-200">Full program rollout with performance tracking</p>
                </div>
              </div>
              <div className="text-center">
                <Button className="bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-purple/90 hover:to-brand-cyan/90 text-white font-bold px-8 py-3 rounded-xl shadow-lg">
                  📞 Schedule Free Consultation
                </Button>
                <p className="text-sm text-gray-300 mt-3">Custom pricing based on your institution's needs</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">How does the free trial work?</h3>
              <p className="text-gray-200 text-sm">
                Book a 30-minute session to meet your mentor, discuss your goals, and experience our teaching style. No credit card required, no strings attached.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">Can I switch plans anytime?</h3>
              <p className="text-gray-200 text-sm">
                Absolutely! Upgrade, downgrade, or pause your subscription at any time. We'll pro-rate the difference for upgrades.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">What programming languages do you teach?</h3>
              <p className="text-gray-200 text-sm">
                Python, JavaScript, HTML/CSS, Java, C++, and more. We customize based on your goals - web development, game development, or academic preparation.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">How do school partnerships work?</h3>
              <p className="text-gray-200 text-sm">
                We start with a free consultation to understand your needs, then create a custom proposal including curriculum design, teacher training, and ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}