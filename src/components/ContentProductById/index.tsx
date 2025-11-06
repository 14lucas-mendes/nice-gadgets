import Image from "next/image";

type CategoryItemProps = {
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


export default function ContentProductById({ product }: { product: CategoryItemProps | null }) {
  return (
    <div className="w-full">
            <div className="flex flex-row mt-10 gap-2">
                <div className="flex flex-col gap-4">
                    {product?.images.map(img => (
                    <div key={img}>
                        <div className="w-20 h-20 border rounded-md relative">
                            <Image 
                            src={`/${img}`}
                            alt="Category Phones"
                            fill
                            className="object-contain absolute cursor-pointer"
                            />
                        </div>
                    </div>  
                ))}
                </div>
                <div className="w-[464px] h-[464px] border relative">
                    <Image
                    src='/img/layout/category-phones.png'
                    alt=""
                    fill
                    className="absolute object-contain"
                    />
                </div>
            </div>
    </div>
  )
}