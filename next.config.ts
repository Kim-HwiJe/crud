import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    // 원격 이미지 도메인 허용 (Google, GitHub 아바타)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],

    // domains 배열도 유지 (동작에 문제 없음)
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
}

export default nextConfig
