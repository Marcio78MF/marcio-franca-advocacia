import type { Metadata } from 'next';
import { SITE_CONFIG, AREAS_ATUACAO } from './data';

// =====================================================
// SEO UTILITIES - Metadata + Schema.org
// =====================================================

type MetadataParams = {
  titulo: string;
  descricao?: string;
  slug?: string;
  palavrasChave?: string[];
  noIndex?: boolean;
  tipo?: 'website' | 'article';
  imagem?: string;
};

export function gerarMetadata({
  titulo,
  descricao,
  slug = '',
  palavrasChave = [],
  noIndex = false,
  tipo = 'website',
  imagem,
}: MetadataParams): Metadata {
  const tituloCompleto = `${titulo} | ${SITE_CONFIG.nome}`;
  const descricaoFinal = descricao || SITE_CONFIG.descricao;
  const url = `https://marciofrancaadvocacia.com.br/${slug}`;
  const imageObj = imagem
    ? [{ url: imagem.startsWith('http') ? imagem : `https://marciofrancaadvocacia.com.br${imagem}` }]
    : [];

  return {
    metadataBase: new URL('https://marciofrancaadvocacia.com.br'),
    title: tituloCompleto,
    description: descricaoFinal,
    keywords: [
      ...palavrasChave,
      'advogado Rio Branco',
      'advogado Acre',
      SITE_CONFIG.oab,
    ],
    authors: [{ name: SITE_CONFIG.nomeAdvogado }],
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: tituloCompleto,
      description: descricaoFinal,
      url,
      siteName: SITE_CONFIG.nome,
      locale: 'pt_BR',
      type: tipo,
      ...(imagem && { images: imageObj }),
    },
    twitter: {
      card: 'summary_large_image',
      title: tituloCompleto,
      description: descricaoFinal,
      ...(imagem && { images: [imagem.startsWith('http') ? imagem : `https://marciofrancaadvocacia.com.br${imagem}`] }),
    },
    alternates: {
      canonical: url,
    },
  };
}

// Schema.org - LegalService + Attorney + LocalBusiness
export function gerarSchemaEscritorio() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney', 'LocalBusiness'],
    name: SITE_CONFIG.nome,
    description: SITE_CONFIG.descricao,
    url: 'https://marciofrancaadvocacia.com.br',
    telephone: SITE_CONFIG.telefone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.endereco,
      addressLocality: SITE_CONFIG.cidade,
      addressRegion: SITE_CONFIG.estado,
      addressCountry: SITE_CONFIG.pais,
      postalCode: '69905-076',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: 'Rio Branco',
      containedInPlace: { '@type': 'State', name: 'Acre' },
    },
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.nomeAdvogado,
      jobTitle: 'Advogado',
      identifier: SITE_CONFIG.oab,
    },
    sameAs: [
      SITE_CONFIG.instagram,
      SITE_CONFIG.facebook,
      SITE_CONFIG.linkedin,
      SITE_CONFIG.googleBusiness,
    ],
    knowsAbout: AREAS_ATUACAO.map((a) => a.titulo),
  };
}

// Schema.org - Article
export function gerarSchemaArtigo(artigo: {
  titulo: string;
  resumo: string;
  slug: string;
  criadoEm: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artigo.titulo,
    description: artigo.resumo,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.nomeAdvogado,
      identifier: SITE_CONFIG.oab,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.nome,
    },
    datePublished: artigo.criadoEm,
    url: `https://marciofrancaadvocacia.com.br/blog/${artigo.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://marciofrancaadvocacia.com.br/blog/${artigo.slug}`,
    },
  };
}

// Schema.org - FAQPage
export function gerarSchemaFAQ(faq: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.resposta,
      },
    })),
  };
}
