import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface UseCarouselAutoplayOptions {
  delay?: number;
  stopOnInteraction?: boolean;
}

export function useCarouselAutoplay(options?: UseCarouselAutoplayOptions) {
  const { delay = 5000, stopOnInteraction = true } = options || {};

  const plugin = useRef(
    Autoplay({
      delay, // ⬅️ Aqui usa 'delay' como propriedade, não como função
      stopOnInteraction,
    }),
  );

  return plugin;
}
