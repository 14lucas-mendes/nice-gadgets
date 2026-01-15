"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type CategoryItemProps = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}


export default function ProductDetailPage({ product }: { product: CategoryItemProps | null }) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  return (
    <div className="w-full">
      <div className="flex flex-row gap-2 sm:gap-4 lg:gap-6">
        {/* Miniaturas Verticais - Coluna à esquerda */}
        <div className="flex flex-col gap-2 lg:gap-4 flex-shrink-0">
          {product?.images.map(img => (
            <div key={img}>
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border rounded-md relative cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => setSelectedImage(img)}
              >
                <Image 
                  src={`/${img}`}
                  alt="Product thumbnail"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            </div>  
          ))}
        </div>
        
        {/* Imagem Principal - Ocupa o restante do espaço */}
        <div className="w-full aspect-square relative flex-1 min-w-0">
          <Image
            src={selectedImage ? `/${selectedImage}` : (product?.images && product.images.length > 0 ? `/${product.images[0]}` : '/placeholder.jpg')}
            alt={product?.name || "Product image"}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}