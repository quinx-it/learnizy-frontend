import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['encrypted-tbn0.gstatic.com'], 
  },
};

export default nextConfig;
