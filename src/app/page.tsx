import CarouselSlider from '@/components/Carousel/index';
import CategoryMenu from '@/components/CategoryMenu';
import HotPriceTag from '@/components/HotPriceTag';
import NewBadge from '@/components/NewBadge';
import { CategoryMenuSkeleton } from '@/components/CategoryMenu/CategoryMenuSkeleton';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div>
      <CarouselSlider />
      <NewBadge />
      <Suspense fallback={<CategoryMenuSkeleton />}>
        <CategoryMenu />
      </Suspense>
      <HotPriceTag />
    </div>
  );
}
