import CarouselSlider from '@/components/Carousel_TEMP';
import CategoryMenu from '@/components/CategoryMenu';
import HotPriceTag from '@/components/HotPriceTag';
import NewBadge from '@/components/NewBadge';

export default async function Home() {
  return (
    <div>
      <CarouselSlider />
      <NewBadge />
      <CategoryMenu />
      <HotPriceTag />
    </div>
  );
}
