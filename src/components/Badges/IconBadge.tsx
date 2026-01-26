'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  count: number;
  href: string;
  ariaLabel: string;
  variant?: 'default' | 'cart' | 'favorite';
  onNavigate?: () => void;
}

const VARIANT_STYLES = {
  default: {
    icon: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    iconActive: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    badge: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
  },
  cart: {
    icon: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    iconActive: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    badge: 'bg-orange-600 hover:bg-orange-700 dark:bg-purple-500 dark:hover:bg-purple-600',
  },
  favorite: {
    icon: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    iconActive:
      'fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600 dark:fill-red-400 dark:text-red-400 dark:hover:fill-red-500 dark:hover:text-red-500',
    badge: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
  },
} as const;

export function IconBadge({
  icon: Icon,
  count,
  href,
  ariaLabel,
  variant = 'default',
  onNavigate,
}: IconBadgeProps) {
  const styles = VARIANT_STYLES[variant];
  const hasItems = count > 0;

  // Ícone ativo apenas para favorites
  const iconClasses = variant === 'favorite' && hasItems ? styles.iconActive : styles.icon;

  // Badge adapta tamanho ao número
  const badgeSize =
    count >= 100 ? 'min-w-[24px] h-5 px-1' : count >= 10 ? 'min-w-[20px] h-5 px-0.5' : 'w-5 h-5';

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-transform hover:scale-110 active:scale-95"
      aria-label={`${ariaLabel}${hasItems ? ` (${count} ${count === 1 ? 'item' : 'items'})` : ''}`}
    >
      <div className="relative inline-flex">
        <Icon className={`w-6 h-6 transition-all duration-200 ${iconClasses}`} strokeWidth={1.5} />

        {hasItems && (
          <Badge
            className={`
              absolute -top-2 -right-2 
              ${badgeSize}
              flex items-center justify-center 
              rounded-full 
              text-[10px] font-bold
              ${styles.badge}
              pointer-events-none 
              ring-2 ring-white dark:ring-gray-900
              animate-in zoom-in duration-200
            `}
          >
            {count > 99 ? '99+' : count}
          </Badge>
        )}
      </div>
    </Link>
  );
}
