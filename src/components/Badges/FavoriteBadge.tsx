'use client';

import { Heart } from 'lucide-react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { IconBadge } from './IconBadge';

interface FavoriteBadgeProps {
  onNavigate?: () => void;
}

export function FavoriteBadge({ onNavigate }: FavoriteBadgeProps) {
  const { favoriteCount } = useCartFavorite();

  return (
    <IconBadge
      icon={Heart}
      count={favoriteCount}
      href="/favorite" // ✅ Corrigido para plural
      ariaLabel="Lista de favoritos"
      variant="favorite"
      onNavigate={onNavigate}
    />
  );
}
