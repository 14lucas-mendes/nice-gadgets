'use client';

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function CarouselIndicators({ total, current, onSelect }: CarouselIndicatorsProps) {
  // Não mostra se tiver poucos itens
  if (total <= 1) return null;

  // Mostra no máximo 10 indicators
  const maxIndicators = 10;
  const shouldTruncate = total > maxIndicators;

  return (
    <div className="flex justify-center gap-2 mt-4 lg:hidden">
      {Array.from({ length: Math.min(total, maxIndicators) }).map((_, index) => {
        const isActive = index === current;

        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`transition-all duration-300 rounded-full ${
              isActive
                ? 'bg-[#0F0F11] dark:bg-white h-2 w-6'
                : 'bg-gray-300 dark:bg-gray-600 h-2 w-2 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Ir para item ${index + 1}`}
            aria-current={isActive}
          />
        );
      })}
      {shouldTruncate && (
        <span className="text-xs text-gray-500 self-center">+{total - maxIndicators}</span>
      )}
    </div>
  );
}
