'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealTitleProps = {
  children: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
  id?: string;
};

export function RevealTitle({ children, as = 'h2', className = '', id }: RevealTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  const titleClassName = `${className} blurUpTitle ${isVisible ? 'blurUpTitleVisible' : ''}`.trim();
  const Tag = as;
  return <Tag ref={titleRef} id={id} className={titleClassName}>{children}</Tag>;
}
