import { MetadataRoute } from 'next';

// robots.txt — Márcio Jr. França Advocacia (OAB/AC 2.882)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
    sitemap: 'https://marciofrancaadvocacia.com.br/sitemap.xml',
  };
}
