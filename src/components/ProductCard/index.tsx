'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CartAddButton } from '@/components/CartFavoriteActions/CartAddButton';
import { FavoriteToggleButton } from '@/components/CartFavoriteActions/FavoriteToggleButton';
import { ProductImage } from './ProductImage';
import { ProductTitle } from './ProductTitle';
import { ProductPrice } from './ProductPrice';
import { ProductSpecs } from './ProductSpecs';
import { useProductCard } from '@/hooks/useProductCard';
import type { Product, ProductCardVariant } from '@/types/product-temp';

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  priority?: boolean;
}

export default function ProductCard({
  product,
  variant = 'default',
  priority = false,
}: ProductCardProps) {
  const { image, name, price, fullPrice, screen, capacity, ram } = product;

  const { navigateToProduct, handleAddToCart, handleToggleFavorite, isInCart, isFavorite } =
    useProductCard(product);

  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  const cardClasses = [
    'flex flex-col w-full h-full',
    'border border-slate-200 dark:border-gray-800',
    'shadow-md hover:shadow-xl',
    'transition-all duration-300 overflow-hidden',
    'bg-white dark:bg-gray-900',
    variant === 'compact' ? 'max-w-xs' : '',
  ].join(' ');

  return (
    <Card className={cardClasses}>
      <CardContent className="flex flex-col flex-grow p-4 gap-2 justify-between">
        <div className="flex flex-col gap-4">
          <ProductImage src={image} alt={name} onClick={navigateToProduct} priority={priority} />
          <ProductTitle name={name} onClick={navigateToProduct} />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <ProductPrice price={price} fullPrice={fullPrice} />
          <ProductSpecs specs={specs} />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-row gap-2 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <CartAddButton isInCart={isInCart} onAdd={handleAddToCart} />
        <FavoriteToggleButton isFavorite={isFavorite} onToggle={handleToggleFavorite} />
      </CardFooter>
    </Card>
  );
}
