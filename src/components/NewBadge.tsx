import { getTopYearProducts } from '@/utils/products';
import CardSlicer from "./CardSlicer";

export default async function NewBadge() {
  const products = await getTopYearProducts();

  return (
    <div className='py-14 sm:py-16 md:py-20'>
      <CardSlicer products={products} title={'Brand new Models'} />
    </div>
  );
}
