import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@goodcode.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Seed FAQ data
  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "One 60-minute programming session with personalized feedback and a custom learning plan.",
      order: 1
    },
    {
      question: "How do monthly subscriptions work?",
      answer: "Choose from flexible plans with weekly or bi-weekly 1-on-1 sessions, plus ongoing support and project reviews.",
      order: 2
    },
    {
      question: "What programming languages do you teach?",
      answer: "Python, JavaScript, Java, C++, HTML/CSS, React, Node.js, and more based on your goals.",
      order: 3
    },
    {
      question: "Do you work with schools and institutions?",
      answer: "Yes! We design custom curriculum, provide teacher training, and support institutional programming education.",
      order: 4
    }
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    })
  }

  console.log('✅ FAQ data seeded')

  // Seed testimonials
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "High School Student",
      content: "Youness helped me go from zero coding knowledge to building my own web applications. His teaching style is perfect for beginners!",
      rating: 5,
      featured: true
    },
    {
      name: "Dr. Amina Benali",
      role: "Academic Director",
      content: "GoodCode transformed our computer science program. Student engagement increased 300% and project completion rates hit 95%.",
      rating: 5,
      featured: true
    },
    {
      name: "Ahmed Khalil",
      role: "University Student",
      content: "The personalized approach and continuous mentoring made all the difference in my programming journey.",
      rating: 5,
      featured: false
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }

  console.log('✅ Testimonials seeded')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })