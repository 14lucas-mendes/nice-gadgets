import { getTop10Products } from '@/utils/products';
import CardSlicer from './CardSlicer';

export default async function HotPriceTag() {
  const products = await getTop10Products();

  return (
    <div className="w-full max-w-6xl mx-auto pb-16">
      <CardSlicer products={products} title={'Hot prices'} />
    </div>
  );
}
