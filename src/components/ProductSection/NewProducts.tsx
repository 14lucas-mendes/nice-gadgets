import { getNewestProducts } from '@/lib/product-queries';
import { ProductSection } from './ProductSection';

export function NewProducts() {
  return <ProductSection title="Brand New Models" getProducts={getNewestProducts} />;
}
