import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/last-war-website',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
