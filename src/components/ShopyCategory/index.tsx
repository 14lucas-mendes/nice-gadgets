import Image from "next/image";
import { HeadingCard } from "../HeadingCard";
import Link from "next/link";

export default function ShopyCategory() {
    return (
    <div className="w-full max-w-6xl pb-20 mx-auto"> 
        
        <div className="mb-6">
            <HeadingCard as="h2">Sort By</HeadingCard>
        </div>

        <div className="
            grid 
            grid-cols-1       {/* Mobile-first: 1 coluna por padrão (abaixo de sm) */}
            gap-8             {/* Espaçamento em mobile */}
            sm:grid-cols-3    {/* A partir de 'sm' (640px), muda para 3 colunas */}
            sm:gap-4          {/* Espaçamento menor para 3 colunas (opcional, use o que preferir) */}
        ">
            
        <div className="w-full"> 
            <div>
                <div className="
                    w-full h-auto aspect-[16/9] min-h-[187px]
                sm:h-[187px]
                md:h-[368px]
                rounded-lg relative overflow-hidden">
                    <Link href="/phones">
                        <Image src="/img/layout/banners_phones.png" 
                            alt="category-phones" 
                            fill
                            className="object-cover md:hover:scale-110 md:transition-transform md:ease-in-out md:duration-300"
                        /> 
                    </Link>
                </div>
                <Link href="/phones">
                    <div className="flex flex-col mt-6">
                        <span className="font-bold text-[20px]" >Mobile Phones</span>
                        <span className="font-semibold text-[14px] text-[#89939A]">95 Phones</span>
                    </div>
                </Link>
                </div>
            </div>
            
            <div className="w-full">
                <div>
                    <div className="
                    w-full h-auto aspect-[16/9] min-h-[187px]
                    sm:h-[187px] 
                    md:h-[368px]
                    rounded-lg relative overflow-hidden">
                        <Link href="/accessories">
                            <Image src="/img/layout/banners_accessories.png" 
                                alt="category-accessories" 
                                fill
                                className="object-cover md:hover:scale-110 md:transition-transform md:ease-in-out md:duration-300"
                            />
                        </Link>
                    </div>
                    <Link href="/accessories">
                        <div className="flex flex-col mt-6">
                            <span className="font-bold text-[20px]">Accessories</span>
                            <span className="font-semibold text-[14px] text-[#89939A]">100 Models</span>
                        </div>
                    </Link>
                </div>
            </div>
            
            <div className="w-full">
                <div>
                    <div className="
                    w-full h-auto aspect-[16/9] min-h-[187px]
                    sm:h-[187px] 
                    md:h-[368px] 
                    rounded-lg relative overflow-hidden">
                        <Link href="/tablets">
                            <Image src="/img/layout/banners_tablets.png" 
                                alt="category-tablets" 
                                fill
                                className="object-cover md:hover:scale-110 md:transition-transform md:ease-in-out md:duration-300"
                            /> 
                        </Link>
                    </div>
                    <Link href="/tablets">
                        <div className="flex flex-col mt-6">
                            <span className="font-bold text-[20px]">Tablets</span>
                            <span className="font-semibold text-[14px] text-[#89939A]">24 Models</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)
}

           