'use client';
import React from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './Motion';
import { Star, Quote, ExternalLink } from 'lucide-react';
import styles from './Avaliacoes.module.css';

const AVALIACOES = [
  {
    nome: 'Andreia Paulichen',
    iniciais: 'AP',
    comentario: 'O melhor escritório e pessoas qualificadas. Tive causa ganha. Recomendo.',
    nota: 5,
    data: 'Cliente do Google'
  },
  {
    nome: 'Cliente P.',
    iniciais: 'CP',
    comentario: 'O atendimento do doutor Márcio França é nota 10. Eu super recomendo.',
    nota: 5,
    data: 'Cliente do Google'
  },
  {
    nome: 'Cliente',
    iniciais: 'C',
    comentario: 'Excelente profissional, sempre prestativo e eficaz na resolução de problemas.',
    nota: 5,
    data: 'Cliente do Google'
  }
];

export default function Avaliacoes() {
  const googleProfileUrl = 'https://www.google.com/search?q=Advocacia+Dr.+M%C3%A1rcio+Fran%C3%A7a';

  return (
    <section className={styles.section} id="avaliacoes" aria-labelledby="avaliacoes-titulo">
      <div className="container">
        
        {/* Intro Grid */}
        <ScrollReveal className={styles.intro}>
          <div className={styles.scoreBlock}>
            <div className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={12} style={{ fill: 'currentColor' }} />
              Avaliações verificadas do Google
            </div>
            <h2 id="avaliacoes-titulo" className={styles.tituloSecao}>O que dizem os clientes</h2>
            <div className={styles.starsSummary}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={styles.starsSummaryIcon} />
              ))}
            </div>
            <span className={styles.scoreSub}>
              Nota média <strong>4,5/5</strong> · 8 avaliações públicas
            </span>
          </div>
          
          <div className={styles.btnGroup}>
            <a
              href={googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label="Ver todas as avaliações no Google"
            >
              Ver avaliações no Google
              <ExternalLink size={15} />
            </a>
            <a
              href={googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label="Deixar avaliação no Google"
            >
              Avaliar no Google
              <ExternalLink size={15} />
            </a>
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <StaggerContainer className={styles.cardsGrid}>
          {AVALIACOES.map((item, index) => (
            <StaggerItem key={index} className={styles.card}>
              <Quote size={28} className={styles.quoteIcon} aria-hidden="true" />
              
              <div className={styles.stars}>
                {[...Array(item.nota)].map((_, i) => (
                  <Star key={i} size={15} className={styles.starIcon} />
                ))}
              </div>
              
              <p className={styles.comentario}>
                “{item.comentario}”
              </p>
              
              <div className={styles.autor}>
                <div className={styles.avatar} aria-hidden="true">
                  {item.iniciais}
                </div>
                <div className={styles.autorInfo}>
                  <strong>{item.nome}</strong>
                  <span>{item.data}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Aviso Legal de Avaliações */}
        <ScrollReveal className={styles.aviso}>
          Cada caso depende de análise individual e não há garantia de resultado.
        </ScrollReveal>
      </div>
    </section>
  );
}
