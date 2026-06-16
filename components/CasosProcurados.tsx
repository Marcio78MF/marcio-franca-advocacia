'use client';
import React from 'react';
import Link from 'next/link';
import { AREAS_ATUACAO } from '@/lib/data';
import Icon from './Icon';
import { ScrollReveal, StaggerContainer, StaggerItem } from './Motion';
import styles from './CasosProcurados.module.css';

// Mapeamento de textos específicos solicitados pelo usuário para os 4 casos mais procurados
const DETALHES_PROCURADOS: Record<string, { titulo: string; desc: string }> = {
  'bpc-loas': {
    titulo: 'BPC/LOAS Negado',
    desc: 'Saiba se você possui direito ao benefício assistencial.',
  },
  'aposentadoria-rural': {
    titulo: 'Aposentadoria Rural',
    desc: 'Análise documental para trabalhadores rurais.',
  },
  'consignado-indevido': {
    titulo: 'Empréstimo Não Reconhecido',
    desc: 'Descontos indevidos em aposentadorias e pensões.',
  },
  'energisa': {
    titulo: 'Problemas com a Energisa',
    desc: 'Cobranças abusivas, suspensão indevida e irregularidades.',
  },
};

const IDS_PROCURADOS = ['bpc-loas', 'aposentadoria-rural', 'consignado-indevido', 'energisa'];

export default function CasosProcurados() {
  const casosPrincipais = AREAS_ATUACAO.filter(a => IDS_PROCURADOS.includes(a.id)).map(a => ({
    ...a,
    tituloDestaque: DETALHES_PROCURADOS[a.id]?.titulo || a.titulo,
    descDestaque: DETALHES_PROCURADOS[a.id]?.desc || a.subtitulo,
  }));

  const outrasAreas = AREAS_ATUACAO.filter(a => !IDS_PROCURADOS.includes(a.id));

  return (
    <section className={styles.section} id="areas" aria-labelledby="areas-titulo">
      <div className="container">
        
        {/* === SEÇÃO 1: CASOS MAIS PROCURADOS === */}
        <ScrollReveal className="section-header">
          <div className="section-badge">Áreas em Destaque</div>
          <h2 id="areas-titulo" className={styles.tituloSecao}>Casos Mais Procurados</h2>
          <p>Destaque especializado para as demandas de maior urgência e solicitação no escritório.</p>
        </ScrollReveal>

        <StaggerContainer className={styles.destaqueGrid}>
          {casosPrincipais.map((area) => (
            <StaggerItem key={area.id} className={styles.destaqueCardWrap}>
              <div className={styles.destaqueCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <Icon name={area.icone} size={28} />
                  </div>
                  <span className={styles.destaqueBadge}>Prioritário</span>
                </div>
                
                <div className={styles.cardBody}>
                  <h3>{area.tituloDestaque}</h3>
                  <p>{area.descDestaque}</p>
                </div>

                <div className={styles.cardFooter}>
                  <Link href={area.slug} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    Entenda seu caso
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* === SEÇÃO 2: OUTRAS ÁREAS DE ATUAÇÃO === */}
        <ScrollReveal className={styles.outrasHeader}>
          <h3>Outras Áreas de Atuação</h3>
          <div className={styles.divider} aria-hidden="true" />
        </ScrollReveal>

        <StaggerContainer className={styles.outrasGrid}>
          {outrasAreas.map((area) => (
            <StaggerItem key={area.id}>
              <Link href={area.slug} className={styles.areaCard}>
                <span className={styles.areaIcone} aria-hidden="true">
                  <Icon name={area.icone} size={22} />
                </span>
                <h4 className={styles.areaTitulo}>{area.titulo}</h4>
                <p className={styles.areaSub}>{area.subtitulo}</p>
                <span className={styles.areaLink} aria-hidden="true">
                  Saiba mais <span className={styles.areaArrow}>→</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
