'use client';

import { NAVIGATION_ROUTES } from '@/constants/navigation';
import NavLink from './NavLink';
import ThemeToggle from '../ThemeToggle';
import { CartBadge, FavoriteBadge } from '../Badges';

interface MobileMenuProps {
  pathName: string;
  onClose: () => void;
  setMenuOpen: (open: boolean) => void;
}

export default function MobileMenu({ pathName, onClose, setMenuOpen }: MobileMenuProps) {
  return (
    <div className="fixed top-12 left-0 w-full h-[calc(100vh-3rem)] bg-[var(--header-bg)] sm:hidden z-50 overflow-y-auto">
      <div className="flex flex-col h-full justify-between">
        {/* Navigation Links */}
        <nav
          className="flex flex-col pt-8 gap-4 items-center text-sm font-extrabold uppercase"
          aria-label="Mobile navigation"
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

        {/*Footer Actions*/}
        <div className="flex justify-center border-t-2 border-[var(--header-border)]">
          <div className="w-full min-h-[64px] items-center justify-center flex border-r-2 border-[var(--header-border)]">
            <ThemeToggle />
          </div>
          <div className="w-full min-h-[64px] items-center justify-center flex border-r-2 border-[var(--header-border)]">
            <FavoriteBadge onNavigate={() => setMenuOpen(false)} />
          </div>
          <div className="w-full min-h-[64px] items-center justify-center flex">
            <CartBadge onNavigate={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
