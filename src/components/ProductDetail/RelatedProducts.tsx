import { getNewestProducts } from '@/lib/product-queries';
import CardSlicer from '@/components/CardSlicer';

export async function RelatedProducts() {
  const products = await getNewestProducts();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl">
      <CardSlicer products={products} title="You may also like" />
    </section>
  );
}
