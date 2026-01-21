import { useCallback } from 'react';

interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  top?: number;
}

export function useScrollToTop(options: ScrollToTopOptions = {}) {
  const { behavior = 'smooth', top = 0 } = options;

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top,
      behavior,
    });
  }, [top, behavior]);

  return scrollToTop;
}
