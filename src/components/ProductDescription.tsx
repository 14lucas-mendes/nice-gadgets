type CardItemProps = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export default function ProductDescription({ product }: { product: CardItemProps }) {
  return (
    <div className="w-full h-full">
      <p className="text-lg sm:text-xl md:text-[22px] font-extrabold">About</p>
      <div className="mt-6 sm:mt-8 md:mt-12">
        {product.description.map((item, index) => (
          <div key={index}>
            <p className="pb-3 sm:pb-4 font-bold text-base sm:text-lg md:text-[20px]">{item.title}</p>
            <p className="pb-6 sm:pb-8 font-medium text-xs sm:text-sm md:text-[14px] text-[var(--text-muted)]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
