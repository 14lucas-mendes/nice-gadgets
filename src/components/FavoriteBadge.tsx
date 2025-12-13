'use client';

import { Badge } from "@/components/ui/badge";
import { HeartPlus } from 'lucide-react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import Link from 'next/link';

type BadgeFavoriteProps = {
  onNavigate?: () => void;
};

export default function BadgeFavorite({ onNavigate }: BadgeFavoriteProps) {
  const { favoriteCount } = useCartFavorite();

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <Link 
      href="/favorite" 
      onClick={handleClick}
      className="relative inline-flex items-center justify-center min-h-[44px] w-full"
    >
      <HeartPlus
        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
          favoriteCount > 0 
            ? "fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600" 
            : "text-gray-600 hover:text-gray-900"
        }`} 
      />

      {favoriteCount > 0 && (
        <Badge 
          variant="default"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px] bg-red-600 hover:bg-red-700 pointer-events-none"
        >
          {favoriteCount}
        </Badge>
      )}
    </Link>
  );
}