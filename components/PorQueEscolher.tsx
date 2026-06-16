'use client';
import React from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './Motion';
import { Shield, MapPin, Globe, Fingerprint, Cpu } from 'lucide-react';
import styles from './PorQueEscolher.module.css';

const DIFERENCIAIS = [
  {
    icon: Shield,
    titulo: 'Mais de 15 anos de experiência',
    desc: 'Atuação sólida pautada na ética, responsabilidade técnica e busca contínua pelos direitos de nossos clientes.'
  },
  {
    icon: MapPin,
    titulo: 'Atendimento presencial e online',
    desc: 'Escritório moderno em Rio Branco/AC para reuniões físicas e suporte completo por canais digitais.'
  },
  {
    icon: Globe,
    titulo: 'Atuação em todo o Brasil',
    desc: 'Processos 100% digitais que nos permitem acompanhar e protocolar demandas em qualquer tribunal do país.'
  },
  {
    icon: Fingerprint,
    titulo: 'Estratégia personalizada',
    desc: 'Cada caso passa por uma análise de viabilidade detalhada, fugindo de soluções jurídicas padronizadas.'
  },
  {
    icon: Cpu,
    titulo: 'Tecnologia aplicada ao Direito',
    desc: 'Uso de sistemas avançados de jurimetria e gestão processual para antecipar cenários e acelerar resultados.'
  }
];

export default function PorQueEscolher() {
  return (
    <section className={styles.section} id="por-que-escolher" aria-labelledby="por-que-escolher-titulo">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-badge">Diferenciais</div>
          <h2 id="por-que-escolher-titulo">Por que escolher o escritório?</h2>
          <p>Combinamos proximidade humana, rigor técnico e inovação para entregar o melhor serviço aos nossos clientes.</p>
        </ScrollReveal>

        <StaggerContainer className={styles.grid}>
          {DIFERENCIAIS.map((d, index) => {
            const IconComponent = d.icon;
            return (
              <StaggerItem key={index} className={styles.card}>
                <div className={styles.iconeWrap} aria-hidden="true">
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.cardInfo}>
                  <h3>{d.titulo}</h3>
                  <p>{d.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
