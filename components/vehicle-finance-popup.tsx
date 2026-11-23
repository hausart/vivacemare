'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { whatsappHref } from '@/lib/whatsapp';
import { assetPath } from '@/lib/asset-path';
import styles from './vehicle-finance-popup.module.css';

export function VehicleFinancePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const section = document.getElementById('solucoes');
    if (!section || hasTriggeredRef.current) return;

    let delayTimer: number | undefined;
    const updateVisibility = () => {
      const bounds = section.getBoundingClientRect();
      const isVisible = bounds.top < window.innerHeight * 0.85 && bounds.bottom > window.innerHeight * 0.15;

      if (isVisible && delayTimer === undefined && !hasTriggeredRef.current) {
        delayTimer = window.setTimeout(() => {
          hasTriggeredRef.current = true;
          setIsOpen(true);
        }, 2000);
      } else if (!isVisible && delayTimer !== undefined && !hasTriggeredRef.current) {
        window.clearTimeout(delayTimer);
        delayTimer = undefined;
      }
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      if (delayTimer !== undefined) window.clearTimeout(delayTimer);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen || dialog.open) return;
    dialog.showModal();
  }, [isOpen]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="vehicle-finance-title"
      aria-describedby="vehicle-finance-description"
      onClose={() => setIsOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={assetPath('/assets/financiamento-veiculo.webp')}
          alt="Sedã azul em frente a edifícios iluminados à noite"
          fill
          sizes="(max-width: 680px) 520px, 1200px"
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>CRÉDITO PARA VEÍCULOS</p>
        <h2 id="vehicle-finance-title">Seu próximo carro, com um plano alinhado ao seu momento</h2>
        <p className={styles.description} id="vehicle-finance-description">
          Conte com uma assessoria próxima para avaliar alternativas de financiamento e organizar a compra do seu veículo de acordo com seus objetivos e planejamento.
        </p>
        <a className={styles.cta} href={whatsappHref('financiamento de veículo')}>
          Falar com um assessor
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <button className={styles.closeButton} type="button" onClick={closeDialog} aria-label="Fechar oferta de financiamento de veículos">
        ×
      </button>
    </dialog>
  );
}
