import { gerarMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/data';
import Link from 'next/link';
import NewsletterCapture from '@/components/NewsletterCapture';

export const metadata = gerarMetadata({
  titulo: 'Atendimento Jurídico Online — Todo o Brasil',
  descricao: 'Consulta jurídica online com Dr. Márcio França. Atendimento por videochamada e WhatsApp para todo o Brasil. Direito Previdenciário, Consumidor e mais.',
  slug: 'atendimento/online',
  palavrasChave: ['advogado online', 'consulta jurídica online', 'advogado por videochamada', 'atendimento jurídico digital'],
});

export default function OnlinePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar um atendimento online. [source=site&area=online]')}`;

  return (
    <>
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/atendimento">Atendimento</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Online</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Digital</div>
            <h1>Atendimento Jurídico Online</h1>
            <p>Consulta com advogado de qualquer lugar do Brasil, sem precisar sair de casa.</p>
          </div>

          <div style={{ maxWidth: '700px', margin: '3rem auto 0' }}>
            <div style={{ background: 'var(--branco)', border: '1.5px solid var(--borda)', borderRadius: 'var(--radius-xl)', padding: '2.5rem 2rem' }}>
              <h2 style={{ color: 'var(--azul-marinho)', marginBottom: '1.5rem', fontSize: '1.35rem' }}>Como Funciona</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ color: 'var(--dourado)', fontSize: '1rem', marginBottom: '0.25rem' }}>1. Primeiro Contato</h3>
                  <p style={{ color: 'var(--cinza-texto)', margin: 0, fontSize: '0.92rem' }}>Entre em contato pelo WhatsApp ou faça o diagnóstico rápido no site. Descreva brevemente sua situação.</p>
                </div>
                <div>
                  <h3 style={{ color: 'var(--dourado)', fontSize: '1rem', marginBottom: '0.25rem' }}>2. Análise Inicial</h3>
                  <p style={{ color: 'var(--cinza-texto)', margin: 0, fontSize: '0.92rem' }}>O advogado avalia seu caso e orienta sobre os documentos necessários e próximos passos.</p>
                </div>
                <div>
                  <h3 style={{ color: 'var(--dourado)', fontSize: '1rem', marginBottom: '0.25rem' }}>3. Consulta por Videochamada</h3>
                  <p style={{ color: 'var(--cinza-texto)', margin: 0, fontSize: '0.92rem' }}>Reunião por Google Meet ou plataforma de sua preferência, com a mesma qualidade do atendimento presencial.</p>
                </div>
              </div>

              <div style={{ background: 'var(--branco-off)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '2rem' }}>
                <p style={{ color: 'var(--grafite)', margin: 0, fontSize: '0.88rem' }}>
                  <strong>Horário:</strong> {SITE_CONFIG.horario}
                </p>
                <p style={{ color: 'var(--grafite)', margin: '0.5rem 0 0', fontSize: '0.88rem' }}>
                  <strong>Canais:</strong> WhatsApp, Google Meet, Videochamada
                </p>
              </div>

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

      <NewsletterCapture />
    </>
  );
}
