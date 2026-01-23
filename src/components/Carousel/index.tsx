'use client';

import { CAROUSEL_SLIDES } from '@/constants/carousel';
import { useCarouselAutoplay } from '@/hooks/useCarouselAutoplay';
import { useCarouselState } from '@/hooks/useCarouselState';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CarouselSlide } from './CarouselSlide';
import { CarouselIndicators } from './CarouselIndicators';
import { CarouselHeader } from './CarouselHeader';

interface CarouselSliderProps {
  title?: string;
  subtitle?: string;
  slides?: typeof CAROUSEL_SLIDES;
}

export default function CarouselSlider({
  title,
  subtitle,
  slides = CAROUSEL_SLIDES,
}: CarouselSliderProps) {
  const plugin = useCarouselAutoplay();
  const { api, setApi, current, count } = useCarouselState();

  return (
    <section
      className="w-full max-w-full overflow-hidden sm:px-12 md:max-w-6xl md:mx-auto"
      aria-label="Carrossel de produtos em destaque"
    >
      <CarouselHeader title={title} subtitle={subtitle} />

      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.link} className="sm:pl-4">
              <CarouselSlide slide={slide} index={index} isActive={index === current} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="hidden sm:flex sm:left-4 sm:bg-white/30 sm:hover:bg-white/50 sm:border-0 sm:text-white sm:backdrop-blur-sm transition-all"
          aria-label="Slide anterior"
        />
        <CarouselNext
          className="hidden sm:flex sm:right-4 sm:bg-white/30 sm:hover:bg-white/50 sm:border-0 sm:text-white sm:backdrop-blur-sm transition-all"
          aria-label="Próximo slide"
        />
      </Carousel>

      <CarouselIndicators count={count} current={current} api={api} />
    </section>
  );
}
