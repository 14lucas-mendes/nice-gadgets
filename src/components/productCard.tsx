'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

type CardProps = {
  product: {
    image: string;
    name: string;
    price: number;
    fullPrice: number;
    screen: string;
    capacity: string;
    ram: string;
    itemId: string;
    category: string;
  };
  variant?: 'default' | 'grid';
};

export default function ProductCard({ product, variant = 'default' }: CardProps) {
  const { image, category, itemId, name, price, fullPrice, screen, capacity, ram } = product;
  const router = useRouter();
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateToProduct = () => {
    router.push(`/products/${category}/${itemId}`);
  };

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart(itemId)) {
      removeFromCart(itemId);
    } else {
      addToCart(itemId);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(itemId);
  };

  const inCart = mounted ? isInCart(itemId) : false;
  const favorite = mounted ? isFavorite(itemId) : false;

  const cardClasses =
    variant === 'grid'
      ? 'flex flex-col w-full h-full min-h-[520px] border-slate-400 shadow-md hover:shadow-lg transition-shadow overflow-hidden'
      : 'flex flex-col w-[212px] sm:w-[237px] md:w-[272px] h-[520px] sm:h-[508px] md:h-[508px] border-slate-400 shadow-md hover:shadow-lg transition-shadow overflow-hidden';

  return (
    <Card className={cardClasses}>
      <CardContent className="flex flex-col flex-grow p-4 sm:p-6 md:p-3 gap-2 sm:gap-3 md:gap-2 overflow-hidden">
        <div className="relative w-full h-32 sm:h-40 md:h-32 flex items-center justify-center lg:hover:scale-105 lg:transition-transform lg:duration-300 lg:ease-in-out flex-shrink-0">
          <Image
            src={`/${image}`}
            alt={name}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, (max-width: 1280px) 25vw, 20vw"
            className="object-contain cursor-pointer"
            onClick={navigateToProduct}
            priority={false}
          />
        </div>

        <div className="w-full flex items-start flex-shrink-0">
          <p className="font-semibold text-[14px] line-clamp-2 text-[var(--text-primary)]">
            {name}
          </p>
        </div>

        <div className="flex flex-row gap-2 flex-wrap items-baseline flex-shrink-0">
          <p className="font-extrabold text-base sm:text-lg md:text-lg text-[var(--text-primary)]">
            {`R$${price}`}
          </p>
          <p className="font-medium text-xs sm:text-sm text-[var(--text-muted)] line-through">
            {`R$${fullPrice}`}
          </p>
        </div>

        <div className="flex flex-col gap-2 font-semibold text-xs sm:text-sm text-[var(--text-muted)] flex-shrink-0">
          <div className="flex flex-row justify-between">
            <span>Screen</span>
            <span className="font-bold text-[var(--text-primary)]">{screen}</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Capacity</span>
            <span className="font-bold text-[var(--text-primary)]">{capacity}</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>RAM</span>
            <span className="font-bold text-[var(--text-primary)]">{ram}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 sm:px-6 sm:pb-4 md:px-4 md:pb-4 flex flex-row gap-2 flex-shrink-0 border-t border-gray-200">
        <Button
          onClick={handleToggleCart}
          className={`flex-1 h-10 sm:h-10 md:h-10 font-bold text-sm transition-colors cursor-pointer ${
            inCart
              ? 'bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 dark:bg-gray-800 dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-50'
              : 'bg-orange-500 hover:bg-orange-600 dark:bg-purple-500 dark:hover:bg-purple-600 text-white'
          }`}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleFavorite}
          className={`rounded-full w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 border flex-shrink-0 cursor-pointer transition-colors${
            favorite
              ? 'border-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600'
              : 'border-gray-400 hover:border-gray-500'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 sm:w-5 sm:h-5 md:w-5 md:h-5 transition-colors ${
              favorite ? 'fill-current text-red-500' : 'text-[var(--text-primary)]'
            }`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
