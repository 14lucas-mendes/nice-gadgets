'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Check } from 'lucide-react';

interface AddToCartButtonProps {
  isInCart: boolean;
  onToggle: (e: React.MouseEvent) => void; // ✅ Agora aceita evento
  disabled?: boolean;
}

export function AddToCartButton({ isInCart, onToggle, disabled = false }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    setIsLoading(true);
    onToggle(e); // ✅ Passa o evento
    // Simula delay para feedback visual
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`flex-1 h-10 font-bold text-sm transition-all ${
        isInCart
          ? 'bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 dark:bg-transparent dark:border-purple-500 dark:text-purple-500'
          : 'bg-orange-500 hover:bg-orange-600 dark:bg-purple-500 dark:hover:bg-purple-600 text-white'
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isInCart ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          Added
        </>
      ) : (
        'Add to cart'
      )}
    </Button>
  );
}
