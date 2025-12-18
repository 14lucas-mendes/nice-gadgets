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
    <div className="max-w-[560px] w-full h-full mt-20">
      <p className="text-[22px] font-extrabold">About</p>
      <div className="mt-12">
        {product.description.map((item, index) => (
          <div key={index}>
            <p className="pb-4 font-bold text-[20px]">{item.title}</p>
            <p className="pb-8 font-medium text-[14px] text-[var(--text-muted)]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
