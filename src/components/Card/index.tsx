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
    <div className="flex flex-col w-full max-w-full">
      <div className="w-full max-w-[272px] mx-auto bg-white rounded-lg border border-slate-400 shadow-md flex flex-col min-h-0">
        <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex flex-col gap-2 flex-grow">
          <div className="w-full aspect-square max-w-full flex items-center justify-center md:hover:scale-105 md:transition-transform md:duration-300 md:ease-in-out">
            <Image
              src={`/${image}`}
              alt={name}
              width={208}
              height={196}
              className="object-contain cursor-pointer w-full h-full"
              onClick={navigateToProduct}
              priority={false}
            />
          </div>
          <div className="w-full min-h-[58px] flex items-start">
            <p className="font-semibold text-xs sm:text-sm md:text-sm mt-2 sm:mt-3 md:mt-4 line-clamp-2 text-[#0F0F11]">{name}</p>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            <p className="font-extrabold text-lg sm:text-xl md:text-[22px] text-[#0F0F11]">{`R$${price}`}</p>
            <p className="font-medium text-lg sm:text-xl md:text-[22px] text-[#89939A] line-through">{`R$${fullPrice}`}</p>
          </div>
          <hr className="w-full" />
          <div className="font-semibold text-xs sm:text-sm md:text-sm text-[#89939A] mt-2">
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
          <div className="flex flex-row gap-2 font-bold text-xs sm:text-sm md:text-sm mt-4">
            <button
              onClick={handleToggleCart}
              className={`flex-1 min-w-0 h-9 sm:h-10 md:h-[40px] rounded-lg sm:rounded-[8px] cursor-pointer transition-colors ${
                inCart
                  ? 'bg-slate-200 text-blue-600 border border-blue-500'
                  : 'bg-blue-500 hover:bg-blue-700 text-white'
              }`}
            >
              {inCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`flex justify-center items-center rounded-full border w-9 h-9 sm:w-10 sm:h-10 cursor-pointer flex-shrink-0 ${
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
                className={`w-5 h-5 sm:w-6 sm:h-6 ${favorite ? 'text-red-500' : 'text-[#0F0F11]'}`}
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
