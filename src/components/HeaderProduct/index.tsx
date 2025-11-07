import Link from "next/link";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

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

export default function HeaderProduct({ product }: {product: CategoryItemProps }) {
    return (
        <div className="w-full mx-auto flex flex-col py-6">
            <div className="flex flex-row gap-2">
                <Link href="/">
                    <HomeOutlinedIcon />
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#B4BDC3]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <h3 className="font-semibold text-[14px] text-[#89939A]">{product?.category}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#B4BDC3]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <h3 className="font-semibold text-[12px] text-[#89939A]">{product?.name}</h3>
            </div>
            
            <div className="flex flex-row items-center mt-10">
            <Link href={"/phones"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}stroke="currentColor"     className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </Link>
            <div>
                <Link href={'/phones'}>
                    <h3 className="font-semibold text-[14px] text-[#89939A] hover:text-slate-800 transition-colors">Back</h3>
                </Link>
            </div>
        </div>
        </div>
    )
}