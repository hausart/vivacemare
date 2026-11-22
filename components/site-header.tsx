 'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { siteCopy } from '@/content/site-copy';
import styles from './site-header.module.css';
import { whatsappHref } from '@/lib/whatsapp';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#inicio" aria-label="Vivacemare, início">
        <Image
          src="/assets/logo-vivace-light.svg"
          alt="Vivacemare"
          width={166}
          height={34}
          priority
        />
        <span className={styles.brandDivider} aria-hidden="true" />
        <Image
          src="/assets/logo-safra-light.svg"
          alt="Safra Invest"
          width={166}
          height={34}
          priority
        />
      </a>

      <nav className={styles.desktopNav} aria-label="Navegação principal">
        {siteCopy.navigation.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className={styles.headerCta} href={whatsappHref('as soluções e o atendimento da Vivacemare')}>
        {siteCopy.navigation.cta}
        <span className={styles.ctaArrow} aria-hidden="true">→</span>
      </a>

      <div className={styles.mobileMenu}>
        <button type="button" className={styles.mobileMenuButton} aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen((open) => !open)}>
          <span className={styles.menuIcon} aria-hidden="true"><span /><span /><span /></span>
        </button>
        <nav id="mobile-navigation" className={`${styles.mobileMenuNav} ${isMenuOpen ? styles.mobileMenuNavOpen : ''}`} aria-label="Navegação mobile" aria-hidden={!isMenuOpen}>
          {siteCopy.navigation.links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
