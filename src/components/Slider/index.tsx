'use client'

import Image from "next/image";
import { useEffect, useState } from "react"
import { HeadingCard } from "../HeadingCard";
import type { Slider } from "@/types/Slider";

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slider = [
    {
        id: 1,
        src: "/img/layout/banner-phones.png",
        alt: "phones",
        description: "See our special offers" // Corrigido o typo em "Se"
    },
    {
        id: 2,
        src: "/img/layout/banner-tablets.png",
        alt: "tablets",
        description: "Make your best chance"
    },
    {
        id: 3,
        src: "/img/layout/banner-accessories.png",
        alt: "accessories",
        description: "Available in our store" // Corrigido o typo em "Avaliables"
    }
]


    const handleNextSlide = () => {
        const nextSlide = currentSlide === slider.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
    }

    const handlePrevSlide = () => {
        const prevSlide = currentSlide === 0 ? slider.length - 1 : currentSlide - 1;
        setCurrentSlide(prevSlide);
    }


    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 6000);

        return () => clearInterval(interval);
    })

    return (
        <div className="max-w-screen w-full ">   
            <HeadingCard as="h1">Welcome to Nice Gadgest store!</HeadingCard>
            <div className="flex relative aspect-video bg-black 
            sm:rounded-[8px]
            md:rounded-[12px] 
            lg:rounded-[16px]"
            >
                {slider.map((slide, index) => (
                <div key={slide.id} className="flex absolute w-full h-full items-center">
                    <div className="w-[40%] h-[350px] bg-red-500 ml-4 sm:rouded-[8px] md:rounded-[12px] lg:rounded-[16px]">
                        <p className="flex justify-center items-center">{slide.description}</p>         
                    </div>
                    <div className="w-[60%] h-[50%] right-0">
                    <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={600}
                    height={600}
                    objectFit="cover"
                    className={`object-cover transition-opacity duration-700 ease-in-out
                        ${index === currentSlide ? ' opacity-100' : ' opacity-0'}`}
                />
                    </div>
                </div>
                ))}
            </div>
            <div className="flex justify-center z-10 space-x-2 mt-4">
                {slider.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3.5 h-1 ${currentSlide === index ? 'bg-[#0F0F11]' : 'bg-[#E2E6E9]'}`}
                        onClick={() => setCurrentSlide(index)}
                    >
                    </button>
                ))}
            </div>
        </div>
    )
}