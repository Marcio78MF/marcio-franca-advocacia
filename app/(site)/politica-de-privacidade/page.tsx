import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/data';
import { gerarMetadata } from '@/lib/seo';

export const metadata = {
  ...gerarMetadata({
    titulo: 'Política de Privacidade',
    descricao: 'Política de privacidade do escritório Márcio Jr. França Advocacia. Entenda como lidamos com a proteção de dados em conformidade com a LGPD.',
    slug: 'politica-de-privacidade',
  }),
  robots: { index: false, follow: true },
};

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
            <p style={{ marginTop: '0.5rem' }}>Última atualização: Setembro de 2026</p>
          </div>

          <div style={{ color: 'var(--cinza-texto)', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
            <p>
              O <strong>{SITE_CONFIG.nome}</strong> trata dados pessoais de forma compatível com a
              Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD). Esta política descreve,
              de forma resumida, quais dados são coletados neste subdomínio de BPC/LOAS e para
              quais finalidades são utilizados.
            </p>

            <h2>1. Dados coletados</h2>
            <p>
              No formulário de contato BPC/LOAS, solicitamos apenas os dados necessários para o
              primeiro atendimento:
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
              <li><strong>Nome;</strong></li>
              <li><strong>Número de WhatsApp/telefone;</strong></li>
              <li><strong>Situação selecionada</strong> no formulário sobre o BPC/LOAS.</li>
            </ul>
            <p>
              Não solicitamos, no primeiro contato, senhas, códigos de acesso ou documentos
              sensíveis. Informações adicionais somente devem ser fornecidas quando necessárias
              para a análise jurídica do caso.
            </p>

            <h2>2. Finalidades do tratamento</h2>
            <p>Os dados informados são utilizados para:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
              <li>Registrar e organizar o pedido de contato;</li>
              <li>Permitir retorno pelo escritório e continuidade do atendimento;</li>
              <li>Realizar procedimentos preliminares relacionados a eventual contratação de serviços jurídicos;</li>
              <li>Manter controle interno dos contatos recebidos.</li>
            </ul>

            <h2>3. Armazenamento e prestadores de tecnologia</h2>
            <p>
              Os contatos enviados pelo formulário são armazenados em infraestrutura de nuvem
              utilizada pelo escritório e acessados por painel administrativo protegido. Serviços
              técnicos de hospedagem, banco de dados e autenticação podem processar dados na medida
              necessária para fornecer essas funcionalidades, observadas as respectivas medidas de
              segurança e políticas aplicáveis.
            </p>
            <p>
              Os dados não são comercializados nem compartilhados com terceiros para publicidade.
            </p>

            <h2>4. Cookies e Google Analytics</h2>
            <p>
              O Google Analytics 4 é utilizado somente após a aceitação dos cookies opcionais de
              análise. Se a opção “Recusar” for escolhida, o código do Analytics não é carregado
              nesta navegação. O site também utiliza recursos estritamente necessários ao
              funcionamento da página e do painel administrativo.
            </p>

            <h2>5. Prazo de conservação</h2>
            <p>
              Os dados são mantidos pelo período necessário para responder ao contato, organizar o
              histórico de atendimento, cumprir obrigações legais ou resguardar direitos. Quando
              não houver mais finalidade legítima para a conservação, poderão ser eliminados ou
              anonimizados, conforme aplicável.
            </p>

            <h2>6. Direitos do titular</h2>
            <p>
              O titular pode solicitar, nos termos da LGPD, confirmação da existência de
              tratamento, acesso, correção e, quando cabível, eliminação, informação sobre
              compartilhamentos e demais direitos previstos em lei.
            </p>

            <h2>7. Canal de privacidade</h2>
            <p>
              Solicitações relacionadas a dados pessoais podem ser encaminhadas para{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: 'var(--dourado)', fontWeight: 'bold' }}>
                {SITE_CONFIG.email}
              </a>.
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
