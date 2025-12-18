'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react'; // Ícone padrão usado com shadcn

// Componentes do Shadcn
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
};

export default function ProductCard({ product }: CardProps) {
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
    <Card className="flex flex-col w-[212px] h-[439px] sm:w-[237px] sm:h-[512px] md:w-[272px] md:h-[506px] border-slate-400 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Área Principal do Card (Imagem + Info) */}
      <CardContent className="flex flex-col flex-grow p-4 sm:p-6 lg:p-4 gap-2">
        {/* Imagem */}
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

        {/* Título */}
        <div className="w-full flex items-start mt-2 sm:mt-3 lg:mt-2">
          <p className="font-semibold text-[14px] line-clamp-2 text-[var(--text-primary)]">
            {name}
          </p>
        </div>

        {/* Preços */}
        <div className="flex flex-row gap-2 flex-wrap items-baseline">
          <p className="font-extrabold text-base sm:text-lg md:text-xl lg:text-base text-[var(--text-primary)]">
            {`R$${price}`}
          </p>
          <p className="font-medium text-xs sm:text-sm text-[var(--text-muted)] line-through">
            {`R$${fullPrice}`}
          </p>
        </div>

        {/* Especificações */}
        <div className="flex flex-col gap-1 font-semibold text-xs sm:text-sm lg:text-xs text-[var(--text-muted)]">
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

      {/* Footer com Botões */}
      <CardFooter className="p-4 pt-0 sm:px-6 sm:pb-6 lg:px-4 lg:pb-4 flex gap-2">
        {/* Botão Adicionar ao Carrinho */}
        <Button
          onClick={handleToggleCart}
          className={`flex-1 h-10 md:h-12 lg:h-10 font-bold text-xs sm:text-sm lg:text-xs transition-colors ${
            inCart
              ? 'bg-slate-200 text-blue-600 border border-blue-500 hover:bg-slate-300'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </Button>

        {/* Botão Favoritar */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleFavorite}
          className={`rounded-full w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 border flex-shrink-0 ${
            favorite
              ? 'border-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600'
              : 'border-gray-400 hover:border-gray-500'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 transition-colors ${
              favorite ? 'fill-current text-red-500' : 'text-[var(--text-primary)]'
            }`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
