import { gerarMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/data';
import Link from 'next/link';

export const metadata = gerarMetadata({
  titulo: 'Advogado em Rio Branco/AC — Atendimento Presencial',
  descricao: 'Escritório de advocacia em Rio Branco, Acre. Atendimento presencial com Dr. Márcio França. Direito Previdenciário, Consumidor, Família e Criminal.',
  slug: 'atendimento/rio-branco',
  palavrasChave: ['advogado Rio Branco', 'escritório advocacia Rio Branco', 'advogado Acre', 'consulta presencial advogado'],
});

export default function RioBrancoPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar um atendimento presencial em Rio Branco. [source=site&area=rio-branco]')}`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://marciofrancaadvocacia.com.br/#escritorio',
    name: 'Advocacia Dr. Márcio França',
    description: 'Escritório de advocacia em Rio Branco/AC com atuação em Direito Previdenciário, Consumidor Bancário, Família e Criminal.',
    telephone: SITE_CONFIG.telefone,
    email: SITE_CONFIG.email,
    url: 'https://marciofrancaadvocacia.com.br/atendimento/rio-branco',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Epaminondas Jacome, nº 2172, bairro Cerâmica',
      addressLocality: 'Rio Branco',
      addressRegion: 'AC',
      postalCode: '69905-076',
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '12:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '14:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: 'Rio Branco',
      containedInPlace: { '@type': 'State', name: 'Acre' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/atendimento">Atendimento</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Rio Branco</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Presencial</div>
            <h1>Atendimento Presencial em Rio Branco/AC</h1>
            <p>Escritório localizado no centro de Rio Branco, com fácil acesso e estacionamento.</p>
          </div>

          <div style={{ maxWidth: '700px', margin: '3rem auto 0' }}>
            <div style={{ background: 'var(--branco)', border: '1.5px solid var(--borda)', borderRadius: 'var(--radius-xl)', padding: '2.5rem 2rem' }}>
              <h2 style={{ color: 'var(--azul-marinho)', marginBottom: '1.5rem', fontSize: '1.35rem' }}>Informações do Escritório</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <p style={{ color: 'var(--grafite)', margin: 0 }}>
                  <strong>Endereço:</strong> {SITE_CONFIG.endereco}
                </p>
                <p style={{ color: 'var(--grafite)', margin: 0 }}>
                  <strong>Telefone:</strong> {SITE_CONFIG.telefone}
                </p>
                <p style={{ color: 'var(--grafite)', margin: 0 }}>
                  <strong>E-mail:</strong> {SITE_CONFIG.email}
                </p>
                <p style={{ color: 'var(--grafite)', margin: 0 }}>
                  <strong>Horário:</strong> {SITE_CONFIG.horario}
                </p>
              </div>

              <h3 style={{ color: 'var(--azul-marinho)', marginBottom: '1rem', fontSize: '1.1rem' }}>Áreas de Atuação</h3>
              <ul style={{ color: 'var(--cinza-texto)', lineHeight: '2', paddingLeft: '1.25rem', marginBottom: '2rem' }}>
                <li>Direito Previdenciário (BPC/LOAS, Aposentadoria Rural)</li>
                <li>Direito do Consumidor (Consignado Indevido, Energisa)</li>
                <li>Planos de Saúde</li>
                <li>Direito de Família</li>
                <li>Direito Criminal</li>
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/triagem" className="btn btn-dourado" style={{ width: '100%', justifyContent: 'center' }}>
                  Fazer diagnóstico rápido
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
                  Agendar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
