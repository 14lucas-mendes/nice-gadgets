'use client';

import { type ReactNode } from 'react';

interface CarouselViewProps {
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>; // ✅ Aceita null
  noPadding?: boolean;
}

export function CarouselView({ children, containerRef, noPadding }: CarouselViewProps) {
  return (
    <div
      className={`w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 ${
        noPadding ? '' : '-mx-4 sm:mx-0 px-4 sm:px-0'
      }`}
      role="region"
      aria-label="Carousel de produtos"
    >
      <div ref={containerRef} className="flex flex-row gap-4 sm:gap-6">
        {children}
      </div>
    </div>
  );
}
