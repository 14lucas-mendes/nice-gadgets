'use client';

import { useRouter } from 'next/navigation';
import type { ProductDetail } from '@/types/product-details';
import { getProductUrlByCapacity } from '@/lib/product-url';

interface StorageSelectorProps {
  product: ProductDetail;
}

export default function StorageSelector({ product }: StorageSelectorProps) {
  const router = useRouter();

  const handleCapacityClick = (capacity: string) => {
    const url = getProductUrlByCapacity(product, capacity);
    router.push(url);
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-[var(--text-muted)] text-xs sm:text-sm font-semibold mb-2">
        Select Capacity
      </p>

      <div className="flex flex-row flex-wrap gap-2">
        {product.capacityAvailable.map((capacity) => {
          const isSelected = product.capacity === capacity;

          return (
            <button
              key={capacity}
              type="button"
              onClick={() => handleCapacityClick(capacity)}
              className={`
                px-3 py-2 sm:px-4 sm:py-2.5
                text-xs sm:text-sm font-medium 
                border-2 rounded-lg 
                transition-all duration-200
                hover:border-orange-400 dark:hover:border-purple-400
                ${
                  isSelected
                    ? 'border-gray-800 dark:border-white bg-gray-50 dark:bg-gray-800'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
              aria-label={`Selecionar capacidade ${capacity}`}
              aria-current={isSelected ? 'true' : undefined}
            >
              {capacity}
            </button>
          );
        })}
      </div>

      <hr className="w-full my-4 sm:my-6 border-gray-200 dark:border-gray-700" />
    </div>
  );
}
