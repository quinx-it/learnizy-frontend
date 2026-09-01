import type { NextConfig } from 'next';

const apiTarget = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' }],
  },
  async rewrites() {
    if (!apiTarget) return [];

    return [
      {
        source: '/api/:path*',
        destination: `${apiTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
