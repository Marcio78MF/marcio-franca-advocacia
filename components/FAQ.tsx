'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';

type FAQItem = { pergunta: string; resposta: string };

export default function FAQ({ itens, titulo }: { itens: FAQItem[]; titulo?: string }) {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <div className={styles.faq}>
      {titulo && <h3 className={styles.titulo}>{titulo}</h3>}
      <div className={styles.lista}>
        {itens.map((item, i) => (
          <div key={i} className={`${styles.item} ${aberto === i ? styles.itemAberto : ''}`}>
            <button className={styles.pergunta} onClick={() => setAberto(aberto === i ? null : i)} aria-expanded={aberto === i}>
              <span>{item.pergunta}</span>
              <span className={styles.icon}>{aberto === i ? '−' : '+'}</span>
            </button>
            <div className={styles.resposta} style={{ maxHeight: aberto === i ? '500px' : '0' }}>
              <p>{item.resposta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
