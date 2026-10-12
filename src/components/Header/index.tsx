'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import MenuButton from './MenuButton';
import HeaderActions from './HeaderActions';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isMenuOpen) {
      if (!previousFocusRef.current) {
        return;
      }

      const focusTarget = menuButtonRef.current ?? previousFocusRef.current;

      if (
        focusTarget &&
        document.contains(focusTarget) &&
        focusTarget.getClientRects().length > 0
      ) {
        focusTarget.focus();
      }

      previousFocusRef.current = null;
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    focusableElements?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) {
        return;
      }

      const elements = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((previous) => !previous);

  return (
    <header className="w-full h-12 flex items-center justify-between bg-[var(--header-bg)] border-b border-[var(--header-border)]">
      <div className="flex items-center sm:px-2 sm:py-4">
        <Link href="/" aria-label="Página inicial">
          <Image
            src="/img/icons/logo.svg"
            alt="Logo"
            width={120}
            height={120}
            className="sm:w-[150px] sm:h-[150px] md:hover:scale-110 transition-all duration-300 ease-in-out"
            priority
          />
        </Link>
      </div>

      <DesktopNav pathname={pathname} />

      {isMenuOpen ? (
        <MobileMenu
          pathName={pathname}
          onClose={closeMenu}
          menuRef={menuRef}
          closeButtonRef={menuButtonRef}
        />
      ) : (
        <div className="flex items-center px-4 py-4">
          <MenuButton
            isOpen={false}
            onClick={toggleMenu}
            buttonRef={menuButtonRef}
          />
        </div>
      )}

      <HeaderActions />
    </header>
  );
}
