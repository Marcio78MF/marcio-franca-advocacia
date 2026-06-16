'use client';
import { useState } from 'react';
import { AREAS_ATUACAO } from '@/lib/data';
import Link from 'next/link';
import styles from './lps.module.css';

export default function LandingPagesPage() {
  const [selecionada, setSelecionada] = useState<typeof AREAS_ATUACAO[0] | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [salvo, setSalvo] = useState(false);

  function selecionar(area: typeof AREAS_ATUACAO[0]) {
    setSelecionada(area);
    setTitulo(`${area.titulo} em Rio Branco/AC`);
    setDescricao(area.descricao);
    setSalvo(false);
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.lista}>
          <h3>Landing Pages SEO</h3>
          {AREAS_ATUACAO.map(area => (
            <button
              key={area.id}
              className={`${styles.lpItem} ${selecionada?.id === area.id ? styles.lpItemAtivo : ''}`}
              onClick={() => selecionar(area)}
            >
              <span className={styles.lpIcone}>{area.icone}</span>
              <div className={styles.lpInfo}>
                <strong>{area.titulo}</strong>
                <span>{area.slug}</span>
              </div>
              <Link href={area.slug} target="_blank" className={styles.verBtn} onClick={e => e.stopPropagation()}>Ver ↗</Link>
            </button>
          ))}
        </div>

        <div className={styles.editor}>
          {!selecionada ? (
            <div className={styles.vazio}>
              <p>🏛️ Selecione uma landing page à esquerda para editar.</p>
            </div>
          ) : (
            <form onSubmit={salvar}>
              {salvo && <div className={styles.sucesso}>✅ Salvo com sucesso!</div>}
              <div className={styles.editorHeader}>
                <h3>{selecionada.icone} {selecionada.titulo}</h3>
                <Link href={selecionada.slug} target="_blank" className="btn btn-outline btn-sm">Ver página ↗</Link>
              </div>
              <div className="form-group">
                <label className="form-label">Título da Página (SEO)</label>
                <input type="text" className="form-input" value={titulo} onChange={e => setTitulo(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Descrição (Meta Description)</label>
                <textarea className="form-input" rows={3} value={descricao} onChange={e => setDescricao(e.target.value)} style={{ resize: 'vertical' }} />
                <small style={{ color: '#8fa898', fontSize: '0.78rem' }}>{descricao.length}/160 caracteres</small>
              </div>
              <div className="form-group">
                <label className="form-label">Palavras-chave SEO</label>
                <input type="text" className="form-input" defaultValue={selecionada.palavrasChave.join(', ')} />
              </div>
              <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
