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


export default function ProductPrice({ product }:{product: CardProps | null}) {
    return (
        <div className="flex flex-col w-full justify-start items-start">
            <div className="flex gap-2">
                <span className="font-extrabold text-[22px] text-[#0F0F11]">{`R$${product?.priceDiscount}`}</span>
                <span className="font-medium text-[22px] text-[#89939A] line-through">{`R$${product?.priceRegular}`}</span> 
            </div>
        </div>
    )
}