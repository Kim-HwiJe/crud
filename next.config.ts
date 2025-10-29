import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ 타입 오류 무시
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint 경고 무시
  },
}

export default nextConfig
