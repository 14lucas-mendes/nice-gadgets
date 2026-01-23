'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { CarouselSlide as CarouselSlideType } from '@/constants/carousel';

interface CarouselSlideProps {
  slide: CarouselSlideType;
  index: number;
  isActive: boolean;
}

export function CarouselSlide({ slide, index, isActive }: CarouselSlideProps) {
  return (
    <Card className="overflow-hidden p-0 h-[320px] rounded-none sm:rounded-lg sm:h-auto md:max-h-[400px] border-0">
      <CardContent className="flex items-center justify-center p-0 relative h-[320px] sm:h-auto sm:aspect-[490/189] md:aspect-video md:max-h-[400px]">
        <Link
          href={slide.link}
          className="w-full h-full group relative overflow-hidden"
          aria-label={`Ver ${slide.title || slide.alt}`}
          aria-current={isActive ? 'true' : undefined}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
            priority={index === 0}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </CardContent>
    </Card>
  );
}
