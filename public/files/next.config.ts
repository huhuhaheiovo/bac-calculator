// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for better DX
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  // Redirect www to non-www (canonical domain)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bac-calculator.com' }],
        destination: 'https://bac-calculator.com/:path*',
        permanent: true,
      },
      // Root → main landing page
      {
        source: '/',
        destination: '/bac-calculator',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
