'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useIsMobile } from './useMediaQuery';

interface UseCarouselNavigationOptions {
  totalItems: number;
  autoScroll?: boolean;
  autoScrollDelay?: number;
}

export function useCarouselNavigation({
  totalItems,
  autoScroll = false,
  autoScrollDelay = 5000,
}: UseCarouselNavigationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Navega para um índice específico
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current) return;

      const targetCard = containerRef.current.children[index] as HTMLElement;
      if (!targetCard) return;

      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: isMobile ? 'center' : 'start',
        block: 'nearest',
      });

      setCurrentIndex(index);
    },
    [isMobile],
  );

  // Próximo item (com loop)
  const goToNext = useCallback(() => {
    if (totalItems === 0) return;
    const nextIndex = (currentIndex + 1) % totalItems;
    scrollToIndex(nextIndex);
  }, [currentIndex, totalItems, scrollToIndex]);

  // Item anterior (com loop)
  const goToPrevious = useCallback(() => {
    if (totalItems === 0) return;
    const prevIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  }, [currentIndex, totalItems, scrollToIndex]);

  // Vai para índice específico
  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalItems) {
        scrollToIndex(index);
      }
    },
    [totalItems, scrollToIndex],
  );

  // Auto scroll (opcional)
  useEffect(() => {
    if (!autoScroll || totalItems === 0) return;

    const interval = setInterval(goToNext, autoScrollDelay);
    return () => clearInterval(interval);
  }, [autoScroll, autoScrollDelay, goToNext, totalItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  return {
    currentIndex,
    containerRef,
    goToNext,
    goToPrevious,
    goToIndex,
    canGoNext: totalItems > 0,
    canGoPrevious: totalItems > 0,
  };
}
