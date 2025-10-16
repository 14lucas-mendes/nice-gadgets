import Card from "@/components/Card";
import { HeadingCard } from "@/components/HeadingCard";
import ItemSelect from "@/components/Select";
import { getAllAccessoriesProducts } from "@/utils/products";
import Link from "next/link";

export default async function AccessoriesPage() {
    
   const products = await getAllAccessoriesProducts()

    return (
        <div className="max-w-6xl mx-auto py-14">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#B4BDC3]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <h3 className="font-semibold text-[12px] text-[#B4BDC3]">Accessories</h3>
                </div>
            </div>
            <div className="mt-6">
                <HeadingCard as="h1">Accessories</HeadingCard>
                <p className="font-semibold text-[14px] text-[#89939A] mt-2">95 Models</p>
            </div>
            <div className="flex items-center gap-4 mt-6">
                <div className="w-[136px] h-[40px]">
                   <ItemSelect />
                </div>
                <div className="w-[136px] h-[40px]">
                   <ItemSelect />
                </div>
            </div>
            <div className="grid grid-cols-4 mt-6 gap-4 overflow-hidden">
               {products.map(product => (
                    <div key={product.id}>
                    <Card 
                       product={product}
                    />
                    </div>
                ))}
            </div>
        </div>
    );
}