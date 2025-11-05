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

export default function StorageOptions({ product }: { product: CardProps | null }) {
    return (
        <div>
            <p>Select Capacity</p>
            <div>
                {product?.capacityAvailable.map(capacity => (
                    <div key={capacity}>
                        <Link 
                        href={'/'}
                        className="w-14 h-8 text-[14px] font-medium"
                        >
                            {capacity}
                        </Link>
                    </div>
                ))}
                </div>
        </div>
    )
}