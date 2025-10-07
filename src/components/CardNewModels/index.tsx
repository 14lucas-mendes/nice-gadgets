import { Product } from "@/types/Product";
import Card from "../Card";
import { HeadingCard } from "../HeadingCard";



export default function CardNewModels({products}: {products: Product[]}) {

    return (
        <div className="w-full md:max-w-6xl py-14">
            <div className="flex justify-between items-center">
                <HeadingCard as="h2">Brand New Models</HeadingCard>
                <div className="flex gap-2">
                    <button className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"     className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1  18 0Z" />
                        </svg>
                    </button>
                    <button className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <Card products={products} />
            </div>
        </div>
    );
}