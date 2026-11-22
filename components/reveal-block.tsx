'use client';

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

type RevealBlockProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
};

export function RevealBlock({ children, className = '', delay = 0, style, ...props }: RevealBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    observer.observe(block);
    return () => observer.disconnect();
  }, []);

  const revealStyle = { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties;
  return <div ref={blockRef} className={`revealBlock ${isVisible ? 'revealBlockVisible' : ''} ${className}`.trim()} style={revealStyle} {...props}>{children}</div>;
}
