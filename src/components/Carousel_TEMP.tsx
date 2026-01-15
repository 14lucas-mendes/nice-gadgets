'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CarouselSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const images = [
    {
      src: '/img/layout/phones.png',
      alt: 'phones',
      link: '/products/phones',
    },
    {
      src: '/img/layout/tablets.png',
      alt: 'tablets',
      link: '/products/tablets',
    },
    {
      src: '/img/layout/accessories.png',
      alt: 'accessories',
      link: '/products/accessories',
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-full p-0 overflow-hidden sm:px-12 md:max-w-6xl md:mx-auto">
      <div className="py-6 px-4 sm:py-8 md:py-14">
        <h1 className="top-0 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F0F11]">
          Welcome to Nice Gadgets store!
        </h1>
      </div>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0 sm:pl-4">
              <div className="">
                <Card className="overflow-hidden p-0 h-[320px] rounded-none sm:rounded-lg sm:h-auto md:max-h-[400px]">
                  <CardContent className="flex items-center justify-center p-0 relative h-[320px] sm:h-auto sm:aspect-[490/189] md:aspect-video md:max-h-[400px]">
                    <Link
                      href={image.link}
                      className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500"
                    >
                      Imagem {index + 1}
                      {/* Para usar imagens reais, descomente abaixo */}
                      <Image src={image.src} alt={image.alt} fill className="object-cover" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex sm:left-4 sm:bg-white/30 sm:hover:bg-white/50 sm:border-0 sm:text-white sm:backdrop-blur-sm" />
        <CarouselNext className="hidden sm:flex sm:right-4 sm:bg-white/30 sm:hover:bg-white/50 sm:border-0 sm:text-white sm:backdrop-blur-sm" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === current ? 'bg-[#0F0F11] h-2 w-6' : 'bg-gray-300 h-2 w-2 hover:bg-gray-400'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
