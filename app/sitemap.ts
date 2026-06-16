import { MetadataRoute } from 'next';
import { AREAS_ATUACAO, POSTS_MOCK } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://marciofrancaadvocacia.com.br';
  const agora = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: base, lastModified: agora, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/blog`, lastModified: agora, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/triagem`, lastModified: agora, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/sobre`, lastModified: agora, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contato`, lastModified: agora, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const areasUrls: MetadataRoute.Sitemap = AREAS_ATUACAO.map((area) => ({
    url: `${base}${area.slug}`,
    lastModified: agora,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const postsUrls: MetadataRoute.Sitemap = POSTS_MOCK.filter((p) => p.publicado).map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.criadoEm),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...estaticas, ...areasUrls, ...postsUrls];
}
