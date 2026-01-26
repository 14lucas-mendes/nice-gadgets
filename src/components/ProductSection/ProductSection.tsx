import { Suspense } from 'react';
import CardSlicer from '@/components/CardSlicer';
import { CardSlicerSkeleton } from '@/components/CardSlicer/CardSlicerSkeleton';
import type { Product } from '@/types/product-temp';

interface ProductSectionProps {
  title: string;
  getProducts: () => Promise<Product[]>;
  className?: string;
}

async function ProductSectionContent({
  title,
  getProducts,
}: Omit<ProductSectionProps, 'className'>) {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return null; // Não renderiza seção vazia
  }

  return <CardSlicer products={products} title={title} />;
}

export function ProductSection({ title, getProducts, className = '' }: ProductSectionProps) {
  return (
    <section
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 ${className}`}
      aria-label={title}
    >
      <Suspense fallback={<CardSlicerSkeleton title={title} />}>
        <ProductSectionContent title={title} getProducts={getProducts} />
      </Suspense>
    </section>
  );
}
