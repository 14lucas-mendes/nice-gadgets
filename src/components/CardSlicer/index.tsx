'use client';

import { Product } from '@/types/Product';
import { useRef, useState } from 'react';
import { CircleChevronLeft } from 'lucide-react';
import { CircleChevronRight } from 'lucide-react';
import ProductCard from '../productCard';

type CardSliceProps = {
  products: Product[];
  title: string;
  noPadding?: boolean;
};

export default function CardSlicer({ products, title, noPadding = false }: CardSliceProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const handleNextCard = () => {
    if (!products || products.length === 0) return;

    const nextCardIndex = currentCard === products.length - 1 ? 0 : currentCard + 1;

    if (cardContainerRef.current) {
      const targetCard = cardContainerRef.current.children[nextCardIndex] as HTMLElement;

      if (targetCard) {
        // No mobile, centraliza o card; no desktop, alinha ao início
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
        // No mobile, centraliza o card; no desktop, alinha ao início
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

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevenir scroll vertical acidental durante swipe horizontal
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.current);
    const deltaY = Math.abs(touch.clientY - touchStartY.current);

    // Se o movimento for mais horizontal que vertical, prevenir scroll da página
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = Math.abs(touch.clientY - touchStartY.current);

    // Reset touch start
    touchStartX.current = null;
    touchStartY.current = null;

    // Verificar se o movimento foi mais horizontal que vertical
    if (Math.abs(deltaX) < deltaY) return;

    // Verificar threshold mínimo
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    // Determinar direção do swipe
    if (deltaX > 0) {
      // Swipe Right -> Previous
      handlePrevCard();
    } else {
      // Swipe Left -> Next
      handleNextCard();
    }
  };

  return (
    <div className={`w-full max-w-full overflow-hidden sm:px-12 md:max-w-6xl md:mx-auto mt-14 ${noPadding ? '' : 'px-4'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F0F11]'>{title}</h2>
        <div className="hidden lg:flex gap-2 text-[#B4BDC3]">
          <button className="cursor-pointer" onClick={() => handlePrevCard()}>
            <CircleChevronLeft className='w-8 h-8' />
          </button>
          <button className="cursor-pointer" onClick={() => handleNextCard()}>
            <CircleChevronRight className='w-8 h-8' />
          </button>
        </div>
      </div>
      <div className={`w-full max-w-full overflow-hidden ${noPadding ? 'sm:overflow-visible' : 'px-0 sm:px-0'}`}>
        <div
          ref={cardContainerRef}
          className="flex flex-row mt-4 sm:mt-6 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[70vw] sm:w-[calc(50%-10px)] md:w-[calc(33.33%-12px)] lg:w-[23%] xl:w-[22%] snap-center sm:snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
