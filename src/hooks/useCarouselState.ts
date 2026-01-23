import { useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

export function useCarouselState() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Inicializa contadores
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    // Listener para mudanças de slide
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    // Cleanup
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return { api, setApi, current, count };
}
