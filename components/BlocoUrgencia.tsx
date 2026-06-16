'use client';
import React from 'react';
import { ScrollReveal } from './Motion';
import Icon from './Icon';
import { SITE_CONFIG } from '@/lib/data';
import styles from './BlocoUrgencia.module.css';

const DORES = [
  'Benefício do INSS negado',
  'Desconto bancário indevido',
  'Empréstimo não reconhecido',
  'Conta de energia com cobrança abusiva',
  'Nome negativado injustamente',
  'Problemas familiares',
];

export default function BlocoUrgencia() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá Dr. Márcio! Estou com um problema e preciso de orientação jurídica.')}`;

  return (
    <section className={styles.section} aria-labelledby="urgencia-titulo">
      <div className="container">
        <ScrollReveal className={styles.card}>
          <div className={styles.content}>
            <div className="section-badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>
              Atenção
            </div>
            <h2 id="urgencia-titulo" className={styles.titulo}>
              Está enfrentando algum destes problemas?
            </h2>
            <p className={styles.subtitulo}>
              Se você se identifica com alguma das situações abaixo, não espere a situação piorar. O aconselhamento jurídico ético é o primeiro passo para resguardar seus direitos.
            </p>

            <ul className={styles.lista}>
              {DORES.map((dor, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <Icon name="Check" size={16} />
                  </span>
                  <span>{dor}</span>
                </li>
              ))}
            </ul>

            <div className={styles.ctaContainer}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                aria-label="Falar agora com o escritório no WhatsApp"
              >
                <Icon name="MessageCircle" size={20} />
                Falar agora com o escritório
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
