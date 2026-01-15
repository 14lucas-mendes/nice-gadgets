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

export default function ProductCard({ product }: CardProps) {
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
    'flex flex-col w-full h-full border-slate-400 shadow-md hover:shadow-lg transition-shadow overflow-hidden bg-white dark:bg-gray-900';

  return (
    <Card className={cardClasses}>
      <CardContent className="flex flex-col flex-grow p-4 gap-2 justify-between">
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square max-h-40 flex items-center justify-center lg:hover:scale-105 lg:transition-transform lg:duration-300 lg:ease-in-out">
            <Image
              src={`/${image}`}
              alt={name}
              fill
              className="object-contain cursor-pointer"
              onClick={navigateToProduct}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>

          <div className="w-full">
            <p
              className="font-semibold text-sm line-clamp-2 text-[var(--text-primary)] cursor-pointer hover:underline"
              onClick={navigateToProduct}
            >
              {name}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex flex-row gap-2 flex-wrap items-baseline">
            <p className="font-extrabold text-lg text-[var(--text-primary)]">{`R$${price}`}</p>
            <p className="font-medium text-sm text-[var(--text-muted)] line-through">
              {`R$${fullPrice}`}
            </p>
          </div>

          <div className="flex flex-col gap-1 font-semibold text-xs text-[var(--text-muted)] border-t pt-2 border-gray-100 dark:border-gray-800">
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
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-row gap-2 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <Button
          onClick={handleToggleCart}
          className={`flex-1 h-10 font-bold text-sm transition-colors ${
            inCart
              ? 'bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 dark:bg-transparent dark:border-purple-500 dark:text-purple-500'
              : 'bg-orange-500 hover:bg-orange-600 dark:bg-purple-500 dark:hover:bg-purple-600 text-white'
          }`}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleFavorite}
          className={`rounded-full w-10 h-10 border transition-colors ${
            favorite
              ? 'border-red-500 bg-red-50 text-red-600'
              : 'border-gray-300 hover:border-gray-500'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 ${
              favorite ? 'fill-current text-red-500' : 'text-[var(--text-primary)]'
            }`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
