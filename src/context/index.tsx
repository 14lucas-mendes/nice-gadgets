'use client';

import Image from 'next/image';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { Product } from '@/types/Product';
import { CircleX } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';

type CardItemProps = {
  product: Product;
};

export default function CardItem({ product }: CardItemProps) {
  const { cartItems, addToCart, decrementFromCart, removeFromCart } = useCartFavorite();
  const quantity = cartItems.get(product.itemId) || 0;

  if (!product) {
    return null;
  }

  const handleIncrement = () => {
    addToCart(product.itemId);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      decrementFromCart(product.itemId);
    } else {
      removeFromCart(product.itemId);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.itemId);
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg mb-4">
      <div className="flex items-center gap-6">
        <button onClick={handleRemove} className="text-gray-400 hover:text-gray-600">
          <CircleX />
        </button>
        <div className="w-24 h-24 flex items-center justify-center">
          <Image
            src={`/${product.image}`}
            alt={product.name}
            width={66}
            height={66}
            className="object-contain"
          />
        </div>
        <p className="font-semibold text-sm text-[var(--text-primary)] w-64">{product.name}</p>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-gray-800 transition-colors"
            aria-label="Decrement item"
          >
            <Minus fontSize="small" />
          </button>
          <span className="font-bold text-lg">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-gray-800 transition-colors"
            aria-label="Increment item"
          >
            <Plus fontSize="small" />
          </button>
        </div>
        <p className="font-extrabold text-2xl text-[var(--text-primary)] w-24 text-right">
          {`R$${product.price * quantity}`}
        </p>
      </div>
    </div>
  );
}
