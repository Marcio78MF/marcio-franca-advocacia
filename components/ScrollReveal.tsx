'use client';
import { useEffect, useRef, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  threshold?: number;
};

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const dirClass = direction === 'up' ? 'reveal' : direction === 'left' ? 'reveal-left' : 'reveal-right';
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : '';

  return (
    <div ref={ref} className={`${dirClass} ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
