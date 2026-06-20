'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icone: '📊' },
  { href: '/admin/posts', label: 'Artigos', icone: '📝' },
  { href: '/admin/leads', label: 'Leads', icone: '📋' },
  { href: '/admin/landing-pages', label: 'Landing Pages', icone: '🏛️' },
  { href: '/admin/settings', label: 'Configurações', icone: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    if (pathname === '/admin') {
      setVerificando(false);
      return;
    }

    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin');
    } else {
      setAutenticado(true);
    }
    setVerificando(false);
  }, [pathname, router]);

  if (pathname === '/admin') return <>{children}</>;

  if (verificando) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1b2d', color: 'white', fontFamily: 'sans-serif' }}>
        <p>Verificando credenciais...</p>
      </div>
    );
  }

  if (!autenticado) return null;

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarAberta ? styles.sidebarAberta : styles.sidebarFechada}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.sidebarLogo}>
            <div className={styles.sidebarLogoIcon}>MF</div>
            {sidebarAberta && <span>Painel Admin</span>}
          </Link>
          <button className={styles.toggleBtn} onClick={() => setSidebarAberta(!sidebarAberta)} aria-label="Toggle sidebar">
            {sidebarAberta ? '◀' : '▶'}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname.startsWith(item.href) ? styles.navItemAtivo : ''}`}
            >
              <span className={styles.navIcone}>{item.icone}</span>
              {sidebarAberta && <span className={styles.navLabel}>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <Link href="/" className={styles.verSite} target="_blank">
            <span>🌐</span>
            {sidebarAberta && <span>Ver site</span>}
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('admin_session');
              router.push('/admin');
            }}
            className={styles.verSite}
            style={{
              background: 'none',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ff4d4d',
            }}
          >
            <span>🚪</span>
            {sidebarAberta && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.topBarTitulo}>
            {navItems.find((n) => pathname.startsWith(n.href))?.label || 'Admin'}
          </h1>
          <div className={styles.topBarUser}>
            <div className={styles.avatar}>MF</div>
            <span>Dr. Márcio França</span>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
