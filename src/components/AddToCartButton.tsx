'use client';

import { useCartFavorite } from '@/context/CartFavoriteContext';

import { Heart } from 'lucide-react';


type AddCardButtonProps = {
  productId: string;
}

export default function AddToCartButton({ productId }: AddCardButtonProps) {
    const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();

    const handleToggleCart = () => {
        if (isInCart(productId)) {
            removeFromCart(productId);
        } else {
            addToCart(productId);
        }
    }

    const handleToggleFavorite = () => {
        toggleFavorite(productId);
    }

    return (
        <div className="flex flex-row gap-4 w-full items-center mt-4">
        <button 
        onClick={handleToggleCart}
        className={`flex justify-center items-center w-[263px] h-[48px] rounded-[8px]
        font-bold text-[14px] cursor-pointer transition-colors ${
            isInCart(productId)
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}
        >
        {isInCart(productId) ? 'Added' : 'Add to Cart'}
        </button>
        <button 
        onClick={handleToggleFavorite}
        className={`flex justify-center items-center rounded-full border w-10 h-10 ${
            isFavorite(productId) 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-400'
        }`}
        >
            {isFavorite(productId) ? (
                <Heart className="text-red-500" />
            ) : (
                <Heart />
            )}
          </button>
        </div>
    )
}