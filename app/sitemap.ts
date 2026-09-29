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
  ];
}
