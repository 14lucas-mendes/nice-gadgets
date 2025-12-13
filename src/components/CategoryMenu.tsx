import { getAllAccessoriesProducts, getAllPhonesProducts, getAllTabletsProducts } from "@/utils/products";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryMenu() {
    const phones = await getAllPhonesProducts();
    const accessories = await getAllAccessoriesProducts();
    const tablets = await getAllTabletsProducts();


    return (
    <div className="w-full max-w-full px-4 overflow-hidden sm:px-12 md:max-w-6xl md:mx-auto pb-14 sm:pb-16 md:pb-20"> 
        
        <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">Sort By Category</h1>
        </div>

        <div className="
            grid 
            grid-cols-1
            gap-6
            sm:grid-cols-3
            sm:gap-4
            md:gap-6
            lg:gap-8
        ">
            
        <div className="w-full"> 
            <div>
                <div className="
                    w-full 
                    h-[363px]
                    sm:h-auto 
                    sm:aspect-[16/9] 
                    sm:min-h-[187px]
                    md:min-h-[300px]
                    lg:min-h-[368px]
                    rounded-lg 
                    relative 
                    overflow-hidden
                ">
                    <Link href="/products/phones">
                        <Image src="/img/layout/banners_phones.png" 
                            alt="category-phones" 
                            fill
                            className="object-cover md:hover:scale-110 md:transition-transform md:ease-in-out md:duration-300"
                        /> 
                    </Link>
                </div>
                <Link href="/products/phones">
                    <div className="flex flex-col mt-4 sm:mt-5 md:mt-6">
                        <span className="font-bold text-base sm:text-lg md:text-xl" >Mobile Phones</span>
                        <span className="font-semibold text-xs sm:text-sm md:text-sm text-[#89939A]">{`${phones.length} models`}</span>
                    </div>
                </Link>
                </div>
            </div>
            
            <div className="w-full">
                <div>
                    <div className="
                    w-full 
                    h-[363px]
                    sm:h-auto 
                    sm:aspect-[16/9] 
                    sm:min-h-[187px]
                    md:min-h-[300px]
                    lg:min-h-[368px]
                    rounded-lg 
                    relative 
                    overflow-hidden
                    ">
                        <Link href="/products/accessories">
                            <Image src="/img/layout/banners_accessories.png" 
                                alt="category-accessories" 
                                fill
                                className="object-cover md:hover:scale-110 md:transition-transform md:ease-in-out md:duration-300"
                            />
                        </Link>
                    </div>
                    <Link href="/products/accessories">
                        <div className="flex flex-col mt-4 sm:mt-5 md:mt-6">
                            <span className="font-bold text-base sm:text-lg md:text-xl">Accessories</span>
                            <span className="font-semibold text-xs sm:text-sm md:text-sm text-[#89939A]">{`${accessories.length} models`}</span>
                        </div>
                    </Link>
                </div>
            </div>
            
            <div className="w-full">
                <div>
                    <div className="
                    w-full 
                    h-[363px]
                    sm:h-auto 
                    sm:aspect-[16/9] 
                    sm:min-h-[187px]
                    md:min-h-[300px]
                    lg:min-h-[368px]
                    rounded-lg 
                    relative 
                    overflow-hidden
                    ">
                        <Link href="/products/tablets">
                            <Image src="/img/layout/banners_tablets.png" 
                                alt="category-tablets" 
                                fill
                                className="object-cover md:hover:scale-110 md:transition-transform md:ease-in-out md:duration-300"
                            /> 
                        </Link>
                    </div>
                    <Link href="/products/tablets">
                        <div className="flex flex-col mt-4 sm:mt-5 md:mt-6">
                            <span className="font-bold text-base sm:text-lg md:text-xl">Tablets</span>
                            <span className="font-semibold text-xs sm:text-sm md:text-sm text-[#89939A]">{`${tablets.length} models`}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)
}