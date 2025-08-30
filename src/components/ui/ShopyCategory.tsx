import Image from "next/image";

export default function ShopyCategory() {
    return (
        <div>
            <section className="ml-4 mt-14">
                <h1 className="font-extrabold text-[22px]">Shop by category</h1>
                <div className="flex flex-col">
                <div className=" bg-yellow-200 w-[288px] h-[288px] rounded-[8px] relative overflow-hidden mt-6">
                        <Image src="/img/layout/category-phones.png" 
                        alt="category-phones" 
                        width={400} height={400}
                        className="absolute object-cover top-10 left-10 scale-130"
                        />
                </div>
                <span>Mobile Phones</span>
                <span>95 Phones</span>
                </div>
                
                <div className="flex flex-col">
                <div className="w-[288px] h-[288px] relative bg-rose-900 mt-10 rounded-[8px] overflow-hidden">
                        <Image src="/img/layout/category-accessories.png" 
                        alt="category-accessories" 
                        width={400} height={400} 
                        className="absolute object-cover scale-185 bottom-12 left-36"
                        />
                </div>
                <span>Accessories</span>
                <span>100 Models</span>
                </div>
                
                <div className="flex flex-col">
                <div className="w-[288px] h-[288px] relative bg-gray-500 mt-10 rounded-[8px] overflow-hidden">
                        <Image src="/img/layout/category-tablets.png" 
                        alt="category-tablets" 
                        width={500} height={500} 
                        className="absolute object-cover scale-150 top-24 left-20"
                        />  
                </div>
                <span>Tablets</span>
                <span>24 Models</span>
                </div>
            </section>
        </div>
    )
}