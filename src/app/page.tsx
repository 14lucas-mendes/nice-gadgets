import CarouselSlider from '@/components/Carousel/index';
import CategoryMenu from '@/components/CategoryMenu';
import { CategoryMenuSkeleton } from '@/components/CategoryMenu/CategoryMenuSkeleton';
import { Suspense } from 'react';
import { NewProducts } from '@/components/ProductSection/NewProducts';
import { HotPrices } from '@/components/ProductSection/HotPrices';

export default async function Home() {
  return (
    <div>
      <CarouselSlider />
      <NewProducts />
      <Suspense fallback={<CategoryMenuSkeleton />}>
        <CategoryMenu />
      </Suspense>
      <HotPrices />
    </div>
  );
}
