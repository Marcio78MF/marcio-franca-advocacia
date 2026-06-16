'use client';
import React, { useState } from 'react';
import Icon from './Icon';
import { SITE_CONFIG } from '@/lib/data';
import styles from './AreaContactForm.module.css';

type Props = {
  areaTitulo: string;
};

export default function AreaContactForm({ areaTitulo }: Props) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const msg = [
      `Olá Dr. Márcio! Vim pela página de ${areaTitulo} e gostaria de orientação.`,
      ``,
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Mensagem:* ${mensagem || 'Gostaria de agendar uma consulta.'}`
    ].join('\n');
    setEnviado(true);
    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <div className={styles.card}>
      <h3>Fale com um Advogado</h3>
      <p>Preencha os dados e fale diretamente pelo WhatsApp para analisar o seu caso.</p>
      
      {enviado ? (
        <div className={styles.sucesso}>
          <Icon name="Check" size={32} className={styles.sucessoIcon} />
          <h4>Mensagem enviada!</h4>
          <p>O WhatsApp foi aberto. Caso não tenha carregado, clique no botão abaixo.</p>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
          >
            Reabrir WhatsApp
          </a>
        </div>
      ) : (
        <form onSubmit={enviar} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="f-nome">Seu Nome *</label>
            <input
              id="f-nome"
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="f-whatsapp">Seu WhatsApp *</label>
            <input
              id="f-whatsapp"
              type="tel"
              placeholder="(68) 99999-9999"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="f-msg">Resumo do Caso (Opcional)</label>
            <textarea
              id="f-msg"
              placeholder="Descreva brevemente seu problema..."
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              rows={3}
            />
          </div>
          <button type="submit" className="btn btn-whatsapp" disabled={!nome.trim() || !whatsapp.trim()} style={{ width: '100%', justifyContent: 'center' }}>
            <Icon name="MessageCircle" size={16} />
            Iniciar atendimento
          </button>
        </form>
      )}
    </div>
  );
}
