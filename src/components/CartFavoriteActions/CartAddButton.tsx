'use client';

import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ActionSize = 'compact' | 'large';

interface CartAddButtonProps {
  isInCart: boolean;
  onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ActionSize;
}

const sizeClasses: Record<ActionSize, string> = {
  compact: 'h-10 flex-1 text-sm',
  large: 'h-12 sm:h-14 flex-1 text-sm sm:text-base',
};

export function CartAddButton({
  isInCart,
  onAdd,
  size = 'compact',
}: CartAddButtonProps) {
  return (
    <Button
      type="button"
      onClick={(event) => {
        if (!isInCart) {
          onAdd(event);
        }
      }}
      aria-label={isInCart ? 'Produto já adicionado ao carrinho' : 'Adicionar ao carrinho'}
      aria-disabled={isInCart}
      className={`font-bold transition-all ${sizeClasses[size]} ${
        isInCart
          ? 'border border-orange-500 bg-white text-orange-500 hover:bg-orange-50 dark:border-purple-500 dark:bg-transparent dark:text-purple-500'
          : 'bg-orange-500 text-white hover:bg-orange-600 dark:bg-purple-500 dark:hover:bg-purple-600'
      }`}
    >
      {isInCart ? (
        <>
          <Check className="w-4 h-4" />
          <span>Adicionado</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          <span>Adicionar ao carrinho</span>
        </>
      )}
    </Button>
  );
}
