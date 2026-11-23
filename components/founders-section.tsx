import Image from 'next/image';
import type React from 'react';
import { RevealBlock } from './reveal-block';
import { RevealTitle } from './reveal-title';
import styles from './founders-section.module.css';
import { assetPath } from '@/lib/asset-path';

const founders = [
  {
    name: 'Alexandre Ribas',
    role: 'SÓCIO FUNDADOR',
    image: assetPath('/assets/fundadores/alexandre.png'),
    description: 'Com mais de 25 anos de experiência no mercado. Sua trajetória inclui posições em instituições como Itaú Unibanco, Safra, HSBC, Citi e XP Inc., com experiência em relacionamento, private banking e assessoria de investimentos. É formado em Administração pela Universidade São Marcos e possui certificação Ancord. Atualmente, dedica-se à construção de soluções financeiras personalizadas para pessoas físicas, clientes private e empresas.',
  },
  {
    name: 'Janaina Oliveira',
    role: 'SÓCIA FUNDADORA',
    image: assetPath('/assets/fundadores/janaina.png'),
    description: 'Com mais de 25 anos de experiência no mercado financeiro, com sólida atuação em bancos e foco na identificação de soluções adequadas às necessidades dos clientes. Reconhecida por sua dedicação, visão de equipe e orientação para resultados, combina relacionamento próximo e conhecimento técnico em sua atuação. Tem formação ligada à Escola de Negócios e Seguros — ENS e certificação Ancord e Susep.',
  },
  {
    name: 'André Rocha',
    role: 'SÓCIO FUNDADOR',
    image: assetPath('/assets/fundadores/andre.png'),
    description: 'Com mais de 25 anos de experiência no setor bancário, com passagens por instituições como Banco Real, Santander e Safra. Sua experiência concentra-se em clientes pessoa jurídica, middle market, gestão comercial e relacionamento empresarial. É formado em Administração, possui MBA em Gestão Empresarial pela Fundação Getulio Vargas e certificações CEA e CPA-20 pela Anbima. Na Vivacemare, atua especialmente na estruturação financeira e no crescimento sustentável de empresas.',
  },
] as const;

export function FoundersSection() {
  return (
    <section id="socios" className={styles.section} aria-labelledby="founders-title">
      <div className={styles.inner}>
        <RevealBlock className={styles.header}>
          <p className={styles.eyebrow}>QUEM ESTÁ À FRENTE</p>
          <RevealTitle id="founders-title">Experiência que se encontra,<br className={styles.desktopBreak} /> propósito que permanece</RevealTitle>
        </RevealBlock>
        <div className={styles.grid}>
          {founders.map((founder, index) => (
            <RevealBlock
              className={styles.card}
              delay={index === 1 ? 120 : index === 0 ? 300 : 420}
              key={founder.name}
              style={{
                '--reveal-x': index === 0 ? '180px' : index === 2 ? '-180px' : '0px',
                '--reveal-scale': index === 1 ? '0.98' : '0.86',
              } as React.CSSProperties}
            >
              <div className={styles.imageFrame}>
                <Image
                  className={styles.image}
                  src={founder.image}
                  alt={founder.name}
                  width={420}
                  height={420}
                  style={{
                    objectPosition: index === 0 ? '50% 0%' : index === 1 ? '50% 0%' : '50% 28%',
                    transform: index < 2 ? 'scale(1.08)' : 'scale(1)',
                  }}
                />
              </div>
              <h3>{founder.name}</h3>
              <p className={styles.role}>{founder.role}</p>
              <p className={styles.description}>{founder.description}</p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
