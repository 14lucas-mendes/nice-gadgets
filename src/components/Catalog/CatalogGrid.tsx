import type { Product } from '@/types/product-temp';
import ProductCard from '@/components/ProductCard';

interface CatalogGridProps {
  products: Product[];
}

export function CatalogGrid({ products }: CatalogGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-lg text-[var(--text-muted)]">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {products.map((product, index) => (
        <ProductCard key={product.itemId} product={product} variant="grid" priority={index < 4} />
      ))}
    </div>
  );
}
