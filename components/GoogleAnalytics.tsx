'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const [consentido, setConsentido] = useState(false);

  useEffect(() => {
    const sync = () => setConsentido(localStorage.getItem('cookie-consent-v2') === 'accepted');
    sync();
    window.addEventListener('cookie-consent-changed', sync);
    return () => window.removeEventListener('cookie-consent-changed', sync);
  }, []);

  useEffect(() => {
    if (!consentido || !gaId) return;
    if (document.querySelector(`script[data-ga-id="${gaId}"]`)) {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.dataset.gaId = gaId;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('consent', 'default', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', gaId, { anonymize_ip: true });
  }, [consentido, gaId]);

  return null;
}
