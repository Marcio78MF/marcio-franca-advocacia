import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/data';
import { gerarMetadata } from '@/lib/seo';

export const metadata = gerarMetadata({
  titulo: 'Política de Privacidade',
  descricao: 'Política de privacidade do escritório Márcio França Advocacia. Entenda como lidamos com a proteção de dados em conformidade com a LGPD.',
  slug: 'politica-de-privacidade',
});

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Política de Privacidade</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
            <div className="section-badge" style={{ marginBottom: '1rem' }}>LGPD</div>
            <h1>Política de Privacidade</h1>
            <p style={{ marginTop: '0.5rem' }}>Última atualização: Junho de 2026</p>
          </div>

          <div style={{ color: 'var(--cinza-texto)', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
            <p>
              No escritório <strong>{SITE_CONFIG.nome}</strong>, valorizamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD). Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao utilizar nosso site institucional e serviços online.
            </p>

            <h2>1. Coleta de Informações</h2>
            <p>
              Nós podemos coletar dados pessoais fornecidos voluntariamente por você ao preencher nossos formulários, como o Diagnóstico Rápido (Triagem) e capturas de contato:
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
              <li><strong>Dados de Identificação:</strong> Nome completo.</li>
              <li><strong>Dados de Contato:</strong> Número do WhatsApp, número de telefone e e-mail.</li>
              <li><strong>Informações do Caso:</strong> Respostas a perguntas de triagem e resumos de situações jurídicas que você escolher nos enviar.</li>
            </ul>

            <h2>2. Finalidade do Tratamento de Dados</h2>
            <p>
              Os dados coletados destinam-se exclusivamente às seguintes finalidades:
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
              <li>Realizar a triagem inicial do seu caso e avaliar a viabilidade de atendimento jurídico.</li>
              <li>Entrar em contato para agendamentos ou esclarecimento de dúvidas jurídicas.</li>
              <li>Enviar boletins informativos e atualizações sobre direitos (caso cadastrado em nossa newsletter).</li>
            </ul>

            <h2>3. Armazenamento e Compartilhamento de Dados</h2>
            <p>
              Adotamos medidas técnicas e administrativas aptas a proteger os seus dados pessoais contra acessos não autorizados. Seus dados são confidenciais e:
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
              <li><strong>Não</strong> são comercializados ou compartilhados com terceiros para fins publicitários.</li>
              <li>Serão arquivados e armazenados apenas pelo período necessário para cumprir as finalidades descritas nesta política ou para atender a obrigações legais.</li>
            </ul>

            <h2>4. Direitos do Titular</h2>
            <p>
              Você, como titular dos dados, tem o direito de solicitar a qualquer momento a confirmação da existência do tratamento, acesso aos dados coletados, correção de dados incompletos ou desatualizados, bem como a eliminação ou portabilidade dos seus dados.
            </p>

            <h2>5. Uso de Cookies</h2>
            <p>
              Utilizamos cookies no nosso site para melhorar sua experiência de navegação e analisar o tráfego do site. Você pode gerenciar ou recusar os cookies através da barra de consentimento exibida ao acessar o site.
            </p>

            <h2>6. Contato do Encarregado de Proteção de Dados (DPO)</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre como lidamos com seus dados pessoais, entre em contato conosco através do e-mail: <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: 'var(--dourado)', fontWeight: 'bold' }}>{SITE_CONFIG.email}</a>.
            </p>

            <div className="aviso-legal" style={{ marginTop: '2rem' }}>
              {SITE_CONFIG.avisoLegal}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
