'use client';

import { CartAddButton } from '@/components/CartFavoriteActions/CartAddButton';
import { FavoriteToggleButton } from '@/components/CartFavoriteActions/FavoriteToggleButton';
import { useCartFavorite } from '@/context/CartFavoriteContext';

interface ProductActionButtonsProps {
  productId: string;
}

export default function ProductActionButtons({ productId }: ProductActionButtonsProps) {
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();
  const inCart = isInCart(productId);
  const favorite = isFavorite(productId);

  return (
    <div className="flex flex-row gap-2 sm:gap-3 w-full items-center mt-4 sm:mt-6">
      <CartAddButton
        isInCart={inCart}
        onAdd={() => addToCart(productId)}
        size="large"
      />
      <FavoriteToggleButton
        isFavorite={favorite}
        onToggle={() => toggleFavorite(productId)}
        size="large"
      />
    </div>
  );
}
