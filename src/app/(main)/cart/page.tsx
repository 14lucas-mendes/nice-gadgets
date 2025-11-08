import { HeadingCard } from "@/components/HeadingCard";
import Image from "next/image";

export default function Cart() {
    return (
        <div className="max-w-6xl mx-auto w-full mt-10 h-screen">
            <div className="flex flex-col gap-4 py-8">
                <HeadingCard as='h1'>Cart</HeadingCard>
                <p>You cart is empyt</p>
            </div>
            <div className="flex justify-center items-center">
                <Image
                src='/img/layout/cart-is-empty.png'
                alt=""
                width={500}
                height={500}
                className="py-12"
                >
                </Image>
            </div>
            
        </div> 
    )
}