import { AREAS_ATUACAO, SITE_CONFIG } from '@/lib/data';
import { gerarMetadata, gerarSchemaFAQ } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import AreaContactForm from '@/components/AreaContactForm';
import styles from './page.module.css';

type Props = { params: Promise<{ area: string }> };

function obterAreaPorSlug(slug: string) {
  const clean = slug
    .replace('-rio-branco', '')
    .replace('-acre', '')
    .replace('-inss', '')
    .replace('-geap', '')
    .replace('planos-', 'plano-');
  return AREAS_ATUACAO.find((a) => {
    const aClean = a.slug
      .replace('/', '')
      .replace('-rio-branco', '')
      .replace('-acre', '')
      .replace('-inss', '')
      .replace('-geap', '')
      .replace('planos-', 'plano-');
    return a.slug === `/${slug}` || aClean === clean;
  });
}

export async function generateStaticParams() {
  const params: { area: string }[] = [];
  AREAS_ATUACAO.forEach((a) => {
    const slugSemBarra = a.slug.replace('/', '');
    params.push({ area: slugSemBarra });
    
    // Adicionar versões curtas alternativas
    if (slugSemBarra === 'bpc-loas-rio-branco') params.push({ area: 'bpc-loas' });
    if (slugSemBarra === 'aposentadoria-rural-acre') params.push({ area: 'aposentadoria-rural' });
    if (slugSemBarra === 'consignado-indevido-inss') params.push({ area: 'consignado-indevido' });
    if (slugSemBarra === 'energisa-acre') params.push({ area: 'energisa' });
    if (slugSemBarra === 'planos-de-saude') {
      params.push({ area: 'plano-de-saude-geap' });
      params.push({ area: 'plano-de-saude' });
    }
  });
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { area: areaSlug } = await params;
  const area = obterAreaPorSlug(areaSlug);
  if (!area) return {};
  return gerarMetadata({
    titulo: area.tituloLp,
    descricao: area.descricao,
    slug: areaSlug,
    palavrasChave: area.palavrasChave,
  });
}

export default async function AreaPage({ params }: Props) {
  const { area: areaSlug } = await params;
  const area = obterAreaPorSlug(areaSlug);
  if (!area) notFound();

  const whatsappMsg = encodeURIComponent(`Olá, gostaria de informações sobre ${area.titulo}.`);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMsg}`;
  const outrasAreas = AREAS_ATUACAO.filter((a) => a.id !== area.id).slice(0, 4);
  const isPrioritaria = ['bpc-loas', 'consignado-indevido', 'energisa'].includes(area.id);
  const schemaFAQ = gerarSchemaFAQ(area.conteudoLp.faq);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{area.titulo}</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroIcone}><Icon name={area.icone} size={48} /></div>
          <div className="section-badge" style={{ background: 'rgba(201,168,76,0.12)', color: '#ddc170', borderColor: 'rgba(201,168,76,0.25)' }}>Área de Atuação</div>
          <h1 className={styles.heroTitulo}>{area.tituloLp}</h1>
          <p className={styles.heroDesc}>{area.descricao}</p>
          <div className={styles.heroCtas}>
            <Link href="/triagem" className="btn btn-dourado btn-lg">Fazer diagnóstico rápido</Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-lg">Falar no WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.main}>
              <ScrollReveal delay={0}>
                <h2>Entenda sobre <span style={{ color: 'var(--dourado)' }}>{area.titulo}</span></h2>
                <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>{area.conteudoLp.explicacao}</p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div className={styles.infoBox}>
                  <h3>Quando procurar orientação jurídica?</h3>
                  <ul className={styles.listaCheck}>
                    {area.conteudoLp.quandoProcurar.map((item, i) => (
                      <li key={i}><span className={styles.checkIcon}><Icon name="Check" size={14} /></span>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <div className={styles.infoBox} style={{ marginTop: '1.5rem' }}>
                  <h3>Documentos que podem ser úteis</h3>
                  <ul className={styles.listaDoc}>
                    {area.conteudoLp.documentos.map((doc, i) => (
                      <li key={i}><span className={styles.docIcon}><Icon name="FileText" size={14} /></span>{doc}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {isPrioritaria && (
                <ScrollReveal delay={3}>
                  <AreaContactForm areaTitulo={area.titulo} areaSlug={area.id} />
                </ScrollReveal>
              )}

              <ScrollReveal delay={3}>
                <FAQ itens={area.conteudoLp.faq} titulo="Perguntas Frequentes" />
              </ScrollReveal>

              <ScrollReveal delay={4}>
                <div className="aviso-legal" style={{ marginTop: '2rem' }}>{SITE_CONFIG.avisoLegal}</div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <ScrollReveal direction="right" delay={1}>
                <div className={styles.sideCard}>
                  <h3>Fale com o advogado</h3>
                  <p>Análise inicial da sua situação. Cada caso depende de avaliação individualizada.</p>
                  <Link href="/triagem" className="btn btn-dourado" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>Diagnóstico rápido</Link>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>WhatsApp</a>
                  <div className={styles.sideInfo}>
                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <Icon name="MapPin" size={16} className="text-dourado" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                      <span>{SITE_CONFIG.endereco}</span>
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon name="Phone" size={16} className="text-dourado" style={{ flexShrink: 0 }} />
                      <span>{SITE_CONFIG.telefone}</span>
                    </p>
                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <Icon name="Clock" size={16} className="text-dourado" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                      <span>{SITE_CONFIG.horario}</span>
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={2}>
                <div className={styles.sideCard}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--grafite)' }}>Outras Áreas</h4>
                  {outrasAreas.map((a) => (
                    <Link key={a.id} href={a.slug} className={styles.sideAreaLink}>
                      <span><Icon name={a.icone} size={16} /></span>
                      <span>{a.titulo}</span>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaFinal}>
        <ScrollReveal className={`container ${styles.ctaInner}`}>
          <div>
            <h2>Precisa de orientação sobre <strong style={{ color: '#ddc170' }}>{area.titulo}</strong>?</h2>
            <p>Cada caso depende de análise individualizada. O primeiro passo é falar com um advogado.</p>
          </div>
          <Link href="/triagem" className="btn btn-dourado btn-lg">Fazer diagnóstico rápido →</Link>
        </ScrollReveal>
      </section>
    </>
  );
}
