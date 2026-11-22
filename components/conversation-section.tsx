'use client';

import { whatsappHref } from '@/lib/whatsapp';
import { RevealBlock } from './reveal-block';
import styles from './conversation-section.module.css';
import { assetPath } from '@/lib/asset-path';

export function ConversationSection() {
  return (
    <section className={styles.section} id="conversa" aria-labelledby="conversation-title">
      <video className={styles.video} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src={assetPath('/assets/footer/video-footer.mp4')} type="video/mp4" />
      </video>
      <div className={styles.overlay} aria-hidden="true" />
      <RevealBlock className={styles.content}>
        <p className={styles.eyebrow}>VAMOS CONVERSAR?</p>
        <h2 id="conversation-title">O próximo capítulo da sua história começa com uma conversa.</h2>
        <p className={styles.description}>Conheça a equipe Vivacemare e converse sobre seus objetivos.</p>
        <a className={styles.cta} href={whatsappHref('agende uma conversa')}>
          Agende uma conversa
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </a>
      </RevealBlock>
    </section>
  );
}
