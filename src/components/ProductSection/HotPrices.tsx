import { getTopPriceProducts } from '@/lib/product-queries';
import { ProductSection } from './ProductSection';

export function HotPrices() {
  return <ProductSection title="Hot Prices" getProducts={getTopPriceProducts} />;
}
