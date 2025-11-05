import Link from "next/link";

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

export default async function CardDetails({ product }:{product: CardProps | null}) {

    return (
        <div className="flex flex-col justify-start items-start w-full">
            <p>Select Capacity</p>
            <div className="flex flex-row gap-2 justify-center items-center mt-2">
              {product?.capacityAvailable.map(item => (
                <Link 
                className="flex w-14 h-8 border rounded-lg text-[14px] font-medium items-center justify-center
                md:hover:bg-black md:hover:text-white
                "
                key={item}
                href={'/'}>
                    {item}
                </Link>
              ))}
            </div>
            <hr className="w-full my-6 border-gray-400" />
        </div>
    )
}