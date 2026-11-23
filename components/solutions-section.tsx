'use client';

import Image from 'next/image';
import { type PointerEvent, useEffect, useRef, useState } from 'react';
import { siteCopy } from '@/content/site-copy';
import styles from './solutions-section.module.css';
import { whatsappHref } from '@/lib/whatsapp';
import { assetPath } from '@/lib/asset-path';
import { RevealTitle } from './reveal-title';
import { RevealBlock } from './reveal-block';
import { VehicleFinancePopup } from './vehicle-finance-popup';

type Solution = (typeof siteCopy.solutions.cards)[number];

export function SolutionsSection() {
  const [selected, setSelected] = useState<Solution | null>(null);
  const [expanded, setExpanded] = useState<Solution | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startScrollLeft: 0 });
  const didDragRef = useRef(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.innerWidth > 800) setExpanded(siteCopy.solutions.cards[0]);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || window.innerWidth <= 800) return;
    const items = Array.from(scroller.querySelectorAll<HTMLElement>('[role="listitem"]'));
    if (items.length === 0) return;
    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 16;
    requestAnimationFrame(() => {
      if (expanded) {
        const expandedIndex = siteCopy.solutions.cards.findIndex((solution) => solution.title === expanded.title);
        const item = items[expandedIndex] ?? items[0];
        const centeredLeft = item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;
        scroller.scrollTo({ left: Math.max(0, centeredLeft), behavior: 'smooth' });
      } else {
        scroller.scrollLeft = (items[0]?.offsetWidth ?? 335) + gap;
      }
    });
  }, [expanded]);

  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
      if (event.key === 'ArrowLeft' && selectedIndex > 0) {
        event.preventDefault();
        navigateModal(-1);
      }
      if (event.key === 'ArrowRight' && selectedIndex < siteCopy.solutions.cards.length - 1) {
        event.preventDefault();
        navigateModal(1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  useEffect(() => {
    if (
      isAutoplayPaused
      || isDragging
      || window.matchMedia('(max-width: 800px)').matches
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    const timer = window.setInterval(() => {
      const scroller = scrollerRef.current;
      const items = scroller ? Array.from(scroller.querySelectorAll<HTMLElement>('[role="listitem"]')) : [];
      if (!scroller || items.length === 0) return;
      const currentIndex = expanded
        ? siteCopy.solutions.cards.findIndex((solution) => solution.title === expanded.title)
        : Math.max(0, Math.round(scroller.scrollLeft / ((items[0]?.offsetWidth ?? 335) + 16))) % items.length;
      const nextIndex = (currentIndex + 1) % items.length;
      const nextSolution = siteCopy.solutions.cards[nextIndex];
      setActiveCardIndex(nextIndex);
      setExpanded(nextSolution);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const currentScroller = scrollerRef.current;
        const currentItem = currentScroller?.querySelectorAll<HTMLElement>('[role="listitem"]')[nextIndex];
        if (!currentScroller || !currentItem) return;
        const centeredLeft = currentItem.offsetLeft - (currentScroller.clientWidth - currentItem.offsetWidth) / 2;
        currentScroller.scrollTo({ left: Math.max(0, centeredLeft), behavior: 'smooth' });
      }));
    }, 4800);
    return () => window.clearInterval(timer);
  }, [expanded, isAutoplayPaused, isDragging]);

  function openSolution(solution: Solution, trigger?: HTMLButtonElement) {
    if (trigger) triggerRef.current = trigger;
    setIsClosing(false);
    setSelected(solution);
  }

  function expandSolution(solution: Solution, trigger: HTMLButtonElement) {
    const solutionIndex = siteCopy.solutions.cards.findIndex((item) => item.title === solution.title);
    setActiveCardIndex(solutionIndex);
    setExpanded(solution);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      const item = trigger.closest<HTMLElement>('[role="listitem"]');
      if (!scroller || !item) return;
      const centeredLeft = item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;
      scroller.scrollTo({ left: Math.max(0, centeredLeft), behavior: 'smooth' });
    }));
  }

  function handleClose() {
    setIsClosing(true);
  }

  function finishClose() {
    if (!isClosing) return;
    setSelected(null);
    setIsClosing(false);
    triggerRef.current?.focus();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    // Let touch and pen input use the browser's native inertial scroller.
    // The manual path is only needed for desktop mouse dragging.
    if (event.pointerType !== 'mouse') return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const scroller = event.currentTarget;
    dragRef.current = { startX: event.clientX, startScrollLeft: scroller.scrollLeft };
    didDragRef.current = false;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || (event.buttons & 1) !== 1) return;
    const scroller = event.currentTarget;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 5) {
      didDragRef.current = true;
      scroller.style.scrollSnapType = 'none';
      if (!scroller.hasPointerCapture(event.pointerId)) scroller.setPointerCapture(event.pointerId);
      setIsDragging(true);
      event.preventDefault();
    }
    if (didDragRef.current) scroller.scrollLeft = dragRef.current.startScrollLeft - distance;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (didDragRef.current && scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    if (didDragRef.current) {
      if (scroller) scroller.style.scrollSnapType = 'x mandatory';
      setIsDragging(false);
    }
  }

  function scrollByCard(direction: number) {
    const scroller = scrollerRef.current;
    const firstCard = scroller?.querySelector<HTMLElement>('[role="listitem"]');
    if (!scroller || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 16;
    scroller.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: 'smooth' });
  }

  function updateActiveCardFromScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const items = Array.from(scroller.querySelectorAll<HTMLElement>('[role="listitem"]'));
    if (items.length === 0) return;
    const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    const nextIndex = items.reduce((closestIndex, item, index) => {
      const closestItem = items[closestIndex];
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const closestCenter = closestItem.offsetLeft + closestItem.offsetWidth / 2;
      return Math.abs(itemCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter) ? index : closestIndex;
    }, 0);
    setActiveCardIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
  }

  function goToSolution(index: number) {
    const solution = siteCopy.solutions.cards[index];
    const scroller = scrollerRef.current;
    const item = scroller?.querySelectorAll<HTMLElement>('[role="listitem"]')[index];
    if (!solution || !scroller || !item) return;
    setActiveCardIndex(index);
    setExpanded(solution);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const currentScroller = scrollerRef.current;
      const currentItem = currentScroller?.querySelectorAll<HTMLElement>('[role="listitem"]')[index];
      if (!currentScroller || !currentItem) return;
      const centeredLeft = currentItem.offsetLeft - (currentScroller.clientWidth - currentItem.offsetWidth) / 2;
      currentScroller.scrollTo({ left: Math.max(0, centeredLeft), behavior: 'smooth' });
    }));
  }

  const selectedIndex = selected ? siteCopy.solutions.cards.findIndex((solution) => solution.title === selected.title) : -1;

  function navigateModal(direction: number) {
    const nextIndex = selectedIndex + direction;
    const nextSolution = siteCopy.solutions.cards[nextIndex];
    if (!nextSolution) return;
    setIsClosing(false);
    setSelected(nextSolution);
  }

  return (
    <section className={styles.section} id="solucoes" aria-labelledby="solutions-title">
      <RevealBlock className={styles.header}>
        <p className={styles.eyebrow}>{siteCopy.solutions.eyebrow}</p>
        <RevealTitle id="solutions-title">{siteCopy.solutions.title}</RevealTitle>
        <p className={styles.description}>{siteCopy.solutions.description}</p>
      </RevealBlock>

      <RevealBlock className={styles.scrollerShell} delay={100}>
        <div
          ref={scrollerRef}
          className={`${styles.scroller} ${isDragging ? styles.isDragging : ''}`}
          role="list"
          aria-label="Soluções Vivacemare"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onScroll={updateActiveCardFromScroll}
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onFocusCapture={() => setIsAutoplayPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsAutoplayPaused(false);
          }}
        >
          {siteCopy.solutions.cards.map((solution, index) => (
            <RevealBlock role="listitem" className={`${styles.cardItem} ${expanded?.title === solution.title ? styles.cardItemExpanded : ''}`} delay={index * 80} key={solution.title}>
              {expanded?.title === solution.title ? (
                <article className={`${styles.expandedCard} ${solution.title === 'Investimentos' ? styles.investmentExpanded : ''}`} aria-labelledby={`solution-inline-title-${solution.title}`}>
                  <div className={styles.expandedMedia}>
                    <Image src={assetPath(solution.image)} alt="" fill sizes="(max-width: 800px) 78vw, 320px" quality={100} className={styles.modalImage} />
                  </div>
                  <div className={styles.expandedContent}>
                    <div className={styles.inlinePanelHeader}>
                      <div>
                        <h3 id={`solution-inline-title-${solution.title}`}>{solution.title}</h3>
                      </div>
                      <button type="button" className={styles.inlineClose} onClick={() => setExpanded(null)} aria-label={`Fechar detalhes de ${solution.title}`}>×</button>
                    </div>
                    <p>{solution.modalDescription}</p>
                    <strong>Soluções disponíveis:</strong>
                    <ul>{solution.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    <div className={styles.inlineActions}>
                      <a className={styles.modalCta} href={whatsappHref(solution.title.toLowerCase())}>Falar com um assessor<span aria-hidden="true">→</span></a>
                    </div>
                  </div>
                </article>
              ) : (
                <button
                  type="button"
                  className={styles.card}
                  aria-expanded={false}
                  onClick={(event) => {
                    if (didDragRef.current) {
                      event.preventDefault();
                      didDragRef.current = false;
                      return;
                    }
                    expandSolution(solution, event.currentTarget);
                  }}
                >
                  <Image src={assetPath(solution.image)} alt="" fill sizes="(max-width: 800px) 78vw, 335px" quality={100} className={styles.cardImage} />
                  <span className={styles.cardOverlay} aria-hidden="true" />
                  <span className={styles.cardContent}>
                    <span className={styles.cardTitle}>{solution.title}</span>
                    <span className={styles.cardDescription}>{solution.description}</span>
                    <span className={styles.cardCta}>{solution.button}<span aria-hidden="true">→</span></span>
                  </span>
                </button>
              )}
            </RevealBlock>
          ))}
        </div>
      </RevealBlock>

      <RevealBlock className={styles.controls} aria-label="Navegação das soluções" delay={260}>
        {siteCopy.solutions.cards.map((solution, index) => (
          <button
            key={solution.title}
            type="button"
            className={`${styles.controlIndicator} ${activeCardIndex === index ? styles.activeIndicator : ''}`}
            aria-label={`Ir para ${solution.title}`}
            aria-current={activeCardIndex === index ? 'true' : undefined}
            onClick={() => goToSolution(index)}
          />
        ))}
      </RevealBlock>

      {selected && (
        <div className={`${styles.modalLayer} ${isClosing ? styles.modalLayerClosing : ''}`} onClick={handleClose}>
          <div
            className={`${styles.modal} ${isClosing ? styles.modalClosing : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="solution-modal-title"
            onClick={(event) => event.stopPropagation()}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) finishClose();
            }}
          >
            <button ref={closeButtonRef} type="button" className={styles.closeButton} onClick={handleClose} aria-label="Fechar detalhes">
              ×
            </button>
            <div className={styles.modalMedia}>
              <Image src={assetPath(selected.image)} alt="" fill sizes="(max-width: 760px) 100vw, 280px" quality={100} className={styles.modalImage} />
            </div>
            <div className={styles.modalContent}>
              <h3 id="solution-modal-title">{selected.title}</h3>
              <p>{selected.modalDescription}</p>
              <strong>Soluções disponíveis:</strong>
              <ul>
                {selected.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className={styles.modalActions}>
                <a className={styles.modalCta} href={whatsappHref(selected.title.toLowerCase())}>Falar com um assessor<span aria-hidden="true">→</span></a>
                <div className={styles.modalNavigation} aria-label="Navegar entre soluções">
                  <button type="button" onClick={() => navigateModal(-1)} disabled={selectedIndex <= 0} aria-label="Solução anterior">←</button>
                  <button type="button" onClick={() => navigateModal(1)} disabled={selectedIndex >= siteCopy.solutions.cards.length - 1} aria-label="Próxima solução">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <VehicleFinancePopup />
    </section>
  );
}
