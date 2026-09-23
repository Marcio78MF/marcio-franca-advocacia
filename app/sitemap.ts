import { MetadataRoute } from 'next';
import { AREAS_ATUACAO } from '@/lib/data';
import { getPosts } from '@/lib/blog';

// Sitemap — Márcio Jr. França Advocacia (OAB/AC 2.882)
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bpc.marciofranca.adv.br';
  const agora = new Date();

  // /sobre, /contato, /avaliacoes e /atendimento/* estão noindex (evitar
  // conteúdo duplicado com marciofranca.adv.br), por isso não entram no sitemap.
  const estaticas: MetadataRoute.Sitemap = [
    { url: base, lastModified: agora, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/blog`, lastModified: agora, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/triagem`, lastModified: agora, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/politica-de-privacidade`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const areasUrls: MetadataRoute.Sitemap = AREAS_ATUACAO.map((area) => ({
    url: `${base}${area.slug}`,
    lastModified: agora,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const postsUrls: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.criadoEm),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...estaticas, ...areasUrls, ...postsUrls];
}
