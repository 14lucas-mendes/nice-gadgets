import ColorSelector from './ColorSelector';
import StorageSelector from './StorageSelector';
import ProductPrice from './ProductPrice';
import ProductActionButtons from './ProductActionButtons';
import ProductInfo from './ProductInfo';
import type { ProductDetail } from '@/types/product-details';

interface ProductActionsProps {
  product: ProductDetail;
  productId: string;
}

export function ProductActions({ product, productId }: ProductActionsProps) {
  return (
    <aside className="w-full flex flex-col">
      <ColorSelector product={product} />
      <StorageSelector product={product} />
      <ProductPrice product={product} />
      <ProductActionButtons productId={productId} />
      <ProductInfo product={product} />
    </aside>
  );
}
