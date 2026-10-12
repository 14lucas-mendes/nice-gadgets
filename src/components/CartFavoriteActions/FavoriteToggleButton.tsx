'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ActionSize = 'compact' | 'large';

interface FavoriteToggleButtonProps {
  isFavorite: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ActionSize;
}

const sizeClasses: Record<ActionSize, string> = {
  compact: 'h-10 w-10',
  large: 'h-12 w-12 sm:h-14 sm:w-14',
};

export function FavoriteToggleButton({
  isFavorite,
  onToggle,
  size = 'compact',
}: FavoriteToggleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onToggle}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={isFavorite}
      className={`rounded-full border transition-all ${sizeClasses[size]} ${
        isFavorite
          ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-950'
          : 'border-gray-300 hover:border-gray-500'
      }`}
    >
      <Heart
        className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : 'text-[var(--text-primary)]'}`}
      />
    </Button>
  );
}
