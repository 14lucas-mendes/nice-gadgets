'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { ProductDetail } from '@/types/product-details';

interface ProductImageGalleryProps {
  product: ProductDetail;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product.images]);

  if (!product.images || product.images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Sem imagens disponíveis</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col-reverse md:flex-row gap-3 lg:gap-4 w-full">
        {/* Thumbnails */}
        <div className="flex flex-row md:flex-col gap-2 sm:gap-3 justify-start overflow-x-auto md:overflow-visible flex-shrink-0 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {product.images.map((img, index) => (
            <button
              key={img}
              onClick={() => setSelectedImage(img)}
              className={`
                relative flex-shrink-0
                w-16 h-16 sm:w-20 sm:h-20
                border-2 rounded-lg cursor-pointer 
                transition-all duration-200
                ${
                  selectedImage === img
                    ? 'border-orange-500 dark:border-purple-500 ring-2 ring-orange-200 dark:ring-purple-200'
                    : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-purple-300'
                }
              `}
              aria-label={`Ver imagem ${index + 1}`}
            >
              <Image
                src={`/${img}`}
                alt={`${product.name} - imagem ${index + 1}`}
                fill
                className="object-contain rounded-md p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 w-full min-w-0">
          <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] lg:h-[500px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden">
            <Image
              src={`/${selectedImage || product.images[0]}`}
              alt={product.name}
              fill
              priority
              className="object-contain p-4 sm:p-6 md:p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
