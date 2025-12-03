'use client';

import { useState, useEffect, useRef, useCallback, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

 
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  }, []);

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


  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    stopAutoplay();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || touchEnd === null) {
      setIsDragging(false);
      startAutoplay();
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    startAutoplay();
  };


  const getTransform = () => {
    if (!touchStart || touchEnd === null || !isDragging) {
      return `translateX(-${currentIndex * 100}%)`;
    }

    const distance = touchStart - touchEnd;
    const offset = (distance / (sliderRef.current?.offsetWidth || 1)) * 100;
    const baseOffset = -currentIndex * 100;
    
    return `translateX(calc(${baseOffset}% + ${offset}px))`;
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay]);

  return (
    <div className="w-full">
      <div
        ref={sliderRef}
        className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg aspect-[4/5] sm:aspect-[2.6/1] touch-pan-y"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full"
          style={{
            transform: getTransform(),
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
          }}
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
                  sizes="(max-width: 639px) 100vw, (max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 1040px"
                />
              </Link>
            </div>
          ))}
        </div>

       
        <button
          onClick={prevSlide}
          className="hidden sm:grid absolute top-1/2 left-2 sm:left-4 md:left-6 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 place-items-center transition-colors duration-300 ease-in-out hover:bg-black/60 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:grid absolute top-1/2 right-2 sm:right-4 md:right-6 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 place-items-center transition-colors duration-300 ease-in-out hover:bg-black/60 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>

      
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-2.5 md:space-x-3 z-10">
          {sliderData.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
                   