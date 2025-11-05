type CardProps = {
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
  }


export default function ProductInfo({ product }: { product: CardProps | null }) {
    return (
        <div className="w-full mt-8">
            <div className="flex flex-row justify-between items-center">
                <p className="font-semibold text-[12px] text-[#89939A]">Screen: </p>
                <p className="font-bold text-[12px] text-[#0F0F11]">{product?.screen}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className="font-semibold text-[12px] text-[#89939A]">Resolution: </p>
                <p className="font-bold text-[12px] text-[#0F0F11]">{product?.resolution}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className="font-semibold text-[12px] text-[#89939A]">Processor: </p>
                <p className="font-bold text-[12px] text-[#0F0F11]">{product?.processor}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className="font-semibold text-[12px] text-[#89939A]">RAM: </p>
                <p className="font-bold text-[12px] text-[#0F0F11]">{product?.ram}</p>
            </div>
        </div>
    )
}