'use client';
import React from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './Motion';
import styles from './ComoFunciona.module.css';

const ETAPAS = [
  {
    num: 'Etapa 01',
    titulo: 'Conte seu caso',
    desc: 'Explique sua situação de forma simples por WhatsApp ou através do nosso Diagnóstico Rápido online.',
    posicao: 'esquerda'
  },
  {
    num: 'Etapa 02',
    titulo: 'Análise documental',
    desc: 'Avaliamos seus documentos e histórico para identificar a viabilidade e consistência do seu direito.',
    posicao: 'direita'
  },
  {
    num: 'Etapa 03',
    titulo: 'Estratégia jurídica',
    desc: 'Elaboramos uma tese técnica personalizada e estratégica focada em resolver seu problema da melhor forma.',
    posicao: 'esquerda'
  },
  {
    num: 'Etapa 04',
    titulo: 'Acompanhamento especializado',
    desc: 'Iniciamos a demanda de forma célere e acompanhamos cada atualização de forma transparente.',
    posicao: 'direita'
  }
];

export default function ComoFunciona() {
  return (
    <section className={styles.section} id="como-funciona" aria-labelledby="como-funciona-titulo">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-badge">Timeline</div>
          <h2 id="como-funciona-titulo">Como funciona o atendimento</h2>
          <p>Um processo transparente, ágil e focado na sua comodidade, do primeiro contato à resolução.</p>
        </ScrollReveal>

        <StaggerContainer className={styles.timeline}>
          {ETAPAS.map((e, index) => {
            const isEsquerda = e.posicao === 'esquerda';
            return (
              <StaggerItem
                key={index}
                className={`${styles.item} ${isEsquerda ? styles.ladoEsquerdo : styles.ladoDireito}`}
              >
                <div className={styles.dot} aria-hidden="true" />
                
                {isEsquerda ? (
                  <>
                    <div className={styles.blocoContent}>
                      <div className={styles.card}>
                        <span className={styles.num}>{e.num}</span>
                        <h3>{e.titulo}</h3>
                        <p>{e.desc}</p>
                      </div>
                    </div>
                    <div className={styles.blocoSpacer} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <div className={styles.blocoSpacer} aria-hidden="true" />
                    <div className={styles.blocoContent}>
                      <div className={styles.card}>
                        <span className={styles.num}>{e.num}</span>
                        <h3>{e.titulo}</h3>
                        <p>{e.desc}</p>
                      </div>
                    </div>
                  </>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
