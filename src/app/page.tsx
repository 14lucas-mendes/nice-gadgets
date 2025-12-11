import CardHotPrice from "@/components/CardHotPrice";
import CardNewModels from "@/components/CardNewModels";
import CarouselSlider from "@/components/carousel";
import ShopyCategory from "@/components/ShopyCategory";

export default async function Home() {
  return (
    <div>
      <CarouselSlider />
      <CardNewModels />
      <ShopyCategory />
      <CardHotPrice />
    </div>
     
  );
}
