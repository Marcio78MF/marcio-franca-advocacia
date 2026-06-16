'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [sidebarAberta, setSidebarAberta] = useState(true);

  if (pathname === '/admin') return <>{children}</>;

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

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.verSite} target="_blank">
            <span>🌐</span>
            {sidebarAberta && <span>Ver site</span>}
          </Link>
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
