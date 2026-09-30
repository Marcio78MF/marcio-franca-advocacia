import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bpc.marciofranca.adv.br';
  const agora = new Date();

  return [
    { url: base, lastModified: agora, changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${base}/blog/bpc-loas-negado-o-que-fazer`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/bpc-autismo-tea`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/bpc-negado-por-renda`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/renda-familiar-bpc`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/bpc-idoso-65-anos`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/pericia-avaliacao-social-bpc`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/bpc-suspenso-bloqueado`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/cadunico-bpc`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
