'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void; // ✅ Agora aceita evento
  disabled?: boolean;
}

export function FavoriteButton({ isFavorite, onToggle, disabled = false }: FavoriteButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsAnimating(true);
    onToggle(e); // ✅ Passa o evento
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-full w-10 h-10 border transition-all ${
        isFavorite
          ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-950'
          : 'border-gray-300 hover:border-gray-500'
      } ${isAnimating ? 'scale-110' : 'scale-100'}`}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        className={`w-5 h-5 transition-all ${
          isFavorite ? 'fill-current text-red-500' : 'text-[var(--text-primary)]'
        }`}
      />
    </Button>
  );
}
