'use client';

import Link from 'next/link';
import { Route } from '@/constants/navigation';

interface NavLinkProps {
  route: Route;
  pathname: string;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({ route, pathname, onClick, className = '' }: NavLinkProps) {
  const isActive = route.isActive(pathname);

  const baseClass = 'min-h-[44px] flex items-center transition-colors duration-200';
  const activeClass = isActive
    ? 'text-[var(--header-text-active)] border-b-2 border-black'
    : 'text-[var(--header-text)] hover:border-b-2 hover:border-black hover:text-[var(--header-text-active)]';

  return (
    <Link
      href={route.href}
      onClick={onClick}
      className={`${baseClass} ${activeClass} ${className}`}
    >
      {route.label}
    </Link>
  );
}
