'use client'

import Image from "next/image";
import { useState } from "react"

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

    //Pega o objeto do slider atual usando o indice de estado.
    const activeSlider = slides[currentSlide];

    const handleNextSlide = () => {
        const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
    }

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    }

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;

        const difference = touchEndX - touchStartX;

        const threshold = 50

        if(difference < -threshold) {
            handleNextSlide();
        }
    }

    return (
        <div onTouchStart={handleTouchStart}>
            <h2>{activeSlider.description}</h2>
            <Image 
            src={activeSlider.src}
            alt={activeSlider.alt}
            width={400}
            height={400}
            />
        </div>
    )
}