import { MetadataRoute } from 'next';

// Sitemap — Márcio Jr. França Advocacia (OAB/AC 2.882)
// Só a home de bpc.marciofranca.adv.br é indexável. As demais páginas estão
// com noindex (evitar conteúdo duplicado com www.marciofranca.adv.br) e, por
// isso, não entram no sitemap (evita "URL noindex enviada" no Search Console).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bpc.marciofranca.adv.br';

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  ];
}
