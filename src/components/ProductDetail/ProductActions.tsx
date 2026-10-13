import ColorSelector from './ColorSelector';
import StorageSelector from './StorageSelector';
import ProductPrice from './ProductPrice';
import ProductActionButtons from './ProductActionButtons';
import ProductInfo from './ProductInfo';
import type { ProductDetail } from '@/types/product-details';

interface ProductActionsProps {
  product: ProductDetail;
  productId: string;
  availableColors: string[];
  availableCapacities: string[];
}

export function ProductActions({
  product,
  productId,
  availableColors,
  availableCapacities,
}: ProductActionsProps) {
  return (
    <aside className="w-full flex flex-col">
      <ColorSelector product={product} colors={availableColors} />
      <StorageSelector product={product} capacities={availableCapacities} />
      <ProductPrice product={product} />
      <ProductActionButtons productId={productId} />
      <ProductInfo product={product} />
    </aside>
  );
}
