import Image from "next/image";
import { HeadingCard } from "../HeadingCard";

export default function ShopyCategory() {
    return (
        <div className="pb-14">
            <section className="w-full ">
                <HeadingCard as="h2">Shop by Category</HeadingCard>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="flex flex-col">
                <div className=" bg-yellow-200 w-[288px] h-[288px] rounded-[8px] relative overflow-hidden mt-10">
                        <Image src="/img/layout/category-phones.png" 
                        alt="category-phones" 
                        width={400} height={400}
                        className="absolute object-cover top-10 left-10 scale-130"
                        />
                </div>
                <div className="flex flex-col mt-6">
                    <span className="font-bold text-[20px]" >Mobile Phones</span>
                    <span className="font-semibold text-[14px] text-[#89939A]">95 Phones</span>
                </div>
                </div>
                
                <div className="flex flex-col">
                <div className="w-[288px] h-[288px] relative bg-rose-900 mt-10 rounded-[8px] overflow-hidden">
                        <Image src="/img/layout/category-accessories.png" 
                        alt="category-accessories" 
                        width={400} height={400} 
                        className="absolute object-cover scale-185 bottom-12 left-36"
                        />
                </div>
                <div className="flex flex-col mt-6">
                    <span className="font-bold text-[20px]">Accessories</span>
                    <span className="font-semibold text-[14px] text-[#89939A]">100 Models</span>
                </div>
                </div>
                
                <div className="flex flex-col">
                <div className="w-[288px] h-[288px] relative bg-gray-500 mt-10 rounded-[8px] overflow-hidden">
                        <Image src="/img/layout/category-tablets.png" 
                        alt="category-tablets" 
                        width={500} height={500} 
                        className="absolute object-cover scale-150 top-24 left-20"
                        />  
                </div>
                <div className="flex flex-col mt-6">
                    <span className="font-bold text-[20px]">Tablets</span>
                    <span className="font-semibold text-[14px] text-[#89939A]">24 Models</span>
                </div>
                </div>
                </div>
            </section>
        </div>
    )
}