import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { gerarMetadata } from '@/lib/seo';
import styles from './blog.module.css';

export const metadata = {
  ...gerarMetadata({
    titulo: 'Central BPC/LOAS',
    descricao: 'Informações organizadas sobre BPC/LOAS: deficiência, autismo, pessoa idosa, renda familiar, CadÚnico, avaliação e indeferimentos.',
    slug: 'blog',
  }),
  robots: { index: false, follow: true },
};

const DESTAQUES = [
  { slug: 'bpc-loas-negado-o-que-fazer', titulo: 'Meu BPC foi negado', texto: 'Entenda por que o motivo do indeferimento deve ser identificado antes de definir o próximo passo.' },
  { slug: 'renda-familiar-bpc', titulo: 'Tenho dúvida sobre renda', texto: 'Veja como grupo familiar e rendimentos são analisados para o BPC.' },
  { slug: 'bpc-autismo-tea', titulo: 'BPC e autismo (TEA)', texto: 'Entenda por que o diagnóstico é importante, mas não representa concessão automática.' },
  { slug: 'cadunico-bpc', titulo: 'CadÚnico e BPC', texto: 'Confira a importância da atualização cadastral e sua relação com o benefício.' },
];

export default function BlogPage() {
  const postsPublicados = getPosts().filter(p => p.categoria.toLowerCase().includes('bpc'));

  return (
    <>
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Central BPC/LOAS</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Central BPC/LOAS</div>
            <h1>Entenda o BPC a partir da sua situação</h1>
            <p>Reunimos informações por problema: requisitos, renda, deficiência, CadÚnico, avaliação, negativa, suspensão e bloqueio. O objetivo é ajudar você a identificar o ponto que precisa ser analisado.</p>
          </div>

          <div className={styles.grid}>
            {DESTAQUES.map(item => (
              <Link href={`/blog/${item.slug}`} key={item.slug} className={styles.card}>
                <h2 className={styles.cardTitulo}>{item.titulo}</h2>
                <p className={styles.cardResumo}>{item.texto}</p>
                <span className={styles.cardLink}>Entender esta situação →</span>
              </Link>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2>Todos os conteúdos sobre BPC/LOAS</h2>
            <p>Escolha o assunto mais próximo da sua dúvida.</p>
          </div>

          <div className={styles.grid}>
            {postsPublicados.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className="badge badge-azul">{post.categoria}</span>
                  <span className={styles.data}>{new Date(post.criadoEm).toLocaleDateString('pt-BR')}</span>
                </div>
                <h2 className={styles.cardTitulo}>{post.titulo}</h2>
                <p className={styles.cardResumo}>{post.resumo}</p>
                <span className={styles.cardLink}>Ler orientação →</span>
              </Link>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2>Não encontrou sua situação?</h2>
            <p>Você pode informar o motivo da sua dúvida para uma análise individual do caso.</p>
            <Link href="/#formulario" className="btn btn-dourado">Entenda sua situação</Link>
          </div>
        </div>
      </section>
    </>
  );
}