'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/lib/data';
import styles from './LeadForm.module.css';

function trackEvent(eventName: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('event', eventName, params);
}

const SITUACOES = [
  'Quero saber sobre BPC para pessoa idosa',
  'Quero saber sobre BPC para pessoa com deficiência',
  'Meu pedido foi negado por renda',
  'Meu pedido foi negado após avaliação/perícia',
  'Meu BPC foi suspenso ou bloqueado',
  'Tenho dúvida sobre CadÚnico ou renda familiar',
  'Outro motivo',
];

export default function LeadForm() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [situacao, setSituacao] = useState('');
  const [enviado, setEnviado] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const msg = [
      'Olá Dr. Márcio Jr., gostaria de falar sobre o BPC/LOAS.',
      '',
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Situação:* ${situacao || 'não informado'}`,
      '',
      '[source=bpc-landing&area=bpc-loas&cta=lead_form]',
    ].join('\n');

    trackEvent('lead_form_submit', {
      area: 'bpc-loas',
      source: 'bpc-landing',
      situacao,
    });
    trackEvent('whatsapp_click', {
      area: 'bpc-loas',
      source: 'bpc-landing',
      cta: 'lead_form',
    });

    setEnviado(true);
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  if (enviado) {
    return (
      <div className={styles.card}>
        <h3 className={styles.sucessoTitulo}>Continuar pelo WhatsApp</h3>
        <p>
          As informações preenchidas foram preparadas para envio pelo WhatsApp. Se ele não abriu,
          use o botão abaixo para continuar o contato.
        </p>
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
        >
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={enviar}>
      <div className={styles.grupo}>
        <label htmlFor="lead-nome">Nome</label>
        <input
          id="lead-nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className={styles.grupo}>
        <label htmlFor="lead-whats">WhatsApp</label>
        <input
          id="lead-whats"
          name="whatsapp"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="(68) 9 0000-0000"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
      </div>

      <div className={styles.grupo}>
        <label htmlFor="lead-situacao">Qual é a sua situação?</label>
        <select
          id="lead-situacao"
          name="situacao"
          required
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
        >
          <option value="">Selecione</option>
          {SITUACOES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-whatsapp btn-lg">
        Enviar pelo WhatsApp
      </button>

      <p className={styles.lgpd}>
        Os dados informados são utilizados apenas para responder ao contato, conforme a{' '}
        <a href="/politica-de-privacidade">Política de Privacidade</a> e a Lei nº 13.709/2018
        (LGPD).
      </p>
    </form>
  );
}
