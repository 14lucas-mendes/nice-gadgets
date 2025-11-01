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



export default function CardProductId({ product } : {product: CardProps | null}) {
    return (
        <div className="flex flex-col gap-4">
            {product?.colorsAvailable.map(color => (
                <div key={product.id}
                className="flex text-2xl text-center justify-center"
                >
                    <Link href={'/'}
                    className="w-8 h-8 bg-cyan-600 border rounded-full"
                    >
                        {color}
                    </Link>
                </div>
            ))}
        </div>
    )
}