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
    scrollToCard(nextCardIndex);
    setCurrentCard(nextCardIndex);
  };

  const handlePrevCard = () => {
    if (!products || products.length === 0) return;
    const prevCardIndex = currentCard === 0 ? products.length - 1 : currentCard - 1;
    scrollToCard(prevCardIndex);
    setCurrentCard(prevCardIndex);
  };

  const scrollToCard = (index: number) => {
    if (cardContainerRef.current) {
      const targetCard = cardContainerRef.current.children[index] as HTMLElement;
      if (targetCard) {
        const isMobile = window.innerWidth < 640;
        targetCard.scrollIntoView({
          behavior: 'smooth',
          inline: isMobile ? 'center' : 'start',
          block: 'nearest',
        });
      }
    }
  };

  return (
    <div
      className={`w-full max-w-full ${noPadding ? 'p-0' : 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'}`}
    >
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F0F11] dark:text-white">
          {title}
        </h2>

        {layout === 'carousel' && (
          <div className="hidden lg:flex gap-2 text-[#B4BDC3]">
            <button
              className="cursor-pointer hover:text-[#0F0F11] dark:hover:text-white transition-colors"
              onClick={handlePrevCard}
              aria-label="Previous items"
            >
              <CircleChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="cursor-pointer hover:text-[#0F0F11] dark:hover:text-white transition-colors"
              onClick={handleNextCard}
              aria-label="Next items"
            >
              <CircleChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="w-full h-full">
              <ProductCard product={product} variant="grid" />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 ${noPadding ? '' : '-mx-4 sm:mx-0 px-4 sm:px-0'}`}
        >
          <div ref={cardContainerRef} className="flex flex-row gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[260px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-center sm:snap-start"
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
