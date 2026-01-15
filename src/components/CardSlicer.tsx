'use client';

import { Product } from '@/types/Product';
import { useRef, useState } from 'react';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

type CardSliceProps = {
  products: Product[];
  title: string;
  noPadding?: boolean;
  layout?: 'carousel' | 'grid';
};

export default function CardSlicer({
  products,
  title,
  noPadding = false,
  layout = 'carousel',
}: CardSliceProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleNextCard = () => {
    if (!products || products.length === 0) return;

    const nextCardIndex = currentCard === products.length - 1 ? 0 : currentCard + 1;

    if (cardContainerRef.current) {
      const targetCard = cardContainerRef.current.children[nextCardIndex] as HTMLElement;

      if (targetCard) {
        const isMobile = window.innerWidth < 640;
        targetCard.scrollIntoView({
          behavior: 'smooth',
          inline: isMobile ? 'center' : 'start',
          block: 'nearest',
        });
      }
    }

    setCurrentCard(nextCardIndex);
  };

  const handlePrevCard = () => {
    if (!products || products.length === 0) return;

    const prevCardIndex = currentCard === 0 ? products.length - 1 : currentCard - 1;

    if (cardContainerRef.current) {
      const targetCard = cardContainerRef.current.children[prevCardIndex] as HTMLElement;

      if (targetCard) {
        const isMobile = window.innerWidth < 640;
        targetCard.scrollIntoView({
          behavior: 'smooth',
          inline: isMobile ? 'center' : 'start',
          block: 'nearest',
        });
      }
    }

    setCurrentCard(prevCardIndex);
  };

  return (
    <div
      className={`w-full max-w-full overflow-hidden ${noPadding ? 'p-0' : 'px-4 sm:px-12 md:max-w-6xl md:mx-auto'}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0F0F11]">
          {title}
        </h2>
        <div className="hidden lg:flex gap-2 text-[#B4BDC3]">
          <button
            className="cursor-pointer hover:text-[#0F0F11] transition-colors"
            onClick={() => handlePrevCard()}
          >
            <CircleChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="cursor-pointer hover:text-[#0F0F11] transition-colors"
            onClick={() => handleNextCard()}
          >
            <CircleChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      ) : (
        <div
          className={`w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide ${noPadding ? '' : '-mx-4 sm:mx-0'}`}
        >
          <div
            ref={cardContainerRef}
            className={`flex flex-row mt-4 sm:mt-6 gap-3 sm:gap-12 md:gap-14 lg:gap-18 ${noPadding ? '' : 'px-4 sm:px-0'}`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-16px)/3)] lg:w-[calc((100%-16px)/4)] xl:w-[calc((100%-16px)/5)] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
