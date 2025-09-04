import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestData() {
  console.log('Creating test data...')

  // Create additional contacts
  const contacts = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      message: 'Interested in Python programming courses for beginners. I have no prior experience but really want to learn.',
      type: 'TRIAL' as const,
      status: 'PENDING' as const
    },
    {
      name: 'Bob Smith',
      email: 'bob@school.edu',
      message: 'We are looking to implement a comprehensive computer science curriculum for our high school. Please contact us to discuss options.',
      type: 'CONSULTATION' as const,
      status: 'IN_PROGRESS' as const
    },
    {
      name: 'Carol Davis',
      email: 'carol@example.com',
      message: 'My daughter is 12 years old and very interested in coding. Do you have courses suitable for her age group?',
      type: 'GENERAL' as const,
      status: 'COMPLETED' as const
    },
    {
      name: 'David Wilson',
      email: 'david@example.com',
      message: 'I am a teacher looking to enhance my programming skills to better teach my students. What programs do you offer for educators?',
      type: 'CONSULTATION' as const,
      status: 'PENDING' as const
    },
    {
      name: 'Emma Brown',
      email: 'emma@example.com',
      message: 'Looking for advanced JavaScript and React training. I have 2 years of experience.',
      type: 'TRIAL' as const,
      status: 'COMPLETED' as const
    }
  ]

  for (const contact of contacts) {
    try {
      await prisma.contact.create({ data: contact })
      console.log(`Created contact: ${contact.name}`)
    } catch (e) {
      console.log(`Contact ${contact.name} already exists or error occurred`)
    }
  }

  console.log('✅ Test data created successfully!')
}

createTestData()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })