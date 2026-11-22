import Image from 'next/image';
import { RevealBlock } from './reveal-block';
import styles from './media-highlight-section.module.css';

const articleUrl = 'https://g1.globo.com/sp/santos-regiao/especial-publicitario/vivace-mare/noticia/2025/07/28/relacionamento-constroi-patrimonio.ghtml';

export function MediaHighlightSection() {
  return (
    <section className={styles.section} id="midia" aria-labelledby="media-highlight-title">
      <div className={styles.inner}>
        <RevealBlock className={styles.content}>
          <p className={styles.eyebrow}>Vivacemare na mídia</p>
          <h2 id="media-highlight-title">Histórias de confiança merecem ser compartilhadas</h2>
          <p className={styles.description}>
            O relacionamento está no centro da nossa visão de investimentos. Conheça a publicação especial no g1 sobre a filosofia que orienta a Vivacemare.
          </p>
          <a className={styles.cta} href={articleUrl} target="_blank" rel="noreferrer">
            Ler matéria no G1
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </RevealBlock>

        <RevealBlock className={styles.article} delay={120}>
          <Image
            src="/assets/midia/g1-relacionamento-constroi-patrimonio.png"
            alt="Matéria do g1: Relacionamento constrói patrimônio"
            fill
            sizes="(max-width: 900px) 100vw, 662px"
            className={styles.articleImage}
            quality={100}
            unoptimized
          />
        </RevealBlock>
      </div>
    </section>
  );
}
