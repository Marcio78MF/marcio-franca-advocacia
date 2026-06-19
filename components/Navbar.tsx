'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, AREAS_ATUACAO } from '@/lib/data';
import Icon from '@/components/Icon';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [areasAberto, setAreasAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá, gostaria de informações sobre atendimento jurídico.')}`;

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="banner" style={{ viewTransitionName: 'site-header' }}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => setAberto(false)} aria-label="Márcio França Advocacia - Página Inicial">
          <div className={styles.logoImgWrap}>
            <Image
              src="/images/logo-mf.jpg"
              alt="Logo Márcio França Advocacia"
              width={44}
              height={44}
              className={styles.logoImg}
              priority
            />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoNome}>Márcio França</span>
            <span className={styles.logoSub}>Advocacia · {SITE_CONFIG.oab}</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Menu principal">
          <Link href="/" className={styles.navLink}>Início</Link>

          {/* Dropdown Áreas */}
          <div
            className={styles.dropdown}
            onMouseEnter={() => setAreasAberto(true)}
            onMouseLeave={() => setAreasAberto(false)}
          >
            <button className={styles.navLink} aria-expanded={areasAberto} aria-haspopup="true">
              Áreas de Atuação <Icon name="ChevronDown" size={14} className={styles.chevron} />
            </button>
            {areasAberto && (
              <div className={styles.dropdownMenu} role="menu">
                {AREAS_ATUACAO.map((area) => (
                  <Link key={area.id} href={area.slug} className={styles.dropdownItem} role="menuitem">
                    <span className={styles.dropdownIcone}><Icon name={area.icone} size={16} /></span>
                    <span>{area.titulo}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className={styles.navLink}>Blog Jurídico</Link>
          <Link href="/sobre" className={styles.navLink}>Sobre</Link>
          <Link href="/contato" className={styles.navLink}>Contato</Link>
        </nav>

        {/* CTA Desktop */}
        <div className={styles.ctas}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-sm ${styles.ctaWhatsapp}`}
            aria-label="Falar no WhatsApp com o Dr. Márcio França"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <Link href="/triagem" className={`btn btn-dourado btn-sm`} aria-label="Fazer diagnóstico jurídico rápido">
            Diagnóstico Rápido
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${aberto ? styles.hamburgerAberto : ''}`}
          onClick={() => setAberto(!aberto)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="mobile-nav"
        >
          <Icon name={aberto ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        className={`${styles.mobileMenu} ${aberto ? styles.mobileMenuAberto : ''}`}
        aria-hidden={!aberto}
      >
        <nav className={styles.mobileNav} aria-label="Menu mobile">
          <Link href="/" className={styles.mobileNavLink} onClick={() => setAberto(false)}>Início</Link>
          <div className={styles.mobileSection}>Áreas de Atuação</div>
          {AREAS_ATUACAO.map((area) => (
            <Link key={area.id} href={area.slug} className={styles.mobileNavLink} onClick={() => setAberto(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icon name={area.icone} size={16} /> {area.titulo}
            </Link>
          ))}
          <Link href="/blog" className={styles.mobileNavLink} onClick={() => setAberto(false)}>Blog Jurídico</Link>
          <Link href="/sobre" className={styles.mobileNavLink} onClick={() => setAberto(false)}>Sobre</Link>
          <Link href="/contato" className={styles.mobileNavLink} onClick={() => setAberto(false)}>Contato</Link>

          <div className={styles.mobileCtas}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              onClick={() => setAberto(false)}
              aria-label="Falar no WhatsApp"
            >
              WhatsApp
            </a>
            <Link href="/triagem" className="btn btn-dourado" onClick={() => setAberto(false)}>
              Diagnóstico Rápido
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
