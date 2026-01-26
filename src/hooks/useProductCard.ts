'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { formatProductUrl } from '@/lib/formatters';
import type { Product } from '@/types/product';

export function useProductCard(product: Product) {
  const router = useRouter();
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();

  const navigateToProduct = useCallback(() => {
    router.push(formatProductUrl(product.category, product.itemId));
  }, [router, product.category, product.itemId]);

  const handleToggleCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isInCart(product.itemId)) {
        removeFromCart(product.itemId);
      } else {
        addToCart(product.itemId);
      }
    },
    [product.itemId, isInCart, addToCart, removeFromCart],
  );

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(product.itemId);
    },
    [product.itemId, toggleFavorite],
  );

  return {
    navigateToProduct,
    handleToggleCart,
    handleToggleFavorite,
    isInCart: isInCart(product.itemId),
    isFavorite: isFavorite(product.itemId),
  };
}
