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
  const [website, setWebsite] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  function whatsappUrl() {
    const msg = [
      'Olá Dr. Márcio Jr., gostaria de falar sobre o BPC/LOAS.',
      '',
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Situação:* ${situacao || 'não informado'}`,
      '',
      '[source=bpc-landing&area=bpc-loas&cta=lead_form]',
    ].join('\n');

    return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;

    setEnviando(true);
    setErro('');

    trackEvent('lead_form_submit', {
      area: 'bpc-loas',
      source: 'bpc-landing',
      situacao,
    });

    try {
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          telefone: whatsapp,
          situacao,
          website,
        }),
      });

      if (!response.ok) throw new Error('Falha ao registrar contato');

      trackEvent('lead_form_saved', {
        area: 'bpc-loas',
        source: 'bpc-landing',
      });
      trackEvent('whatsapp_click', {
        area: 'bpc-loas',
        source: 'bpc-landing',
        cta: 'lead_form',
      });

      setEnviado(true);
      window.location.href = whatsappUrl();
    } catch {
      trackEvent('lead_form_error', {
        area: 'bpc-loas',
        source: 'bpc-landing',
      });
      setErro(
        'Não foi possível registrar seus dados agora. Você ainda pode falar diretamente pelo WhatsApp.'
      );
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className={styles.card}>
        <h3 className={styles.sucessoTitulo}>Contato registrado</h3>
        <p>
          Seus dados foram registrados com segurança. Se o WhatsApp não abriu automaticamente,
          use o botão abaixo para continuar o atendimento.
        </p>
        <a
          href={whatsappUrl()}
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
          maxLength={120}
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
          maxLength={30}
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

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-whatsapp btn-lg" disabled={enviando}>
        {enviando ? 'Registrando contato...' : 'Continuar pelo WhatsApp'}
      </button>

      {erro && (
        <div role="alert" className={styles.erro}>
          <p>{erro}</p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      )}

      <p className={styles.lgpd}>
        Os dados informados são utilizados apenas para responder ao contato, conforme a{' '}
        <a href="/politica-de-privacidade">Política de Privacidade</a> e a Lei nº 13.709/2018
        (LGPD).
      </p>
    </form>
  );
}
