import Image from 'next/image';
import { whatsappHref } from '@/lib/whatsapp';
import { RevealBlock } from './reveal-block';
import styles from './time-value-section.module.css';

export function TimeValueSection() {
  return (
    <section className={styles.section} id="tempo" aria-labelledby="time-value-title">
      <Image
        className={styles.backgroundImage}
        src="/assets/tempo-watch.png"
        alt="Relógio mecânico de luxo em tons de cobre e azul-marinho"
        fill
        sizes="(max-width: 900px) 100vw, 74vw"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <RevealBlock className={styles.copy}>
          <h2 id="time-value-title">O tempo é o seu ativo mais valioso</h2>
          <a className={styles.cta} href={whatsappHref('planejar meu futuro')}>
            Planeje seu futuro
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </RevealBlock>
      </div>
    </section>
  );
}
