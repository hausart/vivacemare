import Image from 'next/image';
import { siteCopy } from '@/content/site-copy';
import styles from './recognition-section.module.css';
import { RevealTitle } from './reveal-title';
import { RevealBlock } from './reveal-block';

export function RecognitionSection() {
  return (
    <section id="reconhecimento" className={styles.section} aria-labelledby="recognition-title">
      <div className={styles.inner}>
        <RevealBlock className={styles.copy}>
          <p className={styles.eyebrow}>{siteCopy.recognition.eyebrow}</p>
          <RevealTitle id="recognition-title">{siteCopy.recognition.title}</RevealTitle>
          <p className={styles.description}>{siteCopy.recognition.description}</p>
        </RevealBlock>
        <RevealBlock className={styles.marks} aria-label="Marcas e reconhecimento Safra Invest" delay={140}>
          <Image className={styles.vivaceLogo} src="/assets/logo-vivace-brand.svg" alt="Vivacemare Investimentos" width={274} height={76} />
          <span className={styles.divider} aria-hidden="true" />
          <Image className={styles.safraLogo} src="/assets/safra-brand.svg" alt="Safra Invest" width={270} height={72} />
          <Image className={styles.specialistSeal} src="/assets/especialista.svg" alt="Selo Safra Invest de tradição e solidez" width={126} height={126} />
          <Image className={styles.awardLogo} src="/assets/ativo-1-awards-v2.png" alt="Safra Invest Awards — Escritório Revelação" width={512} height={512} />
        </RevealBlock>
      </div>
    </section>
  );
}
