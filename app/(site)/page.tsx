import type { Metadata } from 'next';
import Image from 'next/image';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { SITE_CONFIG } from '@/lib/data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'BPC/LOAS em Rio Branco e no Acre',
  description:
    'Informações sobre BPC/LOAS para pessoas idosas e pessoas com deficiência em Rio Branco e no Acre. Requisitos, renda familiar, CadÚnico e análise de indeferimentos do INSS.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'BPC/LOAS em Rio Branco e no Acre | Márcio Jr. França Advocacia',
    description:
      'Informações sobre BPC/LOAS para pessoas idosas e pessoas com deficiência em Rio Branco e no Acre. Requisitos, renda familiar, CadÚnico e análise de indeferimentos do INSS.',
    url: 'https://bpc.marciofranca.adv.br/',
  },
};

const WHATSAPP_GERAL = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
  'Olá Dr. Márcio Jr., gostaria de informações sobre o BPC/LOAS'
)}`;

const WHATSAPP_NEGADO = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
  'Olá Dr. Márcio Jr., meu BPC foi negado/suspenso e quero análise'
)}`;

const REQUISITOS = [
  {
    titulo: 'Pessoa idosa (65 anos ou mais)',
    texto:
      'Exige-se idade mínima de 65 anos, renda familiar dentro do limite legal e inscrição regular no Cadastro Único. Não é necessário ter contribuído para o INSS.',
  },
  {
    titulo: 'Pessoa com deficiência',
    texto:
      'Deficiência de longo prazo — física, mental, intelectual ou sensorial — verificada em avaliação médica e social, somada ao requisito de renda familiar e ao CadÚnico atualizado.',
  },
];

const AVALIACAO_GERAL = [
  'Renda familiar dentro do limite legal previsto para o benefício.',
  'Inscrição atualizada no Cadastro Único (CadÚnico), com composição familiar correta.',
  'Nos pedidos por deficiência, avaliação biopsicossocial (médica e social) realizada pelo INSS/perícia.',
  'Documentos pessoais, comprovantes de residência e de composição do grupo familiar, conforme o caso.',
];

