'use client';

import { type Product } from '@/types/product-temp';
import ProductCard from '@/components/ProductCard';
import { useCarouselNavigation } from '@/hooks/useCarouselNavigation';
import { NavigationButtons } from './NavigationButtons';
import { CarouselIndicators } from './CarouselIndicators';
import { CarouselView } from './CarouselView';
import { GridView } from './GridView';

export type CardSlicerLayout = 'carousel' | 'grid';

interface CardSlicerProps {
  products: Product[];
  title: string;
  noPadding?: boolean;
  layout?: CardSlicerLayout;
  autoScroll?: boolean;
  autoScrollDelay?: number;
}

export default function CardSlicer({
  products,
  title,
  noPadding = false,
  layout = 'carousel',
  autoScroll = false,
  autoScrollDelay = 5000,
}: CardSlicerProps) {
  const { currentIndex, containerRef, goToNext, goToPrevious, goToIndex } = useCarouselNavigation({
    totalItems: products.length,
    autoScroll: layout === 'carousel' && autoScroll,
    autoScrollDelay,
  });

  // Validação de produtos
  if (!products || products.length === 0) {
    return (
      <div className={`w-full ${noPadding ? 'p-0' : 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'}`}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F0F11] dark:text-white mb-6">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Nenhum produto disponível no momento.
        </p>
      </div>
    );
  }

  const containerClasses = `w-full max-w-full ${
    noPadding ? 'p-0' : 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
  }`;

  return (
    <section className={containerClasses}>
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F0F11] dark:text-white">
          {title}
        </h2>

        {layout === 'carousel' && <NavigationButtons onPrevious={goToPrevious} onNext={goToNext} />}
      </div>

      {/* Content */}
      {layout === 'grid' ? (
        <GridView>
          {products.map((product, index) => (
            <div key={product.itemId} role="listitem">
              <ProductCard product={product} variant="grid" priority={index < 4} />
            </div>
          ))}
        </GridView>
      ) : (
        <>
          <CarouselView containerRef={containerRef} noPadding={noPadding}>
            {products.map((product, index) => (
              <div
                key={product.itemId}
                className="flex-shrink-0 w-[260px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-center sm:snap-start"
              >
                <ProductCard product={product} priority={index < 4} />
              </div>
            ))}
          </CarouselView>

          {/* Indicators - Mobile only */}
          <CarouselIndicators total={products.length} current={currentIndex} onSelect={goToIndex} />
        </>
      )}
    </section>
  );
}
