'use client';

import { useCartFavorite } from '@/context/CartFavoriteContext';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface ProductActionButtonsProps {
  productId: string;
}

export default function ProductActionButtons({ productId }: ProductActionButtonsProps) {
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();
  const [isAnimating, setIsAnimating] = useState(false);

  const inCart = isInCart(productId);
  const favorite = isFavorite(productId);

  const handleToggleCart = () => {
    setIsAnimating(true);
    if (inCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(productId);
  };

  return (
    <div className="flex flex-row gap-2 sm:gap-3 w-full items-center mt-4 sm:mt-6">
      {/* Add to Cart Button */}
      <button
        onClick={handleToggleCart}
        className={`
          flex justify-center items-center gap-2
          flex-1 h-12 sm:h-14 rounded-lg
          font-bold text-sm sm:text-base
          transition-all duration-200
          ${isAnimating ? 'scale-95' : 'scale-100'}
          ${
            inCart
              ? 'bg-white dark:bg-gray-800 border-2 border-orange-500 dark:border-purple-500 text-orange-500 dark:text-purple-500 hover:bg-orange-50 dark:hover:bg-purple-950'
              : 'bg-orange-500 dark:bg-purple-500 hover:bg-orange-600 dark:hover:bg-purple-600 text-white shadow-lg hover:shadow-xl'
          }
        `}
        aria-label={inCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
      >
        {inCart ? (
          <>
            <Check className="w-5 h-5" />
            <span>Added to cart</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>Add to cart</span>
          </>
        )}
      </button>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className={`
          flex justify-center items-center 
          rounded-full border-2
          w-12 h-12 sm:w-14 sm:h-14 
          flex-shrink-0
          transition-all duration-200
          hover:scale-110
          ${
            favorite
              ? 'border-red-500 bg-red-50 dark:bg-red-950 text-red-500'
              : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-300 dark:hover:border-red-700'
          }
        `}
        aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${favorite ? 'fill-current' : ''}`}
        />
      </button>
    </div>
  );
}
