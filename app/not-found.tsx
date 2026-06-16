import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/data';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a1220, #0f1b2d)', padding: '2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '480px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>⚖️</div>
        <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Página não encontrada</h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2rem', lineHeight: 1.7 }}>A página que você procura não existe ou foi removida. Utilize os links abaixo para navegar pelo site.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-dourado">Ir para o início</Link>
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
