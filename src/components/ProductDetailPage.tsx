'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

// Mantivemos seus tipos exatamente como estavam
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
};

export default function ProductDetailPage({ product }: { product: CategoryItemProps | null }) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="w-full">
      {/* CORREÇÃO DO ESTOURO DE TELA:
         1. 'flex-col-reverse': No mobile, empilha verticalmente (Inverso: Imagem em cima, Thumbs embaixo).
         2. 'md:flex-row': A partir do tablet/desktop, volta a ficar lado a lado.
         3. 'w-full': Garante que o container não seja maior que a tela.
      */}
      <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6 w-full">
        {/* Container das Miniaturas */}
        <div
          className="
            flex 
            flex-row md:flex-col          /* Mobile: Linha | Desktop: Coluna */
            gap-3 
            justify-center md:justify-start /* Centraliza no mobile */
            overflow-x-auto md:overflow-visible /* Permite rolar se tiver muitas fotos no mobile */
            flex-shrink-0 
            w-full md:w-auto              /* Mobile: Largura total | Desktop: Largura do conteúdo */
            pb-2 md:pb-0                  /* Espaço extra pro scroll não colar */
        "
        >
          {product.images.map((img) => (
            <div key={img} className="flex-shrink-0">
              <div
                className={`
                  relative 
                  w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 
                  border rounded-md cursor-pointer transition-all duration-200
                  ${
                    selectedImage === img
                      ? 'border-blue-600 ring-1 ring-blue-600' // Feedback visual de seleção
                      : 'border-gray-200 hover:border-blue-400'
                  }
                `}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={`/${img}`}
                  alt="Product thumbnail"
                  fill
                  className="object-contain rounded-md p-1"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Container da Imagem Principal */}
        <div className="flex-1 w-full min-w-0">
          {' '}
          {/* min-w-0 é CRUCIAL para evitar overflow em flexbox */}
          <div
            className="
              relative 
              w-full 
              aspect-square md:aspect-auto md:h-[400px] lg:h-[500px] /* Controla altura no desktop */
              bg-white rounded-lg flex items-center justify-center
          "
          >
            <Image
              src={
                selectedImage
                  ? `/${selectedImage}`
                  : product.images && product.images.length > 0
                    ? `/${product.images[0]}`
                    : '/placeholder.jpg'
              }
              alt={product.name || 'Product image'}
              fill
              priority // Carrega rápido por ser a imagem principal
              className="object-contain max-h-[300px] md:max-h-full" // Limita altura no mobile
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
