'use client';

import type { MouseEventHandler, ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  eventName: string;
  eventParams?: Record<string, string>;
};

export default function TrackedLink({
  href,
  children,
  className,
  target,
  rel,
  eventName,
  eventParams = {},
}: Props) {
  const onClick: MouseEventHandler<HTMLAnchorElement> = () => {
    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', eventName, eventParams);
  };

  return (
    <a href={href} className={className} target={target} rel={rel} onClick={onClick}>
      {children}
    </a>
  );
}
