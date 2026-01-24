'use client';

import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  onClick: () => void;
  priority?: boolean;
}

export function ProductImage({ src, alt, onClick, priority = false }: ProductImageProps) {
  return (
    <div className="relative w-full aspect-square max-h-40 flex items-center justify-center group cursor-pointer">
      <Image
        src={src.startsWith('/') ? src : `/${src}`}
        alt={alt}
        fill
        className="object-contain transition-transform duration-300 group-hover:scale-105"
        onClick={onClick}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  );
}
