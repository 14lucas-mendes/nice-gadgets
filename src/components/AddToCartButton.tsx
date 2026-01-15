'use client';

import { useCartFavorite } from '@/context/CartFavoriteContext';

import { Heart } from 'lucide-react';

type AddCardButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddCardButtonProps) {
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();

  const handleToggleCart = () => {
    if (isInCart(productId)) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(productId);
  };

  return (
    <div className="flex flex-row gap-2 sm:gap-4 w-full items-center mt-4">
      <button
        onClick={handleToggleCart}
        className={`flex justify-center items-center flex-1 sm:w-[263px] h-10 sm:h-12 rounded-[8px]
        font-bold text-xs sm:text-sm md:text-[14px] cursor-pointer transition-colors ${
          isInCart(productId)
            ? 'bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 dark:bg-gray-800 dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-50'
            : 'bg-orange-500 hover:bg-orange-600 dark:bg-purple-500 dark:hover:bg-purple-600 text-white'
        }`}
      >
        {isInCart(productId) ? 'Added' : 'Add to Cart'}
      </button>
      <button
        onClick={handleToggleFavorite}
        className={`flex justify-center items-center rounded-full border w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${
          isFavorite(productId)
            ? 'border-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600'
            : 'border-gray-400 hover:border-gray-500'
        }`}
      >
        <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isFavorite(productId) ? 'text-red-500 fill-current' : ''}`} />
      </button>
    </div>
  );
}
