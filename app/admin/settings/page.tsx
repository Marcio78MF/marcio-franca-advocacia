'use client';
import { useState } from 'react';
import { SITE_CONFIG } from '@/lib/data';
import styles from './settings.module.css';

export default function SettingsPage() {
  const [config, setConfig] = useState({ ...SITE_CONFIG });
  const [salvo, setSalvo] = useState(false);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  }

  function campo(key: keyof typeof SITE_CONFIG, label: string, tipo = 'text', dica?: string) {
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <input
          type={tipo}
          className="form-input"
          value={String(config[key])}
          onChange={e => setConfig({ ...config, [key]: e.target.value })}
        />
        {dica && <small style={{ color: '#8fa898', fontSize: '0.78rem', marginTop: '0.25rem' }}>{dica}</small>}
      </div>
    );
  }

  return (
    <form onSubmit={salvar}>
      {salvo && (
        <div className={styles.sucesso}>✅ Configurações salvas com sucesso!</div>
      )}
      <div className={styles.grid}>
        <div className={styles.secao}>
          <h2>Informações do Escritório</h2>
          {campo('nome', 'Nome do Escritório')}
          {campo('oab', 'Número OAB')}
          {campo('slogan', 'Slogan')}
          {campo('descricao', 'Descrição (SEO)')}
        </div>
        <div className={styles.secao}>
          <h2>Contato</h2>
          {campo('telefone', 'Telefone')}
          {campo('whatsapp', 'WhatsApp (apenas números)', 'text', 'Ex: 5568999999999')}
          {campo('email', 'E-mail', 'email')}
          {campo('endereco', 'Endereço Completo')}
          {campo('horario', 'Horário de Atendimento')}
        </div>
        <div className={styles.secao}>
          <h2>Redes Sociais</h2>
          {campo('instagram', 'Instagram URL')}
          {campo('facebook', 'Facebook URL')}
          {campo('linkedin', 'LinkedIn URL')}
          {campo('googleBusiness', 'Google Business URL')}
        </div>
        <div className={styles.secao}>
          <h2>Integrações</h2>
          {campo('gaId', 'Google Analytics ID', 'text', 'Ex: G-XXXXXXXXXX')}
          {campo('gscVerification', 'Google Search Console (chave de verificação)')}
        </div>
      </div>
      <div className={styles.footer}>
        <button type="submit" className="btn btn-primary btn-lg">
          Salvar Configurações
        </button>
      </div>
    </form>
  );
}
