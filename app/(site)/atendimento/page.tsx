import { gerarMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/data';
import Link from 'next/link';

export const metadata = {
  ...gerarMetadata({
    titulo: 'Atendimento Jurídico',
    descricao: 'Atendimento presencial em Rio Branco/AC e online para orientações relacionadas ao BPC/LOAS.',
    slug: 'atendimento',
    palavrasChave: ['atendimento BPC Rio Branco', 'BPC LOAS Acre', 'atendimento BPC online'],
  }),
  robots: { index: false, follow: true },
};

export default function AtendimentoPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar um atendimento. [source=bpc-subdomain&area=bpc-loas]')}`;

  return (
    <>
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Atendimento</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Atendimento</div>
            <h1>Atendimento BPC/LOAS</h1>
            <p>Escolha entre atendimento presencial em Rio Branco/AC ou contato online.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'var(--branco)', border: '1.5px solid var(--borda)', borderRadius: 'var(--radius-xl)', padding: '2.5rem 2rem', textAlign: 'center' }}>
              <h2 style={{ color: 'var(--azul-marinho)', marginBottom: '1rem' }}>Presencial</h2>
              <p style={{ color: 'var(--cinza-texto)', marginBottom: '0.5rem' }}>Atendimento no escritório em Rio Branco/AC</p>
              <p style={{ color: 'var(--cinza-texto)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>{SITE_CONFIG.endereco}</p>
              <p style={{ color: 'var(--cinza-texto)', fontSize: '0.85rem', marginBottom: '2rem' }}>{SITE_CONFIG.horario}</p>
              <Link href="/atendimento/rio-branco" className="btn btn-dourado" style={{ width: '100%', justifyContent: 'center' }}>
                Saiba mais
              </Link>
            </div>

            <div style={{ background: 'var(--branco)', border: '1.5px solid var(--borda)', borderRadius: 'var(--radius-xl)', padding: '2.5rem 2rem', textAlign: 'center' }}>
              <h2 style={{ color: 'var(--azul-marinho)', marginBottom: '1rem' }}>Online</h2>
              <p style={{ color: 'var(--cinza-texto)', marginBottom: '0.5rem' }}>Atendimento digital para todo o Brasil</p>
              <p style={{ color: 'var(--cinza-texto)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Videochamada, WhatsApp ou e-mail</p>
              <p style={{ color: 'var(--cinza-texto)', fontSize: '0.85rem', marginBottom: '2rem' }}>{SITE_CONFIG.horario}</p>
              <Link href="/atendimento/online" className="btn btn-dourado" style={{ width: '100%', justifyContent: 'center' }}>
                Saiba mais
              </Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
