'use client';

import { ShoppingBag } from 'lucide-react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { IconBadge } from './IconBadge';

interface CartBadgeProps {
  onNavigate?: () => void;
}

export function CartBadge({ onNavigate }: CartBadgeProps) {
  const { cartCount } = useCartFavorite();

  return (
    <IconBadge
      icon={ShoppingBag}
      count={cartCount}
      href="/cart"
      ariaLabel="Carrinho de compras"
      variant="cart"
      onNavigate={onNavigate}
    />
  );
}
