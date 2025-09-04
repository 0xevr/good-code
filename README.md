# 🎯 GoodCode - Programming Education Platform

A modern, full-stack tutoring platform built with Next.js, featuring an admin panel, contact management, and dockerized deployment.

## 🚀 Features

### Frontend
- **Clean, Modern Design**: Optimized for reduced clutter and better UX
- **SEO Optimized**: Comprehensive meta tags, structured data, and social media cards
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: Code playground, testimonials carousel, pricing calculator
- **Contact Forms**: Integrated booking system with trial and consultation options

### Admin Panel
- **Authentication**: Secure login with NextAuth.js
- **Contact Management**: View and manage inquiries and bookings
- **Content Management**: Edit testimonials, FAQ, and site content
- **Analytics Dashboard**: Track website performance and engagement
- **Database Management**: Full CRUD operations for all content

### Backend & Database
- **PostgreSQL**: Robust relational database with Prisma ORM
- **API Routes**: RESTful APIs for contact, admin, and content management
- **Authentication**: Secure authentication with role-based access
- **Data Validation**: Zod schema validation for all inputs

### DevOps
- **Docker Support**: Complete containerization with docker-compose
- **Database Migrations**: Prisma migrations for schema management
- **Seed Data**: Pre-populated with sample data for quick setup

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **Validation**: Zod for schema validation
- **Forms**: React Hook Form with validation resolvers
- **Deployment**: Docker, Docker Compose

## 🚀 Quick Start

### Option 1: Docker Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd tutoring-draft3

# Start all services
npm run docker:up

# Generate Prisma client and run migrations
docker-compose exec app npm run db:generate
docker-compose exec app npm run db:migrate
docker-compose exec app npm run db:seed

# Visit the application
open http://localhost:3000
```

### Option 2: Manual Setup (Fastest)

```bash
# Install dependencies
npm install

# Set up database (PostgreSQL already running on port 5432)
npm run db:generate
npm run db:push
npm run db:seed
npm run db:test-data

# Start the development server
npm run dev
# Server will start on http://localhost:3005 (or next available port)
```

### Option 3: Development Only Database

```bash
# Start only database services
npm run docker:dev

# Generate Prisma client and setup
npm run db:generate
npm run db:push
npm run db:seed
npm run db:test-data

# Start the development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://goodcode:goodcode_password@localhost:5432/goodcode_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# Admin credentials (change these!)
ADMIN_EMAIL="admin@goodcode.com"
ADMIN_PASSWORD="admin123"
```

## 📊 Available Scripts

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint

# Database
npm run db:generate        # Generate Prisma client
npm run db:push           # Push schema to database
npm run db:migrate        # Run database migrations
npm run db:studio         # Open Prisma Studio
npm run db:seed           # Seed database with sample data

# Docker
npm run docker:up         # Start all containers
npm run docker:down       # Stop all containers  
npm run docker:build      # Build containers
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: Admin users with role-based access
- **contacts**: Contact form submissions and bookings
- **testimonials**: Customer testimonials with ratings
- **faqs**: Frequently asked questions
- **site_content**: Dynamic site content management

## 🔐 Admin Panel

### **Access Credentials**
- **URL**: `http://localhost:3005/admin/login` (adjust port as needed)
- **Email**: `admin@goodcode.com`
- **Password**: `admin123`

### **Complete Admin Features**

#### 📊 **Dashboard**
- Real-time analytics overview
- Contact statistics and trends
- Quick action buttons
- Recent activity feed

#### 👥 **Contact Management** (`/admin/contacts`)
- **Full CRUD Operations**: Create, Read, Update, Delete contacts
- **Advanced Filtering**: By status, type, date range
- **Bulk Operations**: Update multiple contacts
- **Status Management**: Pending → In Progress → Completed
- **Export Capabilities**: Contact data export
- **Search Functionality**: Find contacts by name/email

#### ⭐ **Testimonial Management** (`/admin/testimonials`)
- **Complete CRUD System**: Add, edit, delete testimonials
- **Rating Management**: 1-5 star rating system
- **Featured Control**: Mark testimonials as featured
- **Active/Inactive Toggle**: Control visibility
- **Advanced Filtering**: By rating, status, featured
- **Rich Content Editor**: Full testimonial management

#### ❓ **FAQ Management** (`/admin/faq`)
- **Full CRUD Operations**: Create, edit, delete FAQs
- **Order Management**: Drag-and-drop ordering
- **Active/Inactive Toggle**: Control FAQ visibility
- **Bulk Editing**: Multiple FAQ operations
- **Preview Mode**: See how FAQs appear to users

#### 📊 **Analytics Dashboard** (`/admin/analytics`)
- **Real-time Metrics**: Live data updates
- **Time-series Charts**: 7-day and 30-day trends
- **Conversion Tracking**: Contact→Completion rates
- **Growth Analysis**: Period-over-period growth
- **Segmentation**: Data by contact type and status
- **Visual Charts**: Interactive data visualization

#### 🎨 **Content Management** (`/admin/content`)
- **Site-wide Settings**: Update all website content
- **SEO Control**: Meta tags, descriptions, keywords
- **Brand Management**: Colors, logos, messaging
- **Contact Information**: Update all contact details
- **Social Media**: Manage social links
- **Real-time Preview**: See changes immediately

## 🎨 Design System

### Colors
- **Primary Blue**: #1e40af (brand-blue)
- **Cyan**: #06b6d4 (brand-cyan) 
- **Emerald**: #10b981 (brand-emerald)
- **Navy**: #1e293b (brand-navy)
- **Slate**: #334155 (brand-slate)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable typography

## 🚀 Deployment

### Production Environment

1. **Environment Setup**:
   ```bash
   # Update environment variables for production
   NEXTAUTH_URL="https://yourdomain.com"
   DATABASE_URL="your-production-database-url"
   ```

2. **Docker Deployment**:
   ```bash
   # Build and deploy
   npm run docker:build
   npm run docker:up
   ```

3. **Database Migration**:
   ```bash
   # Run migrations in production
   docker-compose exec app npm run db:migrate
   ```

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Database**: Railway, Supabase, AWS RDS
- **Full Stack**: DigitalOcean App Platform, Render

## 📈 SEO Optimization

The platform includes comprehensive SEO optimization:

- **Meta Tags**: Complete title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Auto-generated sitemap
- **Robots.txt**: Search engine crawling guidelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- **Email**: hello@goodcode.com
- **Website**: https://goodcode.com

---

**Built with ❤️ by the GoodCode team**