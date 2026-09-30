'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './SituationGuide.module.css';

type PathKey = 'idoso' | 'deficiencia' | 'negado-renda' | 'negado-avaliacao' | 'suspenso' | 'cadunico';

const CAMINHOS: Record<PathKey, { titulo: string; texto: string; href: string; link: string }> = {
  idoso: { titulo: 'BPC para pessoa idosa', texto: 'A análise começa pela idade mínima, renda familiar, CadÚnico e demais requisitos administrativos.', href: '/blog/bpc-idoso-65-anos', link: 'Entender os requisitos' },
  deficiencia: { titulo: 'BPC para pessoa com deficiência', texto: 'É necessário analisar o impedimento de longo prazo, as barreiras enfrentadas, a renda familiar e os requisitos cadastrais.', href: '/blog/pericia-avaliacao-social-bpc', link: 'Entender a avaliação' },
  'negado-renda': { titulo: 'Pedido negado por renda', texto: 'O ponto inicial é conferir grupo familiar, rendimentos utilizados e regras aplicadas no cálculo do INSS.', href: '/blog/bpc-negado-por-renda', link: 'Entender a negativa por renda' },
  'negado-avaliacao': { titulo: 'Deficiência não reconhecida', texto: 'É importante confrontar a conclusão administrativa com a avaliação realizada e os documentos disponíveis.', href: '/blog/pericia-avaliacao-social-bpc', link: 'Entender perícia e avaliação social' },
  suspenso: { titulo: 'BPC suspenso ou bloqueado', texto: 'A providência depende da comunicação recebida e do motivo apontado pela Administração.', href: '/blog/bpc-suspenso-bloqueado', link: 'Entender suspensão ou bloqueio' },
  cadunico: { titulo: 'CadÚnico ou renda familiar', texto: 'CadÚnico e BPC possuem regras próprias. É importante identificar exatamente onde está a dúvida cadastral ou de renda.', href: '/blog/cadunico-bpc', link: 'Entender CadÚnico e BPC' },
};

export default function SituationGuide() {
  const [selecionado, setSelecionado] = useState<PathKey | null>(null);
  const caminho = selecionado ? CAMINHOS[selecionado] : null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.intro}>Escolha a situação mais próxima da sua. Isto não determina se existe direito ao benefício; serve para indicar qual informação deve ser examinada primeiro.</p>
      <div className={styles.opcoes} role="group" aria-label="Situação relacionada ao BPC">
        <button type="button" onClick={() => setSelecionado('idoso')}>Quero entender o BPC para idoso</button>
        <button type="button" onClick={() => setSelecionado('deficiencia')}>Quero entender o BPC por deficiência</button>
        <button type="button" onClick={() => setSelecionado('negado-renda')}>Meu pedido foi negado por renda</button>
        <button type="button" onClick={() => setSelecionado('negado-avaliacao')}>A deficiência não foi reconhecida</button>
        <button type="button" onClick={() => setSelecionado('suspenso')}>Meu BPC foi suspenso ou bloqueado</button>
        <button type="button" onClick={() => setSelecionado('cadunico')}>Tenho dúvida sobre CadÚnico ou renda</button>
      </div>
      {caminho && (
        <div className={styles.resultado} aria-live="polite">
          <h3>{caminho.titulo}</h3>
          <p>{caminho.texto}</p>
          <div className={styles.acoes}>
            <Link href={caminho.href} className="btn btn-outline">{caminho.link}</Link>
            <Link href="/#formulario" className="btn btn-dourado">Enviar minha situação para análise</Link>
          </div>
          <p className={styles.aviso}>Orientação inicial informativa. Não constitui conclusão sobre direito ao benefício nem promessa de resultado.</p>
        </div>
      )}
    </div>
  );
}