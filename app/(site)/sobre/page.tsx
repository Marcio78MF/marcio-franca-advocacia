import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/data';
import { gerarMetadata } from '@/lib/seo';
import Icon from '@/components/Icon';
import styles from './sobre.module.css';

export const metadata = gerarMetadata({
  titulo: 'Sobre o Escritório',
  descricao: 'Conheça o Dr. Márcio França, advogado em Rio Branco/AC com OAB/AC 2882. Atuação técnica, estratégica e humanizada em Direito Previdenciário, Bancário, Família e Criminal.',
  slug: 'sobre',
});

export default function SobrePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá, gostaria de informações sobre atendimento jurídico.')}`;

  return (
    <>
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Sobre</span>
        </div>
      </div>

      {/* Hero Sobre */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <div className="section-badge" style={{ background: 'rgba(201,168,76,0.12)', color: '#ddc170', borderColor: 'rgba(201,168,76,0.25)' }}>
              Conheça o Advogado
            </div>
            <h1 className={styles.heroTitulo}>
              Dr. Márcio França<br />
              <span className={styles.heroSub}>OAB/AC 2882 · Rio Branco/AC</span>
            </h1>
            <p className={styles.heroDesc}>
              Advocacia comprometida com a defesa dos direitos dos cidadãos acreanos — com técnica, estratégia e comunicação clara.
            </p>
            <div className={styles.heroCtas}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                aria-label="Falar no WhatsApp com o Dr. Márcio França"
              >
                Falar no WhatsApp
              </a>
              <Link href="/triagem" className="btn btn-dourado btn-lg">
                Diagnóstico Rápido
              </Link>
            </div>
          </div>

          <div className={styles.heroFotoWrap}>
            <div className={styles.heroFotoContainer}>
              <Image
                src="/images/dr-marcio-hero.jpg"
                alt="Dr. Márcio França, advogado em Rio Branco Acre"
                fill
                className={styles.heroFoto}
                priority
                sizes="(max-width: 900px) 100vw, 440px"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Content */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.content}>
              <h2>Márcio França Advocacia</h2>
              <p>
                Dr. Márcio Junior dos Santos França é advogado inscrito na <strong>{SITE_CONFIG.oab}</strong>,
                com atuação em <strong>Rio Branco/AC</strong> em demandas previdenciárias, cíveis,
                bancárias, consumidor, família e criminal.
              </p>
              <p style={{ marginTop: '1rem' }}>
                O escritório trabalha com análise documental detalhada, estratégia processual
                individualizada e comunicação clara com o cliente — sempre de forma ética e
                comprometida com os valores da OAB.
              </p>

              <h2 style={{ marginTop: '2.5rem' }}>Como trabalhamos</h2>
              <ul className={styles.lista}>
                <li>
                  <span className={styles.check} aria-hidden="true"><Icon name="Check" size={14} /></span>
                  <div>
                    <strong>Análise documental detalhada</strong><br />
                    Cada caso começa com uma avaliação cuidadosa dos documentos e da situação apresentada.
                  </div>
                </li>
                <li>
                  <span className={styles.check} aria-hidden="true"><Icon name="Check" size={14} /></span>
                  <div>
                    <strong>Estratégia processual individualizada</strong><br />
                    A abordagem jurídica é definida de acordo com as particularidades de cada caso.
                  </div>
                </li>
                <li>
                  <span className={styles.check} aria-hidden="true"><Icon name="Check" size={14} /></span>
                  <div>
                    <strong>Comunicação clara e acessível</strong><br />
                    Mantemos o cliente informado sobre cada etapa do processo, em linguagem acessível.
                  </div>
                </li>
                <li>
                  <span className={styles.check} aria-hidden="true"><Icon name="Check" size={14} /></span>
                  <div>
                    <strong>Atendimento presencial e online</strong><br />
                    Atendemos em Rio Branco e também por videoconferência e WhatsApp, em todo o Acre.
                  </div>
                </li>
              </ul>

              <div className="aviso-legal" style={{ marginTop: '2.5rem' }}>{SITE_CONFIG.avisoLegal}</div>
            </div>

            {/* Sidebar com foto secundária */}
            <aside className={styles.sidebar}>
              <div className={styles.fotoSecundaria}>
                <Image
                  src="/images/dr-marcio-sobre.jpg"
                  alt="Dr. Márcio França Advocacia OAB AC 2882"
                  fill
                  className={styles.fotoSecundariaImg}
                  sizes="(max-width: 900px) 100vw, 340px"
                  unoptimized
                />
              </div>
              <div className={styles.sideCard}>
                <div className={styles.logoWrap}>
                  <Image
                    src="/images/logo-mf.jpg"
                    alt="Logo Márcio França Advocacia"
                    width={40}
                    height={40}
                    className={styles.logoImg}
                    unoptimized
                  />
                  <div>
                    <strong>{SITE_CONFIG.nomeAdvogado}</strong>
                    <span>{SITE_CONFIG.oab}</span>
                  </div>
                </div>
                <div className={styles.info} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Icon name="MapPin" size={16} className="text-dourado" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span>{SITE_CONFIG.endereco}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="Phone" size={16} className="text-dourado" style={{ flexShrink: 0 }} />
                    <span>{SITE_CONFIG.telefone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Icon name="Clock" size={16} className="text-dourado" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span>{SITE_CONFIG.horario}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="Mail" size={16} className="text-dourado" style={{ flexShrink: 0 }} />
                    <span>{SITE_CONFIG.email}</span>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                  aria-label="Falar no WhatsApp"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
