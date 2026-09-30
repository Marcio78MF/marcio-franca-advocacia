import { gerarMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/data';
import Link from 'next/link';

export const metadata = {
  ...gerarMetadata({
    titulo: 'Advogado em Rio Branco/AC — Atendimento Presencial',
    descricao: 'Escritório de advocacia em Rio Branco, Acre. Atendimento presencial com Dr. Márcio Jr. França. Atendimento presencial para orientações relacionadas ao BPC/LOAS e análise individual da situação.',
    slug: 'atendimento/rio-branco',
    palavrasChave: ['advogado Rio Branco', 'escritório advocacia Rio Branco', 'advogado Acre', 'consulta presencial advogado'],
  }),
  robots: { index: false, follow: true },
};

export default function RioBrancoPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar um atendimento presencial em Rio Branco. [source=bpc-subdomain&area=bpc-loas]')}`;


  return (
    <>

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
            <p>Atendimento presencial em Rio Branco/AC, mediante contato prévio.</p>
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

              <h3 style={{ color: 'var(--azul-marinho)', marginBottom: '1rem', fontSize: '1.1rem' }}>BPC/LOAS</h3>
              <p style={{ color: 'var(--cinza-texto)', lineHeight: '1.7', marginBottom: '2rem' }}>
                O atendimento pode abranger requisitos do benefício, renda familiar, CadÚnico, avaliação da deficiência e análise de indeferimentos pelo INSS.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/#formulario" className="btn btn-dourado" style={{ width: '100%', justifyContent: 'center' }}>
                  Enviar situação para análise
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
