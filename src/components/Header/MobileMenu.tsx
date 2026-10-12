'use client';

import { NAVIGATION_ROUTES } from '@/constants/navigation';
import type { RefObject } from 'react';
import NavLink from './NavLink';
import MenuButton from './MenuButton';
import ThemeToggle from '../ThemeToggle';
import { CartBadge, FavoriteBadge } from '../Badges';

interface MobileMenuProps {
  pathName: string;
  onClose: () => void;
  menuRef?: RefObject<HTMLDivElement | null>;
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
}

export default function MobileMenu({
  pathName,
  onClose,
  menuRef,
  closeButtonRef,
}: MobileMenuProps) {
  return (
    <div
      ref={menuRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      className="fixed top-12 left-0 z-50 h-[calc(100vh-3rem)] w-full overflow-y-auto bg-[var(--header-bg)] sm:hidden"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex justify-end border-b border-[var(--header-border)] px-4 py-2">
          <MenuButton
            isOpen
            onClick={onClose}
            buttonRef={closeButtonRef}
          />
        </div>

        <nav
          className="flex flex-1 flex-col items-center gap-4 pt-8 text-sm font-extrabold uppercase"
          aria-label="Navegação móvel"
        >
          {NAVIGATION_ROUTES.map((route) => (
            <NavLink
              key={route.href}
              route={route}
              pathname={pathName}
              onClick={onClose}
              className="justify-center"
            />
          ))}
        </nav>

        <div className="flex justify-center border-t-2 border-[var(--header-border)]">
          <div className="flex min-h-[64px] w-full items-center justify-center border-r-2 border-[var(--header-border)]">
            <ThemeToggle />
          </div>
          <div className="flex min-h-[64px] w-full items-center justify-center border-r-2 border-[var(--header-border)]">
            <FavoriteBadge onNavigate={onClose} />
          </div>
          <div className="flex min-h-[64px] w-full items-center justify-center">
            <CartBadge onNavigate={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
