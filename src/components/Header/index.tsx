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
    <header className="bg-white shadow-md h-[48px] md:h-[64px] lg:h-[64px] flex">
      <div className="px-4 py-[13px] md:py-[18px] lg:py-[18px]">
        <Link href="/">
          <Image
            src="/img/icons/logo.png"
            alt="Logo"
            width={64}
            height={22}
            className="md:w-[80px] md:h-[28px] lg:w-[96px] lg:h-[32px]
                    md:hover:scale-110 md:transition-transform md:duration-300 md:ease-in-out 
                    lg:hover:scale-110 lg:transition-transform lg:duration-300 lg:ease-in-out
                    "
          />
        </Link>
      </div>
      <div
        className="hidden sm:flex items-center text-[#89939A] text-[12px] font-extrabold uppercase transition-all
            sm:ml-8 sm:gap-8
            md:ml-12 md:gap-12 md:text-[14px]
            lg:ml-16 lg:gap-16
            "
      >
        {Object.entries(routes).map(([key, route]) => (
          <Link
            key={key}
            className={`${route.isActive(pathname) ? 'text-[#0F0F11] border-b-2 border-black' : 'hover:border-b-2 hover:border-black hover:text-black'} py-5`}
            href={route.href}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
        ))}
      </div>
      {isMenuOpen && (
        <div className="fixed top-12 left-0 w-full h-screen bg-white sm:hidden z-50">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-6 gap-6 items-center text-sm font-extrabold text-[12px] uppercase">
              {Object.entries(routes).map(([key, route]) => (
                <Link
                  key={key}
                  className={
                    route.isActive(pathname)
                      ? 'border-b-3 py-3.5 border-black text-[#0F0F11]'
                      : 'text-[#89939A]'
                  }
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  href={route.href}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
            <div className="flex justify-center mb-12 border-y-2 border-[#E2E6E9]">
              <div className="w-full h-[64px] items-center justify-center flex border-r-2 border-[#E2E6E9]">
                <Link href="/favorite" onClick={() => setIsMenuOpen(false)}>
                  <BadgeFavorite />
                </Link>
              </div>
              <div className="w-full h-[64px] items-center justify-center flex ">
                <Link href="/cart">
                  <BadgeCart />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="ml-auto px-4 py-[13px] sm:hidden border-l-2 border-[#E2E6E9]">
        {!isMenuOpen ? (
          <Bars3Icon className="w-5 h-5" onClick={() => setIsMenuOpen(true)} />
        ) : (
          <XMarkIcon className="w-5 h-5" onClick={() => setIsMenuOpen(false)} />
        )}
      </div>

      <div className="hidden sm:flex ml-auto">
        <div className="h-full items-center justify-center flex border-x-2 border-[#E2E6E9] sm:w-12 md:w-16">
          <Link href="/favorite">
            <BadgeFavorite />
          </Link>
        </div>
        <div className="h-full items-center justify-center flex sm:w-12 md:w-16">
          <Link href="/cart">
            <BadgeCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
