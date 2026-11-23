import Image from 'next/image';
import { RevealBlock } from './reveal-block';
import { RevealTitle } from './reveal-title';
import styles from './vision-section.module.css';
import { assetPath } from '@/lib/asset-path';

export function VisionSection() {
  return (
    <section id="equipe" className={styles.section} aria-labelledby="vision-title">
      <Image
        className={styles.background}
        src={assetPath('/assets/golfe.webp')}
        alt="Golfista observando o horizonte ao entardecer"
        fill
        sizes="100vw"
        priority={false}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.shell}>
        <RevealBlock className={styles.content}>
          <Image className={styles.symbol} src={assetPath('/assets/simbolo.svg')} alt="" width={154} height={154} />
          <RevealTitle id="vision-title">Visão para ir além.<br className={styles.desktopBreak} /> Estratégia para chegar lá</RevealTitle>
          <p className={styles.description}>
            Experiência, proximidade e estratégia para transformar decisões importantes em caminhos de crescimento.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
