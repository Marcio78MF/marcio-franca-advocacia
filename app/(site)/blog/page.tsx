import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { gerarMetadata } from '@/lib/seo';
import NewsletterCapture from '@/components/NewsletterCapture';
import styles from './blog.module.css';

export const metadata = gerarMetadata({
  titulo: 'Blog Jurídico',
  descricao: 'Artigos informativos sobre direito previdenciário, consumidor, família e criminal. Conteúdo jurídico acessível para cidadãos em Rio Branco/AC.',
  slug: 'blog',
});

export default function BlogPage() {
  const postsPublicados = getPosts();
  const categorias = [...new Set(postsPublicados.map(p => p.categoria))];

  return (
    <>
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Blog Jurídico</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Blog Jurídico</div>
            <h1>Informação jurídica acessível</h1>
            <p>Artigos informativos sobre temas relevantes. Cada situação depende de análise individualizada.</p>
          </div>

          <div className={styles.categorias}>
            {categorias.map(cat => (
              <span key={cat} className={`badge badge-azul ${styles.catBadge}`}>{cat}</span>
            ))}
          </div>

          <div className={styles.grid}>
            {postsPublicados.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={`badge badge-azul`}>{post.categoria}</span>
                  <span className={styles.data}>{new Date(post.criadoEm).toLocaleDateString('pt-BR')}</span>
                </div>
                <h2 className={styles.cardTitulo}>{post.titulo}</h2>
                <p className={styles.cardResumo}>{post.resumo}</p>
                <span className={styles.cardLink}>Ler artigo →</span>
              </Link>
            ))}
          </div>

          <NewsletterCapture />
        </div>
      </section>
    </>
  );
}
