import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/aposentadoria-rural-acre',
        destination: 'https://www.marciofranca.adv.br/aposentadoria-rural-acre/',
        permanent: true,
      },
      {
        source: '/regularizacao-fundiaria-acre',
        destination: 'https://www.marciofranca.adv.br/regularizacao-fundiaria-acre/',
        permanent: true,
      },
      {
        source: '/contato',
        destination: 'https://www.marciofranca.adv.br/contato/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/admin',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
