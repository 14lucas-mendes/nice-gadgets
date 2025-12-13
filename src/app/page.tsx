import HotPriceTag from "@/components/CardHotPrice";
import NewBadge from "@/components/CardNewModels";
import CarouselSlider from "@/components/Carousel";
import CategoryMenu from "@/components/ShopyCategory";

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
