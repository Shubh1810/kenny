/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: process.env.NEXT_PUBLIC_API_URL || '*' 
          },
          { 
            key: 'Access-Control-Allow-Credentials', 
            value: 'true' 
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
