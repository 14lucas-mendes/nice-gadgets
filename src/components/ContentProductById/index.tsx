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


export default function ContentProductById({ product }: { product: CategoryItemProps | null }) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  return (
    <div className="w-full">
            <div className="flex flex-row mt-10 gap-2">
                <div className="flex flex-col gap-4">
                    {product?.images.map(img => (
                    <div key={img}>
                        <div 
                          className="w-20 h-20 border rounded-md relative cursor-pointer hover:border-blue-500 transition-colors"
                          onClick={() => setSelectedImage(img)}
                        >
                            <Image 
                            src={`/${img}`}
                            alt="Category Phones"
                            fill
                            className="object-contain absolute"
                            />
                        </div>
                    </div>  
                ))}
                </div>
                <div className="w-[464px] h-[464px] border relative">
                    <Image
                    src={selectedImage ? `/${selectedImage}` : ''}
                    alt={product?.name || "Product image"}
                    fill
                    className="absolute object-contain"
                    />
                </div>
            </div>
    </div>
  )
}