'use client';

import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from 'lucide-react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import Link from 'next/link';

type BadgeCartProps = {
  onNavigate?: () => void;
};

export default function BadgeCart({ onNavigate }: BadgeCartProps) {
  const { cartCount } = useCartFavorite();

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <Link 
      href="/cart" 
      onClick={handleClick}
      className="relative inline-flex items-center justify-center min-h-[44px] w-full"
    >
      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-colors hover:text-gray-900" />

      {cartCount > 0 && (
        <Badge 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px] bg-blue-600 hover:bg-blue-700 pointer-events-none"
        >
          {cartCount}
        </Badge>
      )}
    </Link>
  );
}