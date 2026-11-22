'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './team-section.module.css';

const team = [
  { name: 'Diego Costa', role: 'Sócio', image: '/assets/equipe/originals/diego-costa.jpg', position: 'top-left' },
  { name: 'Yuri França', role: 'Head de Câmbio', image: '/assets/equipe/originals/yuri-franca.jpg', position: 'top-right' },
  { name: 'Aline Serra', role: 'Head de Crédito', image: '/assets/equipe/originals/aline-serra.jpg', position: 'middle-left' },
  { name: 'Vitor', role: 'Assessor de Investimentos', image: '/assets/equipe/originals/vitor.webp', position: 'middle-right' },
  { name: 'Rivaldo Amaral', role: 'Assessor de Investimentos', image: '/assets/equipe/originals/rivaldo-amaral.jpg', position: 'lower-left' },
  { name: 'Beatriz Novaes', role: 'Assessora de Investimentos', image: '/assets/equipe/originals/beatriz-novaes.jpg', position: 'center-right' },
  { name: 'Pedro Lobato', role: 'Assessor de Investimentos', image: '/assets/equipe/originals/pedro-lobato.jpg', position: 'bottom-left' },
  { name: 'Lucas Franco', role: 'Head de Consórcios', image: '/assets/equipe/originals/lucas-franco.jpg', position: 'bottom-right' },
  { name: 'Laís Alves', role: 'Assessora de Investimentos', image: '/assets/equipe/originals/lais-alves.jpg', position: 'lower-right' },
] as const;

export function TeamSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setHasEntered(true);
      observer.disconnect();
    }, { threshold: 0.01, rootMargin: '-25% 0px -25% 0px' });
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.section} ${hasEntered ? styles.isEntered : ''}`} id="time" aria-labelledby="team-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>NOSSO TIME</p>
          <h2 ref={titleRef} id="team-title">Equipe preparada para<br className={styles.desktopBreak} /> cuidar de cada detalhe</h2>
        </div>

        <div className={styles.stage} aria-label="Integrantes da equipe">
          <Image className={styles.symbol} src="/assets/equipe/logoequipe.svg" alt="" width={214} height={222} />
          {team.map((member, index) => (
            <div
              className={`${styles.member} ${styles[member.position]} ${member.name === 'Vitor' ? styles.vitor : ''}`}
              key={member.name}
              style={{ '--member-delay': `${index * 90}ms` } as CSSProperties}
            >
              <Image className={styles.memberImage} src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="(max-width: 560px) 148px, (max-width: 800px) 184px, 252px" quality={100} />
              <span className={styles.memberLabel}>
                <strong>{member.name}</strong>
                <small>{member.role}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
