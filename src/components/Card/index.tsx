'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { useState, useEffect } from 'react';

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
};

export default function Card({ product }: CardProps) {
  const { image, category, itemId, name, price, fullPrice, screen, capacity, ram } = product;
  const router = useRouter();
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();

  // Estado para evitar hydration mismatch
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

  // Valores que dependem do context só aparecem após montar
  const inCart = mounted ? isInCart(itemId) : false;
  const favorite = mounted ? isFavorite(itemId) : false;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-full bg-white rounded-lg border border-slate-400 shadow-md flex flex-col">
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-4 lg:py-4 flex flex-col gap-2 flex-grow">
          <div className="relative w-full aspect-square flex items-center justify-center lg:hover:scale-105 lg:transition-transform lg:duration-300 lg:ease-in-out">
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
          <div className="w-full flex items-start">
            <p className="font-semibold text-xs sm:text-sm lg:text-xs mt-2 sm:mt-3 lg:mt-2 line-clamp-2 text-[#0F0F11]">{name}</p>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            <p className="font-extrabold text-base sm:text-lg md:text-xl lg:text-base text-[#0F0F11]">{`R$${price}`}</p>
            <p className="font-medium text-base sm:text-lg md:text-xl lg:text-base text-[#89939A] line-through">{`R$${fullPrice}`}</p>
          </div>
          <hr className="w-full" />
          <div className="font-semibold text-xs sm:text-sm lg:text-xs text-[#89939A] mt-2">
            <div className="flex flex-row justify-between">
              <p>Screen</p>
              <p className="font-bold text-[#0F0F11]">{screen}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>Capacity</p>
              <p className="font-bold text-[#0F0F11]">{capacity}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>RAM</p>
              <p className="font-bold text-[#0F0F11]">{ram}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 font-bold text-xs sm:text-sm lg:text-xs mt-4">
            <button
              onClick={handleToggleCart}
              className={`flex-1 min-w-0 h-10 md:h-12 lg:h-10 rounded-lg cursor-pointer transition-colors ${
                inCart
                  ? 'bg-slate-200 text-blue-600 border border-blue-500'
                  : 'bg-blue-500 hover:bg-blue-700 text-white'
              }`}
            >
              {inCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`flex justify-center items-center rounded-full border w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 cursor-pointer flex-shrink-0 ${
                favorite ? 'border-red-500 bg-red-50' : 'border-gray-400'
              }`}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={favorite ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 ${favorite ? 'text-red-500' : 'text-[#0F0F11]'}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
