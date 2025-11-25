'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BadgeFavorite from '../BadgeFavorite';
import BadgeCart from '../BadgeCart';
import { useEffect, useState } from 'react';

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
    <header className="bg-white shadow-md h-16 md:h-16 flex items-center relative">
      <div className="px-4 py-3 md:px-6 md:py-4 flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/img/icons/logo.png"
            alt="Logo"
            width={64}
            height={22}
            className="h-5 w-auto md:h-7 lg:h-8 md:hover:scale-110 md:transition-transform md:duration-300 md:ease-in-out lg:hover:scale-110 lg:transition-transform lg:duration-300 lg:ease-in-out"
          />
        </Link>
      </div>
      <div
        className="hidden md:flex items-center text-[#89939A] text-sm md:text-base font-extrabold uppercase transition-all ml-6 md:ml-8 lg:ml-12 gap-6 md:gap-8 lg:gap-12"
      >
        {Object.entries(routes).map(([key, route]) => (
          <Link
            key={key}
            className={`min-h-[44px] flex items-center ${route.isActive(pathname) ? 'text-[#0F0F11] border-b-2 border-black' : 'hover:border-b-2 hover:border-black hover:text-black'}`}
            href={route.href}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
        ))}
      </div>
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white md:hidden z-50 overflow-y-auto">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-8 gap-4 items-center text-sm font-extrabold uppercase">
              {Object.entries(routes).map(([key, route]) => (
                <Link
                  key={key}
                  className={`min-h-[44px] flex items-center justify-center w-full ${route.isActive(pathname) ? 'border-b-2 border-black text-[#0F0F11]' : 'text-[#89939A]'}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  href={route.href}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
            <div className="flex justify-center border-t-2 border-[#E2E6E9] mt-auto">
              <div className="w-full min-h-[64px] items-center justify-center flex border-r-2 border-[#E2E6E9]">
                <Link href="/favorite" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center justify-center w-full">
                  <BadgeFavorite />
                </Link>
              </div>
              <div className="w-full min-h-[64px] items-center justify-center flex">
                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center justify-center w-full">
                  <BadgeCart />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="ml-auto px-4 py-3 md:hidden border-l-2 border-[#E2E6E9] flex items-center min-h-[44px]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {!isMenuOpen ? (
            <Bars3Icon className="w-6 h-6" />
          ) : (
            <XMarkIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="hidden md:flex ml-auto">
        <div className="h-full items-center justify-center flex border-x-2 border-[#E2E6E9] w-16 lg:w-20 min-h-[44px]">
          <Link href="/favorite" className="min-h-[44px] min-w-[44px] flex items-center justify-center w-full">
            <BadgeFavorite />
          </Link>
        </div>
        <div className="h-full items-center justify-center flex w-16 lg:w-20 min-h-[44px]">
          <Link href="/cart" className="min-h-[44px] min-w-[44px] flex items-center justify-center w-full">
            <BadgeCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
