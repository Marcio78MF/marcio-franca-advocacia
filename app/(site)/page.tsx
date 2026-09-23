import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MFLogo from '@/components/MFLogo';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { SITE_CONFIG } from '@/lib/data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'BPC/LOAS negado em Rio Branco? Bolsa Família e o cálculo da renda',
  description:
    'BPC/LOAS negado por renda em Rio Branco/AC? Márcio Jr. França, OAB/AC 2.882, atua na revisão de indeferimentos do INSS no Acre, nas esferas administrativa e judicial (TRF1).',
  alternates: { canonical: '/' },
};

const WHATSAPP_LP = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
  'Olá Dr. Márcio Jr., meu BPC foi negado por renda e quero análise'
)}`;

const DORES = [
  {
    titulo: 'Renda calculada com o Bolsa Família',
    texto:
      'O indeferimento aponta renda familiar acima do limite legal, mas o cálculo incluiu valores de programa de transferência de renda. É um ponto que pode ser questionado administrativa e judicialmente.',
  },
  {
    titulo: 'Perícia ou avaliação social ausente ou incompleta',
    texto:
      'Pedidos de pessoa com deficiência exigem avaliação médica e social. A falta de uma delas, ou a análise sem os documentos que você possui, pode comprometer o resultado.',
  },
  {
    titulo: 'Cadastro Único desatualizado',
    texto:
      'Divergências entre a composição familiar declarada no CadÚnico e a situação real são causa frequente de indeferimento. A correção do cadastro costuma ser o primeiro passo.',
  },
];

const PASSOS = [
  {
    numero: '01',
    titulo: 'Análise do indeferimento',
    texto:
      'Você envia a carta de concessão/indeferimento, o CNIS e os documentos do CadÚnico. A leitura do motivo da negativa define o caminho adequado.',
  },
  {
    numero: '02',
    titulo: 'Revisão administrativa ou ação judicial',
    texto:
      'Conforme o caso, recurso ao INSS ou ação na Justiça Federal, com acompanhamento no TRF1 quando houver recurso.',
  },
  {
    numero: '03',
    titulo: 'Acompanhamento até a decisão',
    texto:
      'Havendo reconhecimento do direito, os valores atrasados são apurados conforme a lei. No âmbito federal, requisições de pequeno valor observam o teto de 60 salários mínimos.',
  },
];

const FAQ_ITENS = [
  {
    pergunta: 'O Bolsa Família entra no cálculo da renda do BPC/LOAS?',
    resposta:
      'Esse é justamente o ponto discutido em muitos indeferimentos. A legislação prevê hipóteses de exclusão de determinados valores do cálculo da renda familiar, e há decisões judiciais, inclusive no âmbito do TRF1, examinando o tema. Cada caso depende da análise dos documentos e do fundamento adotado pelo INSS.',
  },
  {
    pergunta: 'Fui negado por renda. Ainda posso tentar?',
    resposta:
      'O indeferimento administrativo não encerra a discussão. É possível recorrer na esfera administrativa ou buscar a via judicial, observados os prazos. A análise do caso indica qual caminho é cabível.',
  },
  {
    pergunta: 'Quem tem direito ao BPC/LOAS?',
    resposta:
      'Pessoas com 65 anos ou mais e pessoas com deficiência de longo prazo, em ambos os casos com renda familiar dentro do limite legal e inscrição regular no CadÚnico. O preenchimento dos requisitos é avaliado individualmente.',
  },
  {
    pergunta: 'Preciso ir a Rio Branco para ser atendido?',
    resposta:
      'O atendimento presencial ocorre em Rio Branco/AC, mediante agendamento. Também há atendimento remoto, conforme a necessidade do caso e a disponibilidade de documentos.',
  },
  {
    pergunta: 'Quanto tempo leva o processo?',
    resposta:
      'Não há prazo definido. A duração varia conforme a via escolhida, a instrução do caso e a pauta do órgão julgador. Nenhuma estimativa pode ser apresentada como garantia.',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <MFLogo size={62} comNome claro />

            <h1 className={styles.heroTitulo}>
              BPC/LOAS negado em Rio Branco?{' '}
              <span className={styles.heroDestaque}>
                Bolsa Família não pode entrar no cálculo da renda
              </span>
            </h1>

            <p className={styles.heroSub}>
              Márcio Jr. França Advocacia — atuação na revisão de indeferimentos do INSS no Acre,
              nas esferas administrativa e judicial, com acompanhamento no TRF1. OAB/AC 2.882.
            </p>

            <p className={styles.heroNota}>
              A discussão envolve os critérios de renda do BPC/LOAS, as regras de exclusão de
              valores do cálculo, atualizações normativas recentes (Decreto nº 12.534/2025) e
              decisões do TRF1 sobre o tema.
            </p>

            <div className={styles.heroCtas}>
              <a
                href={WHATSAPP_LP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                Falar no WhatsApp
              </a>
              <a href="#formulario" className="btn btn-outline-white btn-lg">
                Enviar meu caso
              </a>
            </div>

            <ul className={styles.badges}>
              <li>TJAC</li>
              <li>TRF1</li>
              <li>INSS</li>
              <li>OAB/AC 2.882</li>
            </ul>
          </div>

          <div className={styles.heroFoto}>
            <Image
              src="/images/dr-marcio-hero.jpg"
              alt="Dr. Márcio Jr. França, advogado inscrito na OAB/AC sob o nº 2.882, em Rio Branco/AC"
              width={520}
              height={640}
              priority
              className={styles.heroFotoImg}
            />
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className={`section ${styles.secDores}`}>
        <div className="container">
          <div className="section-header">
            <h2>Por que o pedido costuma ser negado</h2>
            <p>Três motivos frequentes nos indeferimentos analisados pelo escritório.</p>
          </div>
          <div className={styles.cards}>
            {DORES.map((d) => (
              <article key={d.titulo} className={styles.card}>
                <h3>{d.titulo}</h3>
                <p>{d.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className={`section section-alt ${styles.secPassos}`}>
        <div className="container">
          <div className="section-header">
            <h2>Como funciona o atendimento</h2>
            <p>Três etapas, com explicação do que é possível em cada uma.</p>
          </div>
          <ol className={styles.passos}>
            {PASSOS.map((p) => (
              <li key={p.numero} className={styles.passo}>
                <span className={styles.passoNum}>{p.numero}</span>
                <div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="aviso-legal">
            Não há promessa de resultado nem de valores. Os atrasados, quando devidos, são apurados
            conforme a decisão e a legislação aplicável.
          </p>
        </div>
      </section>

      {/* QUEM TEM DIREITO */}
      <section className={`section ${styles.secDireito}`}>
        <div className="container">
          <div className="section-header">
            <h2>Quem pode pleitear o BPC/LOAS</h2>
          </div>
          <div className={styles.cards}>
            <article className={styles.card}>
              <h3>Pessoa idosa (65 anos ou mais)</h3>
              <p>
                Exige-se idade mínima de 65 anos, renda familiar dentro do limite legal e inscrição
                regular no Cadastro Único. Não é necessário ter contribuído para o INSS.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Pessoa com deficiência</h3>
              <p>
                Deficiência de longo prazo — física, mental, intelectual ou sensorial — verificada
                em avaliação médica e social, somada ao requisito de renda familiar e ao CadÚnico
                atualizado.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`section section-alt ${styles.secFaq}`}>
        <div className="container">
          <div className="section-header">
            <h2>Perguntas frequentes</h2>
          </div>
          <FAQ itens={FAQ_ITENS} />
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className={`section ${styles.secForm}`} id="formulario">
        <div className="container">
          <div className="section-header">
            <h2>Envie seu caso para análise</h2>
            <p>
              Informe seu nome, WhatsApp e o motivo da negativa. O contato segue pelo WhatsApp
              oficial do escritório.
            </p>
          </div>
          <LeadForm />
          <p className="aviso-legal">
            {SITE_CONFIG.avisoLegal} Não envie senhas, códigos de acesso ou documentos sensíveis no
            primeiro contato.
          </p>
        </div>
      </section>

      {/* RODAPÉ DA LP */}
      <section className={styles.rodapeLp}>
        <div className={`container ${styles.rodapeInner}`}>
          <MFLogo size={54} comNome claro />
          <div className={styles.rodapeDados}>
            <p>
              <strong>Márcio Jr. França</strong> · Advogado · OAB/AC 2.882
            </p>
            <p className={styles.rodapeLema}>Precedentes • Processo • Prática Forense</p>
            <p>Rio Branco/AC — Av. Epaminondas Jácome, nº 2172, Centro</p>
            <p>Segunda a sexta, 8h às 18h · Sábado, 9h às 14h</p>
            <p>
              <a href={`tel:${SITE_CONFIG.telefone}`}>{SITE_CONFIG.telefone}</a> ·{' '}
              <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            </p>
          </div>
          <p className={styles.rodapeDisclaimer}>
            Conteúdo de caráter meramente informativo, em conformidade com o Código de Ética e
            Disciplina da OAB e com o Provimento nº 205/2021 do Conselho Federal da OAB. Não
            constitui oferta de serviços, captação de clientela nem promessa de resultado. Cada
            situação exige análise individualizada.
          </p>
        </div>
      </section>
    </>
  );
}
