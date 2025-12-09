import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        domains: ['encrypted-tbn0.gstatic.com'],
        formats: ['image/webp', 'image/avif'],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;