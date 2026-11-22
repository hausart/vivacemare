'use client';

import { useState } from 'react';
import { siteCopy } from '@/content/site-copy';
import styles from './vivacemare-section.module.css';
import { RevealTitle } from './reveal-title';
import { RevealBlock } from './reveal-block';
import { assetPath } from '@/lib/asset-path';

export function VivacemareSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'previous'>('next');
  const slide = siteCopy.vivacemare.slides[activeSlide];

  const changeSlide = (nextIndex: number) => {
    if (nextIndex === activeSlide) return;
    setSlideDirection(nextIndex > activeSlide ? 'next' : 'previous');
    setActiveSlide(nextIndex);
  };

  return (
    <section className={styles.section} id="vivacemare" aria-labelledby="vivacemare-title">
      <RevealBlock className={styles.content}>
        <p className={styles.eyebrow}>{siteCopy.vivacemare.eyebrow}</p>
        <div id="vivacemare-panel" role="tabpanel" aria-live="polite" key={activeSlide} className={slideDirection === 'next' ? styles.slideNext : styles.slidePrevious}>
          <RevealTitle id="vivacemare-title">{slide.title}</RevealTitle>
          <p className={styles.description}>{slide.description}</p>
        </div>
        <div className={styles.controls} aria-label="Navegação dos slides da Vivacemare">
          <button
            type="button"
            className={styles.slideButton}
            aria-label="Slide anterior"
            onClick={() => changeSlide(Math.max(0, activeSlide - 1))}
            disabled={activeSlide === 0}
          >
            ←
          </button>
          <div className={styles.indicators} role="tablist" aria-label="Slides da Vivacemare">
            {siteCopy.vivacemare.slides.map((item, index) => (
              <button
                type="button"
                className={index === activeSlide ? styles.activeControl : styles.control}
                key={item.label}
                role="tab"
                aria-controls="vivacemare-panel"
                aria-label={`Abrir slide ${item.label}`}
                aria-selected={index === activeSlide}
                tabIndex={index === activeSlide ? 0 : -1}
                onClick={() => changeSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.slideButton}
            aria-label="Próximo slide"
            onClick={() => changeSlide(Math.min(siteCopy.vivacemare.slides.length - 1, activeSlide + 1))}
            disabled={activeSlide === siteCopy.vivacemare.slides.length - 1}
          >
            →
          </button>
        </div>
      </RevealBlock>
      <RevealBlock className={styles.media} delay={120}>
        <video
          className={styles.video}
          src={assetPath('/assets/video-logo.mp4')}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      </RevealBlock>
    </section>
  );
}
