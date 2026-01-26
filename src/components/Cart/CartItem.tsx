'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { formatCurrency } from '@/lib/formatters';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { Product } from '@/types/product';

interface CartItemProps {
  product: Product;
}

export function CartItem({ product }: CartItemProps) {
  const { cartItems, addToCart, removeFromCart, decrementCart } = useCartFavorite();
  const quantity = cartItems.get(product.itemId) || 0;
  const subtotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg mb-4 hover:shadow-md transition-shadow">
      {/* Image */}
      <Link
        href={`/products/${product.category}/${product.itemId}`}
        className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden group"
      >
        <Image
          src={`/${product.image}`}
          alt={product.name}
          fill
          className="object-contain p-2 transition-transform group-hover:scale-110"
          sizes="128px"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.category}/${product.itemId}`}
            className="font-bold text-base sm:text-lg text-[var(--text-primary)] hover:text-orange-500 dark:hover:text-purple-500 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {product.capacity} • {product.color}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrementCart(product.itemId)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-12 text-center font-semibold">{quantity}</span>

            <button
              onClick={() => addToCart(product.itemId)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price & Remove */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-lg text-[var(--text-primary)]">
                {formatCurrency(subtotal)}
              </p>
              {quantity > 1 && (
                <p className="text-xs text-[var(--text-muted)]">
                  {formatCurrency(product.price)} each
                </p>
              )}
            </div>

            <button
              onClick={() => removeFromCart(product.itemId)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded transition-colors"
              aria-label="Remover do carrinho"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
