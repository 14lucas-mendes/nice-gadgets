import { getTopPriceProducts } from '@/lib/product-queries';
import CardSlicer from './CardSlicer';

export default async function HotPriceTag() {
  const products = await getTopPriceProducts();

  return (
    <div className="w-full max-w-6xl mx-auto pb-16">
      <CardSlicer products={products} title={'Hot prices'} />
    </div>
  );
}
