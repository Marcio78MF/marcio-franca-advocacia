'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, AREAS_ATUACAO } from '@/lib/data';
import Icon from '@/components/Icon';
import styles from './contato.module.css';

export default function ContatoPage() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [area, setArea] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const msg = [
      `Olá, entrei em contato pelo site Márcio França Advocacia.`,
      ``,
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Área:* ${area || 'Não especificada'}`,
      `*Mensagem:* ${mensagem || 'Não informada'}`,
    ].join('\n');
    setEnviado(true);
    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className="section-badge" style={{ background: 'rgba(201,168,76,0.12)', color: '#ddc170', borderColor: 'rgba(201,168,76,0.25)' }}>
            Fale Conosco
          </div>
          <h1 className={styles.heroTitulo}>Entre em contato</h1>
          <p className={styles.heroDesc}>
            Preencha o formulário e envie sua mensagem diretamente pelo WhatsApp.
            Retorno rápido em horário comercial.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container" style={{ marginTop: '1.5rem' }}>
        <div className="breadcrumb">
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Contato</span>
        </div>
      </div>

      {/* Content */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div className={styles.grid}>
            {/* Form */}
            <div className={styles.formCard}>
              <h2>Envie sua mensagem</h2>
              <p>Descreva brevemente sua situação. Responderemos o mais rápido possível.</p>

              {enviado ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    <Icon name="Check" size={48} className="text-dourado" style={{ margin: '0 auto' }} />
                  </div>
                  <h3 style={{ color: 'var(--grafite)', marginBottom: '0.5rem' }}>Mensagem enviada!</h3>
                  <p style={{ marginBottom: '1.5rem' }}>O WhatsApp foi aberto com suas informações. Caso a janela não tenha aberto, clique no botão abaixo.</p>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
                  >
                    Reabrir WhatsApp
                  </a>
                  <div>
                    <button
                      className="btn btn-outline"
                      onClick={() => setEnviado(false)}
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={enviar} className={styles.form} noValidate>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-nome">Nome completo *</label>
                    <input
                      id="c-nome"
                      type="text"
                      className="form-input"
                      placeholder="Seu nome completo"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-whatsapp">WhatsApp *</label>
                    <input
                      id="c-whatsapp"
                      type="tel"
                      className="form-input"
                      placeholder="(68) 99999-9999"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-area">Área de interesse</label>
                    <select
                      id="c-area"
                      className="form-input"
                      value={area}
                      onChange={e => setArea(e.target.value)}
                    >
                      <option value="">Selecione a área...</option>
                      {AREAS_ATUACAO.map(a => (
                        <option key={a.id} value={a.titulo}>{a.titulo}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-msg">Descrição do caso</label>
                    <textarea
                      id="c-msg"
                      className="form-input"
                      placeholder="Descreva resumidamente sua situação..."
                      value={mensagem}
                      onChange={e => setMensagem(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-whatsapp btn-lg"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                    disabled={!nome.trim() || !whatsapp.trim()}
                  >
                    Enviar pelo WhatsApp
                  </button>
                  <p className={styles.aviso}>{SITE_CONFIG.avisoLegal}</p>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <aside className={styles.infoPanel}>
              <div className={styles.infoCard}>
                <h2>Informações de contato</h2>
                <div className={styles.infoItem}>
                  <Icon name="Phone" className={styles.infoItemIcon} size={18} />
                  <div>
                    <strong>WhatsApp</strong>
                    <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">{SITE_CONFIG.telefone}</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Icon name="Mail" className={styles.infoItemIcon} size={18} />
                  <div>
                    <strong>E-mail</strong>
                    <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Icon name="MapPin" className={styles.infoItemIcon} size={18} />
                  <div>
                    <strong>Localização</strong>
                    <p>{SITE_CONFIG.endereco}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Icon name="Clock" className={styles.infoItemIcon} size={18} />
                  <div>
                    <strong>Horário</strong>
                    <p>{SITE_CONFIG.horario}</p>
                  </div>
                </div>
              </div>

              {/* Google Reviews Card */}
              <div className={styles.mapCard}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--grafite)' }}>
                  <Icon name="Star" size={18} style={{ color: '#ffc107', fill: '#ffc107' }} />
                  Avaliações no Google
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--cinza-texto)', marginBottom: '0.75rem' }}>
                  Veja o que dizem os nossos clientes ou deixe seu depoimento sobre nossa atuação ética no Google Business Profile.
                </p>
                <a
                  href={SITE_CONFIG.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                  aria-label="Ver avaliações no Google"
                >
                  Acessar perfil no Google
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>

              <div className={styles.mapCard}>
                <h4>Localização no mapa</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--cinza-texto)', marginBottom: '0.75rem' }}>
                  Rio Branco, Acre — Atendimento presencial e online.
                </p>
                <a
                  href={SITE_CONFIG.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                  aria-label="Abrir localização no Google Maps"
                >
                  Ver no Google Maps
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>

              <Link href="/triagem" className="btn btn-dourado" style={{ display: 'flex', justifyContent: 'center' }}>
                Fazer diagnóstico rápido
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
