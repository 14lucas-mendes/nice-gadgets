'use client';

import { useScrollToTop } from '@/hooks/useScrollToTop';
import { CircleChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const scrollToTop = useScrollToTop();

  return (
    <button
      onClick={scrollToTop}
      className="group font-bold text-[var(--text-muted)] w-[170px] text-sm sm:text-base flex items-center justify-center gap-2 transition-colors duration-300 hover:text-black"
      aria-label="Voltar ao topo"
    >
      Back to top
      <CircleChevronUp
        className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </button>
  );
}
