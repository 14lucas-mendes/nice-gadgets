'use client';

import { Product } from '@/types/Product';
import { useRef, useState } from 'react';
import { HeadingCard } from '../HeadingCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '../Card';

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
    <div className={`w-full max-w-full overflow-hidden mx-auto ${noPadding ? '' : 'px-4 sm:px-6'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <HeadingCard as="h2">{title}</HeadingCard>
        <div className="hidden lg:flex gap-2">
          <button className="cursor-pointer" onClick={() => handlePrevCard()}>
            <ArrowBackIosIcon />
          </button>
          <button className="cursor-pointer" onClick={() => handleNextCard()}>
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      <div className={`w-full max-w-full overflow-hidden ${noPadding ? 'sm:overflow-visible' : '-mx-4 sm:-mx-6 px-4 sm:px-6'}`}>
        <div
          ref={cardContainerRef}
          className="flex flex-row mt-4 sm:mt-6 gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[70vw] sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-19.2px)] snap-center sm:snap-start"
            >
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
