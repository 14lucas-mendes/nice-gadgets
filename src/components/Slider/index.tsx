'use client'

import Image from "next/image";
import { useEffect, useState } from "react"
import { HeadingCard } from "../HeadingCard";
import type { Slider } from "@/types/Slider";

export default function Slider({slider}: { slider: Slider[] }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStartX, setTouchStartX] = useState(0);


    const handleNextSlide = () => {
        const nextSlide = currentSlide === slider.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
    }

    const handlePrevSlide = () => {
        const prevSlide = currentSlide === 0 ? slider.length - 1 : currentSlide - 1;
        setCurrentSlide(prevSlide);
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStartX(e.touches[0].clientX);
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchEndX = e.changedTouches[0].clientX;

        const difference = touchEndX - touchStartX;

        const threshold = 50

        if(difference < -threshold) {
            //usuario arrastou para a esquerda, então avance.
            handleNextSlide();
        }

        if (difference > threshold) {
            //usuario arrastou para a direita, então retroceda.
            handlePrevSlide();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 6000);

        return () => clearInterval(interval);
    })

    return (
        <div className="max-w-screen w-full -mx-4">   
            <HeadingCard as="h1">Welcome to Nice Gadgest store!</HeadingCard>
            <div className="flex relative aspect-video bg-black"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            >
                {slider.map((slide, index) => (
                <div key={slide.id} className="flex absolute w-full h-full items-center">
                    <div className="w-[40%] h-full bg-red-500">
                        <p>{slide.description}</p>         
                    </div>
                    <div className="w-[60%] h-[50%] right-0">
                    <Image
                    key={slide.id}
                    src={slide.src}
                    alt={slide.alt}
                    width={300}
                    height={300}
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