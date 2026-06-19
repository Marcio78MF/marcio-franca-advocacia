import { getPosts, getPostBySlug } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/data';
import { gerarMetadata, gerarSchemaArtigo } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './post.module.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return gerarMetadata({ titulo: post.titulo, descricao: post.resumo, slug: `blog/${slug}`, tipo: 'article' });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const schema = gerarSchemaArtigo(post);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Olá, li o artigo "${post.titulo}" e gostaria de mais informações.`)}`;
  const outrosPosts = getPosts().filter(p => p.id !== post.id).slice(0, 3);

  // Simple markdown-like rendering
  const renderConteudo = (texto: string) => {
    const linhas = texto.split('\n');
    const elementos: React.ReactNode[] = [];
    let listaAtual: string[] = [];

    const flushLista = (key: number) => {
      if (listaAtual.length > 0) {
        elementos.push(
          <ul key={`list-${key}`} className={styles.ul}>
            {listaAtual.map((item, index) => (
              <li key={index} className={styles.li}>{item}</li>
            ))}
          </ul>
        );
        listaAtual = [];
      }
    };

    linhas.forEach((linha, i) => {
      const trimmed = linha.trim();
      if (trimmed.startsWith('- ')) {
        listaAtual.push(trimmed.replace('- ', ''));
      } else {
        flushLista(i);
        if (trimmed.startsWith('## ')) {
          elementos.push(<h2 key={i} className={styles.h2}>{trimmed.replace('## ', '')}</h2>);
        } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          elementos.push(<p key={i}><strong>{trimmed.replace(/\*\*/g, '')}</strong></p>);
        } else if (trimmed.startsWith('> ')) {
          elementos.push(<blockquote key={i} className={styles.blockquote}>{trimmed.replace('> ', '')}</blockquote>);
        } else if (trimmed.startsWith('---')) {
          elementos.push(<hr key={i} className={styles.hr} />);
        } else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
          elementos.push(<p key={i} className={styles.italic}>{trimmed.replace(/\*/g, '')}</p>);
        } else if (trimmed !== '') {
          const withBold = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          elementos.push(<p key={i} dangerouslySetInnerHTML={{ __html: withBold }} />);
        }
      }
    });

    flushLista(linhas.length);
    return elementos;
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/blog">Blog</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{post.titulo}</span>
        </div>
      </div>

      <article className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.main}>
              <div className={styles.meta}>
                <span className={`badge badge-azul`}>{post.categoria}</span>
                <span className={styles.data}>{new Date(post.criadoEm).toLocaleDateString('pt-BR')}</span>
              </div>
              <h1 className={styles.titulo}>{post.titulo}</h1>
              <p className={styles.resumo}>{post.resumo}</p>
              <div className={styles.conteudo}>{renderConteudo(post.conteudo)}</div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h3>Precisa de orientação?</h3>
                <p>Cada caso depende de análise individualizada.</p>
                <Link href="/triagem" className="btn btn-dourado" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>Diagnóstico rápido</Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>WhatsApp</a>
              </div>
              {outrosPosts.length > 0 && (
                <div className={styles.sideCard}>
                  <h4>Outros artigos</h4>
                  {outrosPosts.map(p => (
                    <Link key={p.id} href={`/blog/${p.slug}`} className={styles.outroLink}>{p.titulo}</Link>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
