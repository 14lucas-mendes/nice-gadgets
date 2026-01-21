'use client';

import NavLink from './NavLink';
import { NAVIGATION_ROUTES } from '@/constants/navigation';

interface DesktopNavProps {
  pathname: string;
}

export default function DesktopNav({ pathname }: DesktopNavProps) {
  return (
    <nav
      className="hidden sm:flex items-center gap-8 md:gap-12 w-full ml-4 md:ml-8 text-sm font-extrabold uppercase transition-all duration-300"
      aria-label="Main navigation"
    >
      {NAVIGATION_ROUTES.map((route) => (
        <NavLink
          key={route.href}
          route={route}
          pathname={pathname}
          className="hover:text-[var(--header-link-hover)]"
        />
      ))}
    </nav>
  );
}
