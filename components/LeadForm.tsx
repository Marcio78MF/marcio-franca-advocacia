'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/lib/data';
import styles from './LeadForm.module.css';

const MOTIVOS = [
  'Renda familiar acima do limite (com Bolsa Família no cálculo)',
  'Perícia médica ou avaliação social',
  'Cadastro Único desatualizado',
  'Ainda não sei o motivo da negativa',
  'Outro motivo',
];

export default function LeadForm() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [motivo, setMotivo] = useState('');
  const [enviado, setEnviado] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const msg = [
      'Olá Dr. Márcio Jr., meu BPC foi negado e quero análise.',
      '',
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Motivo da negativa:* ${motivo || 'não informado'}`,
      '',
      '[source=site&area=bpc-loas]',
    ].join('\n');

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
        <h3 className={styles.sucessoTitulo}>Dados registrados</h3>
        <p>
          O WhatsApp foi aberto em outra janela. Se não abriu, use o botão abaixo para continuar o
          contato.
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
        <label htmlFor="lead-motivo">Motivo da negativa</label>
        <select
          id="lead-motivo"
          name="motivo"
          required
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        >
          <option value="">Selecione</option>
          {MOTIVOS.map((m) => (
            <option key={m} value={m}>
              {m}
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
