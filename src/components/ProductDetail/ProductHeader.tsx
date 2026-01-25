import PageHeader from '@/components/PageHeader';
import type { ProductDetail } from '@/types/product-details';
import { capitalize } from '@/lib/catalog-utils';

interface ProductHeaderProps {
  product: ProductDetail;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div className="w-full flex flex-col py-4 sm:py-6">
      <PageHeader page={capitalize(product.category)} title={product.name} description="" />
    </div>
  );
}
