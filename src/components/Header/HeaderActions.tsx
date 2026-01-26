'use client';

import { CartBadge, FavoriteBadge } from '../Badges';
import ThemeToggle from '../ThemeToggle';

export default function HeaderActions() {
  const actionClasses = 'h-full items-center justify-center flex w-16 lg:w-20 min-h-[44px]';
  const borderClasses = 'border-[var(--header-border)]';

  return (
    <div className="hidden sm:flex ml-auto">
      <div className={`${actionClasses} border-r-2 ${borderClasses}`}>
        <ThemeToggle />
      </div>
      <div className="flex gap-4">
        <FavoriteBadge />
        <CartBadge />
      </div>
    </div>
  );
}
