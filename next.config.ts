import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações de imagem
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Cabeçalhos de segurança
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
    ];
  },
};

export default nextConfig;
