'use client';
import React, { useState, useEffect } from 'react';
import { ScrollReveal } from './Motion';
import { Award, ShieldCheck, Landmark, Globe } from 'lucide-react';
import styles from './BlocoAutoridade.module.css';

export default function BlocoAutoridade() {
  const [anos, setAnos] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 15;
    const duration = 1200; // 1.2 segundos
    const stepTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setAnos(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const metricas = [
    {
      icon: Award,
      titulo: `+${anos} anos`,
      subtitulo: 'de advocacia',
    },
    {
      icon: ShieldCheck,
      titulo: 'OAB/AC 2882',
      subtitulo: 'desde 2010',
    },
    {
      icon: Landmark,
      titulo: 'Presencial & Digital',
      subtitulo: 'Atendimento integrado',
    },
    {
      icon: Globe,
      titulo: 'Atuação Nacional',
      subtitulo: 'Atendimento em todo o Brasil',
    },
  ];

  return (
    <section className={styles.section} aria-label="Bloco de autoridade">
      <div className="container">
        <ScrollReveal className={styles.wrapper}>
          {metricas.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className={styles.item}>
                <div className={styles.iconContainer} aria-hidden="true">
                  <IconComponent size={22} className={styles.icon} />
                </div>
                <div className={styles.textContainer}>
                  <strong className={styles.value}>{item.titulo}</strong>
                  <span className={styles.label}>{item.subtitulo}</span>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
