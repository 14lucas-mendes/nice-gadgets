'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProductImage } from './ProductImage';
import { ProductTitle } from './ProductTitle';
import { ProductPrice } from './ProductPrice';
import { ProductSpecs } from './ProductSpecs';
import { AddToCartButton } from './AddToCartButton';
import { FavoriteButton } from './FavoriteButton';
import { useProductCard } from '@/hooks/useProductCard';
import type { Product, ProductCardVariant } from '@/types/product';

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

  const { navigateToProduct, handleToggleCart, handleToggleFavorite, isInCart, isFavorite } =
    useProductCard(product);

  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  const cardClasses = `
    flex flex-col w-full h-full 
    border border-slate-200 dark:border-gray-800
    shadow-md hover:shadow-xl 
    transition-all duration-300
    overflow-hidden 
    bg-white dark:bg-gray-900
    ${variant === 'compact' ? 'max-w-xs' : ''}
  `;

  return (
    <Card className={cardClasses}>
      <CardContent className="flex flex-col flex-grow p-4 gap-2 justify-between">
        {/* Imagem e Título */}
        <div className="flex flex-col gap-4">
          <ProductImage src={image} alt={name} onClick={navigateToProduct} priority={priority} />
          <ProductTitle name={name} onClick={navigateToProduct} />
        </div>

        {/* Preço e Specs */}
        <div className="flex flex-col gap-3 mt-2">
          <ProductPrice price={price} fullPrice={fullPrice} />
          <ProductSpecs specs={specs} />
        </div>
      </CardContent>

      {/* Footer com Ações */}
      <CardFooter className="p-4 pt-0 flex flex-row gap-2 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <AddToCartButton isInCart={isInCart} onToggle={handleToggleCart} />
        <FavoriteButton isFavorite={isFavorite} onToggle={handleToggleFavorite} />
      </CardFooter>
    </Card>
  );
}
