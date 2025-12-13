'use client';

import { Product } from '@/types/Product';
import { useRef, useState } from 'react';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';


type CardSliceProps = {
  products: Product[];
  title: string;
  noPadding?: boolean;
};

export default function CardSlicer({ products, title, noPadding = false }: CardSliceProps) {
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
    <div className={`w-full max-w-full overflow-hidden sm:px-12 md:max-w-6xl md:mx-auto ${noPadding ? '' : 'px-4'}`}>
      
      {/* Header com Título e Botões de Navegação (Desktop) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F0F11]'>{title}</h2>
        <div className="hidden lg:flex gap-2 text-[#B4BDC3]">
          <button className="cursor-pointer hover:text-[#0F0F11] transition-colors" onClick={() => handlePrevCard()}>
            <CircleChevronLeft className='w-8 h-8' />
          </button>
          <button className="cursor-pointer hover:text-[#0F0F11] transition-colors" onClick={() => handleNextCard()}>
            <CircleChevronRight className='w-8 h-8' />
          </button>
        </div>
      </div>

      {/* Área dos Cards */}
      <div className={`w-full max-w-full overflow-hidden ${noPadding ? 'sm:overflow-visible' : 'px-0 sm:px-0'}`}>
        <div
          ref={cardContainerRef}
          // gap-4 (16px) aplicado em todos os breakpoints para espaçamento consistente
          className="flex flex-row mt-4 sm:mt-6 gap-4 sm:gap-12 md:gap-14 lg:gap-19 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              // Larguras calculadas considerando gap-4 (16px) em todos os breakpoints
              // Mobile: 70vw, sm: 2 cards (50% - 8px cada), md: 3 cards, lg: 4 cards, xl: 5 cards
              className="flex-shrink-0 sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-16px)/3)] lg:w-[calc((100%-16px)/4)] xl:w-[calc((100%-16px)/5)] snap-center sm:snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
