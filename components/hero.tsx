import Image from 'next/image';
import { siteCopy } from '@/content/site-copy';
import styles from './hero.module.css';
import { whatsappHref } from '@/lib/whatsapp';
import { RevealTitle } from './reveal-title';
import { RevealBlock } from './reveal-block';

export function Hero() {
  return (
    <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
      <Image src="/assets/hero.webp" alt="" fill priority sizes="100vw" className={styles.backgroundImage} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.shell}>
        <RevealBlock className={styles.copy}>
          <RevealTitle as="h1" id="hero-title">{siteCopy.hero.title}</RevealTitle>
          <p className={styles.description}>{siteCopy.hero.description}</p>
          <a className={styles.primaryCta} href={whatsappHref('assessoria de investimentos')}>
            {siteCopy.hero.cta}
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </RevealBlock>
      </div>
    </section>
  );
}
