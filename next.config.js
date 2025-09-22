/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    
  },
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'images.unsplash.com',
      'source.unsplash.com',
      'picsum.photos',
      'worldfootprints.com',
      'media.istockphoto.com',
      'source.media.istockphoto.com',
      'images.pexels.com',
      'source.pexels.com',
      'upload.wikimedia.org',
      'source.upload.wikimedia.org',
      'tse2.mm.bing.net'

    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AI_SERVICE_URL: process.env.NEXT_PUBLIC_AI_SERVICE_URL,
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig