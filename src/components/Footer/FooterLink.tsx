'use client';

import Link from 'next/link';
import { FooterLink as FooterLinkType } from '@/constants/footer';

interface FooterLinkProps {
  link: FooterLinkType;
}

export function FooterLink({ link }: FooterLinkProps) {
  const linkClasses =
    'text-[var(--text-muted)] font-bold transition-colors duration-300 hover:text-black';

  // Links externos abrem em nova aba
  const externalProps = link.external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  return (
    <Link href={link.href} className={linkClasses} {...externalProps}>
      {link.label}
    </Link>
  );
}
