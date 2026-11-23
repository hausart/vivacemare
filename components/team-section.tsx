'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './team-section.module.css';
import { assetPath } from '@/lib/asset-path';

const team = [
  { name: 'Diego Costa', role: 'Sócio', image: assetPath('/assets/equipe/optimized/diego-costa.webp'), position: 'top-left' },
  { name: 'Yuri França', role: 'Head de Câmbio', image: assetPath('/assets/equipe/optimized/yuri-franca.webp'), position: 'top-right' },
  { name: 'Aline Serra', role: 'Head de Crédito', image: assetPath('/assets/equipe/optimized/aline-serra.webp'), position: 'middle-left' },
  { name: 'Vitor', role: 'Assessor de Investimentos', image: assetPath('/assets/equipe/optimized/vitor.webp'), position: 'middle-right' },
  { name: 'Rivaldo Amaral', role: 'Assessor de Investimentos', image: assetPath('/assets/equipe/optimized/rivaldo-amaral.webp'), position: 'lower-left' },
  { name: 'Beatriz Novaes', role: 'Assessora de Investimentos', image: assetPath('/assets/equipe/optimized/beatriz-novaes.webp'), position: 'center-right' },
  { name: 'Pedro Lobato', role: 'Assessor de Investimentos', image: assetPath('/assets/equipe/optimized/pedro-lobato.webp'), position: 'bottom-left' },
  { name: 'Lucas Franco', role: 'Head de Consórcios', image: assetPath('/assets/equipe/optimized/lucas-franco.webp'), position: 'bottom-right' },
  { name: 'Laís Alves', role: 'Assessora de Investimentos', image: assetPath('/assets/equipe/optimized/lais-alves.webp'), position: 'lower-right' },
] as const;

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasEntered(true);
      return;
    }
    const enter = () => {
      setHasEntered(true);
      observer.disconnect();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) enter();
    }, { threshold: 0.01, rootMargin: '0px 0px 12% 0px' });
    observer.observe(section);
    const rect = section.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) requestAnimationFrame(enter);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${hasEntered ? styles.isEntered : ''}`} id="time" aria-labelledby="team-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>NOSSO TIME</p>
          <h2 ref={titleRef} id="team-title">Equipe preparada para<br className={styles.desktopBreak} /> cuidar de cada detalhe</h2>
        </div>

        <div className={styles.stage} aria-label="Integrantes da equipe">
          <Image className={styles.symbol} src={assetPath('/assets/equipe/logoequipe.svg')} alt="" width={214} height={222} />
          {team.map((member, index) => (
            <div
              className={`${styles.member} ${styles[member.position]} ${member.name === 'Vitor' ? styles.vitor : ''}`}
              key={member.name}
              style={{ '--member-delay': `${index * 45}ms` } as CSSProperties}
            >
              <Image className={styles.memberImage} src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="(max-width: 560px) 124px, (max-width: 800px) 106px, 160px" quality={82} />
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
