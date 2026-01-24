'use client';

import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

export function NavigationButtons({
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
}: NavigationButtonsProps) {
  return (
    <div className="hidden lg:flex gap-2 text-[#B4BDC3]">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="transition-colors hover:text-[#0F0F11] dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Itens anteriores"
      >
        <CircleChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="transition-colors hover:text-[#0F0F11] dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Próximos itens"
      >
        <CircleChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
