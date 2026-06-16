'use client';
import { useState } from 'react';
import { POSTS_MOCK } from '@/lib/data';
import styles from './posts.module.css';

type Post = typeof POSTS_MOCK[0];

type ModoView = 'lista' | 'editor';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([...POSTS_MOCK]);
  const [modo, setModo] = useState<ModoView>('lista');
  const [postEditando, setPostEditando] = useState<Post | null>(null);
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState('Previdenciário');
  const [publicado, setPublicado] = useState(false);
  const [busca, setBusca] = useState('');

  const categorias = ['Previdenciário', 'BPC/LOAS', 'Consumidor', 'Fundiário', 'Ambiental', 'Servidor Público'];

  function novoPost() {
    setPostEditando(null);
    setTitulo('');
    setResumo('');
    setConteudo('');
    setCategoria('Previdenciário');
    setPublicado(false);
    setModo('editor');
  }

  function editarPost(post: Post) {
    setPostEditando(post);
    setTitulo(post.titulo);
    setResumo(post.resumo);
    setConteudo(post.conteudo);
    setCategoria(post.categoria);
    setPublicado(post.publicado);
    setModo('editor');
  }

  function salvarPost() {
    const slug = titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    if (postEditando) {
      setPosts(posts.map(p => p.id === postEditando.id ? { ...p, titulo, resumo, conteudo, categoria, publicado, slug } : p));
    } else {
      const novoId = String(Date.now());
      setPosts([...posts, { id: novoId, titulo, slug, resumo, categoria, publicado, criadoEm: new Date().toISOString().split('T')[0], conteudo }]);
    }
    setModo('lista');
    setPostEditando(null);
  }

  function excluirPost(id: string) {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  }

  function togglePublicado(id: string) {
    setPosts(posts.map(p => p.id === id ? { ...p, publicado: !p.publicado } : p));
  }

  const postsFiltrados = posts.filter(p =>
    p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  if (modo === 'editor') {
    return (
      <div className={styles.editor}>
        <div className={styles.editorHeader}>
          <button className={styles.voltarBtn} onClick={() => setModo('lista')}>← Voltar</button>
          <h2>{postEditando ? 'Editar Artigo' : 'Novo Artigo'}</h2>
          <div className={styles.editorAcoes}>
            <label className={styles.publishToggle}>
              <input type="checkbox" checked={publicado} onChange={e => setPublicado(e.target.checked)} />
              <span>{publicado ? 'Publicado' : 'Rascunho'}</span>
            </label>
            <button className="btn btn-primary" onClick={salvarPost}>Salvar Artigo</button>
          </div>
        </div>
        <div className={styles.editorBody}>
          <div className="form-group">
            <label className="form-label">Título do Artigo</label>
            <input type="text" className="form-input" placeholder="Ex: Como pedir o BPC/LOAS em Rio Branco?" value={titulo} onChange={e => setTitulo(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Categoria</label>
            <select className="form-input" value={categoria} onChange={e => setCategoria(e.target.value)}>
              {categorias.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Resumo (Meta Description SEO)</label>
            <textarea className={`form-input ${styles.textarea}`} placeholder="Resumo do artigo para aparecer nos resultados do Google..." value={resumo} onChange={e => setResumo(e.target.value)} rows={3} />
            <small style={{ color: '#8fa898', fontSize: '0.78rem' }}>{resumo.length}/160 caracteres recomendados</small>
          </div>
          <div className="form-group">
            <label className="form-label">Conteúdo (Markdown suportado)</label>
            <textarea className={`form-input ${styles.textareaGrande}`} placeholder="Escreva o conteúdo do artigo aqui. Você pode usar ## para títulos, **negrito**, etc." value={conteudo} onChange={e => setConteudo(e.target.value)} rows={20} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.busca}>
          <input type="text" className="form-input" placeholder="Buscar artigos..." value={busca} onChange={e => setBusca(e.target.value)} style={{ maxWidth: '320px' }} />
        </div>
        <button className="btn btn-primary" onClick={novoPost} id="novo-post-btn">
          + Novo Artigo
        </button>
      </div>

      <div className={styles.lista}>
        {postsFiltrados.length === 0 ? (
          <div className={styles.vazio}>
            <p>📝 Nenhum artigo encontrado.</p>
            <button className="btn btn-primary" onClick={novoPost}>Criar primeiro artigo</button>
          </div>
        ) : (
          postsFiltrados.map(post => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postInfo}>
                <span className={`badge badge-verde`}>{post.categoria}</span>
                <h3>{post.titulo}</h3>
                <p>{post.resumo}</p>
                <span className={styles.postData}>{new Date(post.criadoEm).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className={styles.postAcoes}>
                <button
                  className={`${styles.statusBtn} ${post.publicado ? styles.statusPublicado : styles.statusRascunho}`}
                  onClick={() => togglePublicado(post.id)}
                >
                  {post.publicado ? '✅ Publicado' : '⏸ Rascunho'}
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => editarPost(post)}>Editar</button>
                <button className={`btn btn-sm ${styles.excluirBtn}`} onClick={() => excluirPost(post.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
