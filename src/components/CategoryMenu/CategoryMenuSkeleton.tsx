import { Skeleton } from '@/components/ui/skeleton';

export function CategoryMenuSkeleton() {
  return (
    <div className="w-full max-w-full px-4 overflow-hidden sm:px-12 md:max-w-6xl md:mx-auto pb-14 sm:pb-16 md:pb-20">
      {/* Header Skeleton */}
      <div className="mb-4 sm:mb-6">
        <Skeleton className="h-8 w-64 sm:h-10 md:h-12" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:gap-6 lg:gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-[363px] sm:h-auto sm:aspect-[16/9] rounded-lg" />

            {/* Text Skeleton */}
            <div className="mt-4 sm:mt-5 md:mt-6">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