const MOTIVOS_NEGATIVA = [
  {
    titulo: 'Renda calculada com o Bolsa Família',
    texto:
      'Em alguns indeferimentos, o cálculo da renda familiar considerou valores de programa de transferência de renda. É um ponto que pode ser questionado administrativa ou judicialmente, a depender do fundamento usado pelo INSS.',
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
  {
    titulo: 'Benefício suspenso ou bloqueado',
    texto:
      'Um BPC já concedido pode ser suspenso ou bloqueado em revisão cadastral ou de renda. A situação pode ser regularizada administrativamente ou, quando necessário, discutida judicialmente.',
  },
];

const PASSOS = [
  {
    numero: '01',
    titulo: 'Análise da situação',
    texto:
      'Você envia a carta de concessão/indeferimento (quando houver), o CNIS e os documentos do CadÚnico. A leitura do caso concreto define o caminho adequado.',
  },
  {
    numero: '02',
    titulo: 'Requerimento, recurso ou ação judicial',
    texto:
      'Conforme o caso: requerimento inicial ao INSS, recurso administrativo ou ação na Justiça Federal, com acompanhamento no TRF1 quando houver recurso.',
  },
  {
    numero: '03',
    titulo: 'Acompanhamento do procedimento',
    texto:
      'Definida a estratégia adequada, o caso poderá ser acompanhado na via administrativa ou judicial, conforme as particularidades da demanda e o escopo da contratação. Havendo reconhecimento do direito, eventuais valores retroativos serão apurados conforme a decisão e a legislação aplicável.',
  },
];

const FAQ_ITENS = [
  {
    pergunta: 'Quem tem direito ao BPC/LOAS?',
    resposta:
      'Pessoas com 65 anos ou mais e pessoas com deficiência de longo prazo, em ambos os casos com renda familiar dentro do limite legal e inscrição regular no CadÚnico. O preenchimento dos requisitos é avaliado individualmente.',
  },
  {
    pergunta: 'O BPC é igual a uma aposentadoria?',
    resposta:
      'Não. O BPC/LOAS é um benefício assistencial, não previdenciário: não exige contribuição prévia ao INSS e segue regras próprias, diferentes das aposentadorias.',
  },
  {
    pergunta: 'O Bolsa Família entra no cálculo da renda do BPC/LOAS?',
    resposta:
      'O cálculo da renda familiar do BPC segue regras próprias, com rendimentos legalmente excluídos e outros considerados. Esse é justamente o ponto discutido em muitos indeferimentos, inclusive em decisões do TRF1. Cada caso depende da análise dos documentos e do fundamento adotado pelo INSS.',
  },
  {
    pergunta: 'Fui negado por renda. Ainda posso tentar?',
    resposta:
      'O indeferimento administrativo não encerra a discussão. É possível recorrer na esfera administrativa ou buscar a via judicial, observados os prazos. A análise do caso indica qual caminho é cabível.',
  },
  {
    pergunta: 'Ter um diagnóstico já garante o BPC por deficiência?',
    resposta:
      'Não. A avaliação considera o impedimento de longo prazo em conjunto com barreiras enfrentadas, participação social e situação socioeconômica. O diagnóstico isolado não define o resultado; a análise é sempre individual.',
  },
  {
    pergunta: 'Meu BPC foi suspenso ou bloqueado. O que fazer?',
    resposta:
      'Benefícios já concedidos podem ser suspensos ou bloqueados em revisões de renda ou de cadastro. É possível regularizar a situação administrativamente ou, quando necessário, discutir o caso judicialmente. Cada situação exige análise individual.',
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
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitulo}>
              BPC/LOAS em <span className={styles.heroDestaque}>Rio Branco e no Acre</span>
            </h1>

            <p className={styles.heroSub}>
              Informações sobre o Benefício de Prestação Continuada para pessoas idosas e pessoas
              com deficiência, incluindo requisitos, renda familiar, CadÚnico, avaliação
              biopsicossocial e análise de indeferimentos pelo INSS.
            </p>

            <p className={styles.heroNota}>
              Márcio Jr. França Advocacia — atuação na via administrativa e judicial no Acre, com
              acompanhamento no TRF1. OAB/AC 2.882.
            </p>

            <div className={styles.heroCtas}>
              <a href="#quero-direito" className="btn btn-dourado btn-lg">
                Quero entender se posso ter direito
              </a>
              <a href="#bpc-negado" className="btn btn-outline-white btn-lg">
                Meu BPC foi negado
              </a>
            </div>

            <p className={styles.heroWhatsLink}>
              Preferir falar direto?{' '}
              <a href={WHATSAPP_GERAL} target="_blank" rel="noopener noreferrer">
                Fale agora no WhatsApp
              </a>
            </p>

            <ul className={styles.badges}>
              <li>TJAC</li>
              <li>TRF1</li>
              <li>INSS</li>
              <li>OAB/AC 2.882</li>
            </ul>
          </div>

          <div className={styles.heroPortrait} aria-hidden="true">
            <Image
              src="/images/dr-marcio-jr-franca-hero-banner.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
              className={styles.heroPortraitImg}
            />
          </div>
        </div>
      </section>

      {/* QUEM PODE PLEITEAR — pessoa que ainda pretende requerer */}
      <section className={`section ${styles.secDireito}`} id="quero-direito">
        <div className="container">
          <div className="section-header">
            <h2>Quem pode pleitear o BPC/LOAS</h2>
            <p>Dois grupos podem requerer o benefício, cada um com requisitos próprios.</p>
          </div>
          <div className={styles.cards}>
            {REQUISITOS.map((r) => (
              <article key={r.titulo} className={styles.card}>
                <h3>{r.titulo}</h3>
                <p>{r.texto}</p>
              </article>
            ))}
          </div>

          <div className={styles.notaBox}>
            <h3>O que costuma ser avaliado</h3>
            <ul className={styles.listaChecagem}>
              {AVALIACAO_GERAL.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="aviso-legal">
              Cada requisito depende de análise individual, com base nos documentos e na situação
              concreta de cada família.
            </p>
          </div>
        </div>
      </section>

      {/* BPC NÃO É APOSENTADORIA */}
      <section className={`section section-alt ${styles.secNaoAposentadoria}`}>
        <div className="container">
          <div className={`${styles.card} ${styles.notaCentral}`}>
            <h2>BPC não é aposentadoria</h2>
            <p>
              O BPC/LOAS é um benefício assistencial, não previdenciário. Ele não exige
              contribuição prévia ao INSS, não é aposentadoria e possui regras próprias — que não
              se confundem automaticamente com as dos benefícios previdenciários.
            </p>
          </div>
        </div>
      </section>

      {/* BPC PARA PESSOA COM DEFICIÊNCIA */}
      <section className={`section ${styles.secDeficiencia}`}>
        <div className="container">
          <div className="section-header">
            <h2>BPC para pessoa com deficiência</h2>
          </div>
          <div className={styles.card}>
            <p>
              A análise não se limita ao diagnóstico. Ela considera o impedimento de longo prazo
              em conjunto com as barreiras enfrentadas, a participação social e a situação
              socioeconômica da pessoa e da família, a partir da avaliação biopsicossocial
              realizada pelo INSS.
            </p>
            <p>
              Um diagnóstico isolado não garante o benefício: o que se avalia são as repercussões
              concretas do impedimento na vida da pessoa, somadas ao requisito de renda familiar.
              Cada caso é analisado individualmente.
            </p>
          </div>
        </div>
      </section>

      {/* BPC NEGADO / SUSPENSO / BLOQUEADO */}
      <section className={`section section-alt ${styles.secDores}`} id="bpc-negado">
        <div className="container">
          <div className="section-header">
            <h2>Seu BPC foi negado, suspenso ou bloqueado?</h2>
            <p>Motivos frequentes analisados pelo escritório, e o que pode ser feito em cada um.</p>
          </div>
          <div className={styles.cards}>
            {MOTIVOS_NEGATIVA.map((d) => (
              <article key={d.titulo} className={styles.card}>
                <h3>{d.titulo}</h3>
                <p>{d.texto}</p>
              </article>
            ))}
          </div>
          <p className="aviso-legal">
            Indeferimentos, suspensões e bloqueios podem exigir análise administrativa ou judicial
            individualizada. Não há garantia de resultado em nenhuma via.
          </p>
          <div className={styles.heroCtas} style={{ marginTop: '1.25rem' }}>
            <a href={WHATSAPP_NEGADO} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Falar sobre meu caso no WhatsApp
            </a>
            <a href="#formulario" className="btn btn-outline">
              Enviar meu caso para análise
            </a>
          </div>
        </div>
      </section>

      {/* BOLSA FAMÍLIA E RENDA NO BPC */}
      <section className={`section ${styles.secBolsaFamilia}`}>
        <div className="container">
          <div className="section-header">
            <h2>Bolsa Família e renda no BPC</h2>
          </div>
          <div className={styles.card}>
            <p>
              O cálculo da renda familiar do BPC segue regras próprias, distintas de outras
              análises de renda. Existem rendimentos legalmente excluídos do cálculo e outros que
              são considerados, a depender da legislação vigente e do fundamento concreto utilizado
              pelo INSS na decisão.
            </p>
            <p>
              Situações envolvendo Bolsa Família em pedidos ou indeferimentos de BPC devem ser
              analisadas caso a caso, à luz da legislação aplicável no momento da decisão. Alguns
              indeferimentos fundamentados nesse ponto podem exigir análise administrativa ou
              judicial individualizada.
            </p>
            <p className="aviso-legal">
              Esta seção é informativa e não representa garantia de concessão ou de reversão de
              indeferimento em nenhum caso.
            </p>
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

      {/* FAQ */}
      <section className={`section ${styles.secFaq}`}>
        <div className="container">
          <div className="section-header">
            <h2>Perguntas frequentes</h2>
          </div>
          <FAQ itens={FAQ_ITENS} />
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className={`section section-alt ${styles.secForm}`} id="formulario">
        <div className="container">
          <div className="section-header">
            <h2>Envie seu caso para análise</h2>
            <p>
              Informe seu nome, WhatsApp e a sua situação. O contato segue pelo WhatsApp oficial do
              escritório.
            </p>
          </div>
          <LeadForm />
          <p className="aviso-legal">
            {SITE_CONFIG.avisoLegal} Não envie senhas, códigos de acesso ou documentos sensíveis no
            primeiro contato.
          </p>
        </div>
      </section>

    </>
  );
}
