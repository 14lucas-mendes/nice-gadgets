'use client';

import { CircleX } from 'lucide-react';
import { TextAlignJustify } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BadgeCart from '@/components/CartBadge';
import BadgeFavorite from '@/components/FavoriteBadge';

const routes = {
  home: { href: '/', isActive: (path: string) => path === '/' },
  phones: { href: '/products/phones', isActive: (path: string) => path.includes('/phones') },
  accessories: {
    href: '/products/accessories',
    isActive: (path: string) => path.includes('/accessories'),
  },
  tablets: { href: '/products/tablets', isActive: (path: string) => path.includes('/tablets') },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  return (
    <header className="w-full h-12 flex items-center sm:flex justify-between bg-[#FFFFFF] border-b border-[#E2E6E9]">
      <div className="flex items-center sm:px-2 sm:py-4">
       <Link href="/">
        <Image src="/img/icons/logo.svg" alt="logo" width={120} height={120} className="sm:w-[150px] sm:h-[150px] md:hover:scale-110 transition-all duration-300 ease-in-out" />
       </Link>
      </div>
      {/* Menu desktop */}
      <div 
      className="text-[#89939A] font-extrabold text-sm uppercase hidden items-center
      sm:w-full sm:ml-4 sm:flex sm:gap-8
      md:w-full md:ml-8 md:flex md:gap-12
      transition-all duration-300 ease-in-out">
        {Object.entries(routes).map(([key, route]) => (
          <Link href={route.href} key={key} className={`min-h-[44px] flex items-center ${route.isActive(pathname) ? 'text-[#0F0F11] border-b-2 border-black' : 'hover:border-b-2 hover:border-black hover:text-black'}`}>
             {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
        ))}
      </div>
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed top-12 left-0 w-full h-[calc(100vh-3rem)] bg-white sm:hidden md:hidden z-50 overflow-y-auto">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-8 gap-4 items-center text-sm font-extrabold uppercase">
              {Object.entries(routes).map(([key, route]) => (
                <Link
                  key={key}
                  className={`min-h-[44px] flex items-center justify-center ${route.isActive(pathname) ? 'border-b-2 border-black text-[#0F0F11]' : 'text-[#89939A]'}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  href={route.href}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
            {/* Menu mobile footer */}
            <div className="flex justify-center border-t-2 border-[#E2E6E9]">
              <div className="w-full min-h-[64px] items-center justify-center flex border-r-2 border-[#E2E6E9]">
                <BadgeFavorite onNavigate={() => setIsMenuOpen(false)} />
              </div>
              <div className="w-full min-h-[64px] items-center justify-center flex">
                <BadgeCart onNavigate={() => setIsMenuOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Button menu mobile */}
      <div className="flex items-center px-4 py-4 sm:hidden md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {!isMenuOpen ? (
            <TextAlignJustify className="w-6 h-6" />
          ) : (
            <CircleX className="w-6 h-6" />
          )}
        </button>
      </div>

      {/*Icons for desktop */}
      <div className="hidden sm:flex md:flex ml-auto">
        <div className="h-full items-center justify-center flex border-x-2 border-[#E2E6E9] w-16 lg:w-20 min-h-[44px]">
          <BadgeFavorite />
        </div>
        <div className="h-full items-center justify-center flex w-16 lg:w-20 min-h-[44px]">
          <BadgeCart />
        </div>
      </div>
    </header>
  );
}