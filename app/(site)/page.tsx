import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, AREAS_ATUACAO } from '@/lib/data';
import { getPosts } from '@/lib/blog';
import { FadeUp, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/Motion';
import Icon from '@/components/Icon';
import BlocoAutoridade from '@/components/BlocoAutoridade';
import CasosProcurados from '@/components/CasosProcurados';
import BlocoUrgencia from '@/components/BlocoUrgencia';
import ComoFunciona from '@/components/ComoFunciona';
import PorQueEscolher from '@/components/PorQueEscolher';
import Avaliacoes from '@/components/Avaliacoes';
import NewsletterCapture from '@/components/NewsletterCapture';
import styles from './page.module.css';

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá Dr. Márcio! Vim pelo site e gostaria de orientação sobre meu caso.')}`;
  const postsRecentes = getPosts().slice(0, 3);
  const whatsappIconPath = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero} aria-label="Seção principal">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          {/* Left: Content */}
          <FadeUp className={styles.heroContent}>
            <div className={`section-badge ${styles.heroBadge}`}>Advocacia em Rio Branco/AC</div>
            <h1 className={styles.heroTitulo}>
              Seus direitos <span className={styles.heroDestaque}>foram negados?</span>
            </h1>
            <p className={styles.heroSub}>
              Benefícios do INSS, descontos bancários indevidos, problemas com a Energisa, Direito de Família e Defesa Criminal. Atendimento presencial em Rio Branco/AC e atuação digital em todo o Brasil.
            </p>
            <div className={styles.heroCtas}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-whatsapp btn-lg ${styles.ctaBtn}`}
                aria-label="Falar no WhatsApp com o Dr. Márcio França"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={whatsappIconPath} />
                </svg>
                Falar no WhatsApp
              </a>
              <Link href="/triagem" className={`btn btn-dourado btn-lg ${styles.ctaBtn}`}>
                Diagnóstico Jurídico →
              </Link>
            </div>

            {/* Prova Social integrada no Hero */}
            <div className={styles.heroReviewSummary}>
              <div className={styles.heroStars} aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={14} className={styles.heroStarIcon} />
                ))}
              </div>
              <div className={styles.heroReviewText}>
                <strong>4,5/5 no Google</strong> · 8 avaliações verificadas
              </div>
              <a
                href={SITE_CONFIG.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroReviewLink}
              >
                Ler avaliações
                <Icon name="ExternalLink" size={12} />
              </a>
            </div>

            <div className={styles.heroCredenciais}>
              <span className={styles.credencial}>
                <span className={styles.credencialIcon}><Icon name="Check" size={14} /></span>
                {SITE_CONFIG.oab}
              </span>
              <span className={styles.credencial}>
                <span className={styles.credencialIcon}><Icon name="Check" size={14} /></span>
                Atendimento presencial e online
              </span>
              <span className={styles.credencial}>
                <span className={styles.credencialIcon}><Icon name="Check" size={14} /></span>
                Análise documental individualizada
              </span>
            </div>
          </FadeUp>

          {/* Right: Photo */}
          <FadeUp className={styles.heroFotoWrap} delay={0.15}>
            <div className={styles.heroBadgeFloat}>
              Atendimento técnico e humanizado
            </div>
            <div className={styles.heroFotoContainer}>
              <Image
                src="/images/dr-marcio-hero.jpg"
                alt="Dr. Márcio França, advogado em Rio Branco Acre"
                fill
                className={styles.heroFoto}
                priority
                sizes="(max-width: 900px) 100vw, 420px"
                unoptimized
              />
            </div>
            <div className={styles.heroFotoCard} aria-label="Identificação do advogado">
              <Image
                src="/images/logo-mf.jpg"
                alt="Logo Márcio França Advocacia"
                width={36}
                height={36}
                className={styles.heroFotoCardLogo}
                unoptimized
              />
              <div>
                <strong>Dr. Márcio França</strong>
                <span>Advogado · {SITE_CONFIG.oab} · Rio Branco/AC</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== BLOCO DE AUTORIDADE ===== */}
      <BlocoAutoridade />

      {/* ===== CASOS MAIS PROCURADOS & OUTRAS ÁREAS ===== */}
      <CasosProcurados />

      {/* ===== BLOCO DE URGÊNCIA ===== */}
      <BlocoUrgencia />

      {/* ===== COMO FUNCIONA O ATENDIMENTO ===== */}
      <ComoFunciona />

      {/* ===== POR QUE ESCOLHER ===== */}
      <PorQueEscolher />

      {/* ===== AVALIAÇÕES ===== */}
      <Avaliacoes />

      {/* ===== NEWSLETTER ===== */}
      <NewsletterCapture />

      {/* ===== SOBRE: DR. MÁRCIO FRANÇA ===== */}
      <section className="section-alt" id="sobre" aria-labelledby="sobre-titulo">
        <div className="container">
          <div className={styles.sobreGrid}>
            <ScrollReveal className={styles.sobreFotoWrap}>
              <div className={styles.sobreFotoContainer}>
                <Image
                  src="/images/dr-marcio-sobre.jpg"
                  alt="Dr. Márcio França Advocacia OAB AC 2882"
                  fill
                  className={styles.sobreFoto}
                  sizes="(max-width: 900px) 100vw, 420px"
                  unoptimized
                />
              </div>
            </ScrollReveal>

            <ScrollReveal className={styles.sobreContent}>
              <div className="section-badge">Conheça o Escritório</div>
              <h2 id="sobre-titulo">Dr. Márcio França — Advocacia em Rio Branco/AC</h2>
              <p>
                Dr. Márcio Junior dos Santos França é advogado inscrito na {SITE_CONFIG.oab}, com atuação em Rio Branco/AC em demandas previdenciárias, cíveis, bancárias, consumidor, família e criminal.
              </p>
              <p style={{ marginTop: '1rem' }}>
                O escritório trabalha com análise documental detalhada, estratégia processual individualizada e comunicação clara com o cliente.
              </p>
              <ul className={styles.sobreLista}>
                <li>
                  <span className={styles.sobreCheck} aria-hidden="true">
                    <Icon name="Check" size={14} />
                  </span>
                  Atendimento presencial e online
                </li>
                <li>
                  <span className={styles.sobreCheck} aria-hidden="true">
                    <Icon name="Check" size={14} />
                  </span>
                  Atuação em Rio Branco/AC e demais localidades do Acre
                </li>
                <li>
                  <span className={styles.sobreCheck} aria-hidden="true">
                    <Icon name="Check" size={14} />
                  </span>
                  Análise individualizada de cada caso
                </li>
                <li>
                  <span className={styles.sobreCheck} aria-hidden="true">
                    <Icon name="Check" size={14} />
                  </span>
                  Comunicação objetiva e acessível
                </li>
              </ul>
              <Link href="/sobre" className="btn btn-outline">Conheça o escritório →</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== DIAGNÓSTICO CTA ===== */}
      <section className={styles.ctaDiagnostico} aria-labelledby="diagnostico-titulo">
        <div className={styles.ctaDiagnosticoBg} aria-hidden="true" />
        <div className={`container ${styles.ctaDiagnosticoInner}`}>
          <ScrollReveal className={styles.ctaDiagnosticoContent}>
            <div className={styles.ctaDiagnosticoIcone} aria-hidden="true">
              <Icon name="Search" size={40} className="text-dourado" />
            </div>
            <h2 id="diagnostico-titulo">Diagnóstico Jurídico Rápido</h2>
            <p>
              Responda algumas perguntas e envie um resumo inicial do seu caso diretamente pelo WhatsApp. Cada caso depende de análise documental individualizada.
            </p>
            <Link href="/triagem" className={`btn btn-dourado btn-lg ${styles.ctaDiagnosticoBtn}`}>
              Iniciar diagnóstico →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="section" aria-labelledby="blog-titulo">
        <div className="container">
          <ScrollReveal className="section-header">
            <div className="section-badge">Blog Jurídico</div>
            <h2 id="blog-titulo">Informação jurídica acessível</h2>
            <p>Artigos informativos sobre temas relevantes. Conteúdo meramente informativo — não substitui consulta jurídica individualizada.</p>
          </ScrollReveal>
          
          <StaggerContainer className={styles.blogGrid}>
            {postsRecentes.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/blog/${post.slug}`} className={styles.blogCard}>
                  <span className={`badge badge-azul ${styles.blogBadge}`}>{post.categoria}</span>
                  <h3 className={styles.blogTitulo}>{post.titulo}</h3>
                  <p className={styles.blogResumo}>{post.resumo}</p>
                  <span className={styles.blogLink}>
                    Ler artigo <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/blog" className="btn btn-outline">Ver todos os artigos →</Link>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className={styles.ctaFinal} aria-labelledby="cta-final-titulo">
        <ScrollReveal className={`container ${styles.ctaFinalInner}`}>
          <div>
            <h2 id="cta-final-titulo">Precisa de orientação jurídica?</h2>
            <p>O primeiro passo é falar com um advogado. Cada caso depende de análise individualizada.</p>
          </div>
          <div className={styles.ctaFinalBtns}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg" aria-label="Falar no WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={whatsappIconPath} />
              </svg>
              Falar no WhatsApp
            </a>
            <Link href="/triagem" className="btn btn-dourado btn-lg">Diagnóstico rápido</Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
