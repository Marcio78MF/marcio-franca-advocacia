'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

const CONSENT_KEY = 'cookie-consent-v2';

declare global {
  interface Window {
    __cookieConsent?: boolean;
  }
}

export default function CookieConsent() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const abrirPreferencias = () => setVisivel(true);
    window.addEventListener('open-cookie-settings', abrirPreferencias);

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      window.__cookieConsent = true;
    } else if (consent === 'declined') {
      window.__cookieConsent = false;
    } else {
      // A versão v2 invalida escolhas antigas para garantir consentimento
      // inequívoco após a correção do mecanismo de Analytics.
      localStorage.removeItem('cookie-consent');
      window.__cookieConsent = false;
      setVisivel(true);
    }

    return () => window.removeEventListener('open-cookie-settings', abrirPreferencias);
  }, []);

  const aceitar = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.removeItem('cookie-consent');
    window.__cookieConsent = true;
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setVisivel(false);
  };

  const recusar = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    localStorage.removeItem('cookie-consent');
    window.__cookieConsent = false;

    // Se o visitante revogar uma autorização já concedida nesta sessão,
    // bloqueia novas medições do Analytics.
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').forEach((node) => node.remove());
    delete window.gtag;
    delete window.dataLayer;
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div className={styles.wrapper} role="dialog" aria-live="polite" aria-label="Preferências de cookies">
      <div className={styles.inner}>
        <div className={styles.texto}>
          <p>
            Utilizamos cookies opcionais de análise para compreender o uso do site e melhorar a experiência, de acordo com a nossa{' '}
            <Link href="/politica-de-privacidade" className={styles.link}>Política de Privacidade</Link>.
          </p>
        </div>
        <div className={styles.botoes}>
          <button type="button" onClick={recusar} className={styles.btnRecusar}>
            Recusar
          </button>
          <button type="button" onClick={aceitar} className={styles.btnAceitar}>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
