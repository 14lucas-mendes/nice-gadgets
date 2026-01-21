'use client';

import { FOOTER_LINKS } from '@/constants/footer';
import FooterLogo from './FooterLogo';
import { FooterLink } from './FooterLink';
import ScrollToTopButton from './ScrollToTopButton';

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] w-full border-t border-[var(--header-border)] md:h-24">
      <div className="flex flex-col items-start justify-center w-full gap-4 px-6 py-6 sm:px-8 sm:py-0 sm:flex-row sm:items-center sm:justify-between h-full">
        {/* Logo */}
        <FooterLogo />

        {/* Navigation Links */}
        <nav
          className="text-sm sm:text-base md:text-lg flex flex-col items-start justify-center gap-4 sm:flex-row sm:items-center sm:gap-6"
          aria-label="Links do rodapé"
        >
          {FOOTER_LINKS.map((link) => (
            <FooterLink key={link.href} link={link} />
          ))}
        </nav>

        {/* Scroll to Top Button */}
        <div className="flex w-full items-center justify-center flex-shrink-0 sm:w-auto">
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}
