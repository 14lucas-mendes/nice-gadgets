'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import './Slider.css';

interface SlideData {
  id: number;
  src: string;
  alt: string;
  link: string;
}

const sliderData: SlideData[] = [
  {
    id: 1,
    src: '/img/layout/banner-phones.png',
    alt: 'phones',
    link: '/products/phones',
  },
  {
    id: 2,
    src: '/img/layout/banner-tablets.png',
    alt: 'tablets',
    link: '/products/tablets',
  },
  {
    id: 3,
    src: '/img/layout/banner-accessories.png',
    alt: 'accessories',
    link: '/products/accessories',
  },
];

export default function Slider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay]);

  return (
    <div
      className="relative w-full h-[320px] sm:w-[490px] sm:h-[189px] md:w-[1040px] md:h-[400px] mx-auto overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderData.map((slide) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <Link href={slide.link} className="block w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={slide.id === 1}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 490px, 1040px"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button onClick={prevSlide} className="slider-nav-button left-2 sm:left-4 cursor-pointer" aria-label="Previous slide">
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="slider-nav-button right-2 sm:right-4 cursor-pointer" aria-label="Next slide">
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
                   