'use client';
import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Pequeno delay para aparecer suavemente
      const timer = setTimeout(() => setVisivel(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const aceitar = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisivel(false);
  };

  const recusar = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div className={styles.wrapper} role="alert" aria-live="polite">
      <div className={styles.inner}>
        <div className={styles.texto}>
          <p>
            Utilizamos cookies para oferecer uma melhor experiência, analisar o tráfego do site e personalizar conteúdo, de acordo com a nossa{' '}
            <span className={styles.link}>Política de Privacidade</span>.
          </p>
        </div>
        <div className={styles.botoes}>
          <button onClick={recusar} className={styles.btnRecusar}>
            Recusar
          </button>
          <button onClick={aceitar} className={styles.btnAceitar}>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
