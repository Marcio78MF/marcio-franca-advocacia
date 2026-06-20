import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, AREAS_ATUACAO } from '@/lib/data';
import Icon from '@/components/Icon';
import styles from './Footer.module.css';

export default function Footer() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Olá, gostaria de informações sobre atendimento jurídico.')}`;
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Marca */}
        <div className={styles.colBrand}>
          <Link href="/" className={styles.logo} aria-label="Márcio França Advocacia - Página Inicial">
            <div className={styles.logoImgWrap}>
              <Image
                src="/images/logo-mf.jpg"
                alt="Logo Márcio França Advocacia"
                width={44}
                height={44}
                className={styles.logoImg}
              />
            </div>
            <div>
              <div className={styles.logoNome}>Márcio França Advocacia</div>
              <div className={styles.logoOab}>{SITE_CONFIG.oab}</div>
            </div>
          </Link>
          <p className={styles.desc}>
            Escritório de advocacia em Rio Branco/AC com atuação em Direito Previdenciário, Consumidor Bancário, Energisa, Família e Criminal. Atendimento presencial e online.
          </p>
        </div>

        {/* Áreas */}
        <nav className={styles.col} aria-label="Áreas de atuação">
          <h4 className={styles.colTitulo}>Áreas de Atuação</h4>
          <ul className={styles.linkList}>
            {AREAS_ATUACAO.map((area) => (
              <li key={area.id}>
                <Link href={area.slug} className={styles.footerLink}>{area.titulo}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Links rápidos */}
        <nav className={styles.col} aria-label="Links rápidos">
          <h4 className={styles.colTitulo}>Acesso Rápido</h4>
          <ul className={styles.linkList}>
            <li><Link href="/" className={styles.footerLink}>Início</Link></li>
            <li><Link href="/sobre" className={styles.footerLink}>Sobre o Escritório</Link></li>
            <li><Link href="/blog" className={styles.footerLink}>Blog Jurídico</Link></li>
            <li><Link href="/triagem" className={styles.footerLink}>Diagnóstico Rápido</Link></li>
            <li><Link href="/avaliacoes" className={styles.footerLink}>Depoimentos</Link></li>
            <li><Link href="/politica-de-privacidade" className={styles.footerLink}>Política de Privacidade</Link></li>
            <li><Link href="/contato" className={styles.footerLink}>Contato</Link></li>
            <li><Link href="/admin" className={styles.footerLink}>Área Administrativa</Link></li>
          </ul>
        </nav>

        {/* Contato */}
        <div className={styles.col}>
          <h4 className={styles.colTitulo}>Contato</h4>
          <ul className={styles.contatoList}>
            <li className={styles.contatoItem}>
              <span className={styles.contatoIcone} aria-hidden="true"><Icon name="MapPin" size={16} /></span>
              <span>{SITE_CONFIG.endereco}</span>
            </li>
            <li className={styles.contatoItem}>
              <span className={styles.contatoIcone} aria-hidden="true"><Icon name="Phone" size={16} /></span>
              <a href={`tel:${SITE_CONFIG.telefone}`} className={styles.footerLink}>{SITE_CONFIG.telefone}</a>
            </li>
            <li className={styles.contatoItem}>
              <span className={styles.contatoIcone} aria-hidden="true"><Icon name="Clock" size={16} /></span>
              <span>{SITE_CONFIG.horario}</span>
            </li>
          </ul>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-whatsapp ${styles.btnWhats}`}
            aria-label="Falar no WhatsApp com o Dr. Márcio França"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>© {anoAtual} {SITE_CONFIG.nome} – {SITE_CONFIG.oab}. Todos os direitos reservados.</p>
            <p className={styles.bottomAviso}>
              Este site possui finalidade exclusivamente informativa. O envio de informações pelo formulário ou WhatsApp não constitui contratação automática nem garantia de resultado.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
