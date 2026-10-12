'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { formatProductUrl } from '@/lib/formatters';
import type { Product } from '@/types/product-temp';

export function useProductCard(product: Product) {
  const router = useRouter();
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();

  const navigateToProduct = useCallback(() => {
    router.push(formatProductUrl(product.category, product.itemId));
  }, [router, product.category, product.itemId]);

  const handleAddToCart = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      addToCart(product.itemId);
    },
    [product.itemId, addToCart],
  );

  const handleToggleFavorite = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      toggleFavorite(product.itemId);
    },
    [product.itemId, toggleFavorite],
  );

  return {
    navigateToProduct,
    handleAddToCart,
    handleToggleFavorite,
    isInCart: isInCart(product.itemId),
    isFavorite: isFavorite(product.itemId),
  };
}
