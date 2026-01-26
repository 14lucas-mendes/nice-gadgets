import { Skeleton } from '@/components/ui/skeleton';

interface CardSlicerSkeletonProps {
  title?: string;
  layout?: 'carousel' | 'grid';
  count?: number;
}

export function CardSlicerSkeleton({
  title = 'Carregando...',
  layout = 'carousel',
  count = 4,
}: CardSlicerSkeletonProps) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        {layout === 'carousel' && (
          <div className="hidden lg:flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        )}
      </div>

      {/* Cards */}
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton
              key={i}
              className="flex-shrink-0 h-[400px] w-[260px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            />
          ))}
        </div>
      )}
    </div>
  );
}
