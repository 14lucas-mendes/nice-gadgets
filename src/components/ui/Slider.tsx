'use client'

import Image from "next/image";
import { useEffect, useState } from "react"

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStartX, setTouchStartX] = useState(0);


    const slides = [
        {
            id: 1,
            src:'/img/layout/banner-phones.png',
            alt:'phones',
            description:'Se our especial offers',
        },
        {
            id: 2,
            src:'/img/layout/banner-tablets.png',
            alt:'tablets',
            description:'Make your best chance',
        },
        {
            id: 3,
            src:'/img/layout/banner-accessories.png',
            alt:'accessories',
            description:'Avaliables in our store',
        }
    ]

    const handleNextSlide = () => {
        const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
    }

    const handlePrevSlide = () => {
        const prevSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
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
        <div 
        className="w-full max-w-4xl mx-auto"
        >
            <div className="relative aspect-video mt-6 bg-black"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <Image 
                    key={slide.id}
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out
                        ${index === currentSlide ? ' opacity-100' : ' opacity-0'}`}
                />
                ))}
            </div>
            <div className="flex justify-center z-10 space-x-2 mt-4">
                {slides.map((_, index) => (
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