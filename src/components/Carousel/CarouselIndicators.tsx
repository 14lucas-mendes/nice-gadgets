'use client';

import type { CarouselApi } from '@/components/ui/carousel';

interface CarouselIndicatorsProps {
  count: number;
  current: number;
  api?: CarouselApi;
}

export function CarouselIndicators({ count, current, api }: CarouselIndicatorsProps) {
  if (count <= 1) return null;

  return (
    <div
      className="flex justify-center gap-2 mt-4"
      role="tablist"
      aria-label="Navegação do carrossel"
    >
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === current;

        return (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              isActive ? 'bg-[#0F0F11] h-2 w-6' : 'bg-gray-300 h-2 w-2 hover:bg-gray-400 hover:w-3'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            aria-current={isActive}
            role="tab"
            aria-selected={isActive}
          />
        );
      })}
    </div>
  );
}
