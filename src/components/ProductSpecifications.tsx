type CardSpecsProps = {
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


export default function ProductSpecifications({product}: {product: CardSpecsProps}) {
    return (
        <div className="w-full h-full flex flex-col gap-2 mt-20">
            <p className="font-bold text-[22px]">Tech Specs</p>
            <div className="flex justify-between mt-10">
                <span className="font-medium text-[14px] text-[#89939A]">Screen</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.screen}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-[14px] text-[#89939A]">Resolution</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.resolution}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-[14px] text-[#89939A]">Processor</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.processor}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-[14px] text-[#89939A]">RAM</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.ram}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-[14px] text-[#89939A]">Built in memory</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.capacity}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-[14px] text-[#89939A]">Camera</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.camera}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-[14px] text-[#89939A]">Zoom</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.zoom}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-[14px] text-[#89939A]">Cell</span>
                <span className="font-semibold text-[14px] text-[#0F0F11]">{product.cell.join(', ')}</span>
            </div>
        </div>
    )
}