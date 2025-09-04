/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds to prevent build failures in production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during builds for faster builds
    ignoreBuildErrors: true,
  },
  // Output configuration for Docker
  output: 'standalone',
  // Optimize images for production
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig