'use client';

import Link from 'next/link';
import type { ProductDetail } from '@/types/product-details';
import { getColorHex } from '@/constants/colors';
import { getProductUrlByColor } from '@/lib/product-url';

interface ColorSelectorProps {
  product: ProductDetail;
}

export default function ColorSelector({ product }: ColorSelectorProps) {
  return (
    <div className="flex flex-col w-full">
      <p className="text-[var(--text-muted)] text-xs sm:text-sm font-semibold mb-2">
        Available Colors
      </p>

      <div className="flex flex-row flex-wrap gap-2 w-full">
        {product.colorsAvailable.map((color) => {
          const isSelected = product.color === color;
          const colorHex = getColorHex(color);
          const url = getProductUrlByColor(product, color);

          return (
            <Link
              key={color}
              href={url}
              className={`
                w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                border-2 transition-all duration-200
                hover:scale-110
                ${
                  isSelected
                    ? 'border-gray-800 dark:border-white ring-2 ring-orange-200 dark:ring-purple-200'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-500'
                }
              `}
              style={{ backgroundColor: colorHex }}
              aria-label={`Selecionar cor ${color}`}
              aria-current={isSelected ? 'true' : undefined}
            />
          );
        })}
      </div>

      <hr className="w-full my-4 sm:my-6 border-gray-200 dark:border-gray-700" />
    </div>
  );
}
