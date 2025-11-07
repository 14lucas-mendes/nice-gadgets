'use client';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BadgeFavorite from "../BadgeFavorite";
import BadgeCart from "../BadgeCart";

const routes = {
    home: { href: '/', isActive: (path: string) => path === '/' },
    phones: { href: '/products/phones', isActive: (path: string) => path.includes('/phones') },
    accessories: { href: '/products/accessories', isActive: (path: string) => path.includes('/accessories') },
    tablets: { href: '/products/tablets', isActive: (path: string) => path.includes('/tablets') },
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    


    return (
        <header className="bg-white shadow-md h-[48px] md:h-[64px] lg:h-[64px] flex">
            <div className="px-4 py-[13px] md:py-[18px] lg:py-[18px]">
                <Link href="/">
                    <Image
                    src='/img/icons/logo.png'
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
            <div className="hidden 
            sm:flex sm:ml-8 sm:gap-8 sm:items-center sm:text-[#89939A] sm:text-[12px] sm:font-extrabold sm:uppercase sm:transition-all
            md:flex md:ml-12 md:gap-12 md:items-center md:text-[#89939A] md:text-[14px] md:font-extrabold md:uppercase md:transition-all
            lg:flex lg:ml-16 lg:gap-16 lg:items-center lg:text-[#89939A] lg:text-[14px] lg:font-extrabold lg:uppercase lg:transition-all
            ">
                {Object.entries(routes).map(([key, route]) => (
                <Link 
                    key={key}
                    className={route.isActive(pathname) ? 'text-[#0F0F11] sm:border-b-3 sm:py-3.5 md:py-4.5 lg:py-5' : "sm:hover:border-b-3 sm:hover:border-black sm:hover:py-3.5 md:hover:py-5 lg:hover:py-6' sm:text-[#89939A]"} 
                    href={route.href}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
                ))}
               

            </div>
            {isMenuOpen && (
            <div className="fixed top-0 left-0 mt-12 w-full h-screen bg-white sm:hidden md:hidden lg:hidden z-50">
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col pt-6 gap-6 items-center text-sm font-extrabold text-[12px] uppercase">
                        {Object.entries(routes).map(([key, route]) => (
                             <Link 
                             key={key}
                            className={route.isActive(pathname) ? 'border-b-3 py-3.5 border-black text-[#0F0F11]' : 'text-[#89939A]'}
                            onClick={() => {setIsMenuOpen(false);}}
                            href={route.href}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}
                           
                        </div>
                    <div className="flex justify-center mb-12 border-b-2 border-t-2 border-[#E2E6E9] sm:hidden md:hidden lg:hidden">
                        <div className="w-full h-[64px] items-center justify-center flex border-x-2 border-[#E2E6E9] sm:flex sm:flex-row">
                            <Link href="/fovorite">
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
        
           <div className="ml-auto px-4 py-[13px] sm:hidden md:hidden lg:hidden border-l-2 border-[#E2E6E9]">
            {!isMenuOpen ?  
                (<Bars3Icon className="w-5 h-5" onClick={() => setIsMenuOpen(true)} />) 
                    : 
                (<XMarkIcon className="w-5 h-5" onClick={() => setIsMenuOpen(false)} />)  
            }
           </div>

           <div className="justify-center mb-12 border-b-2 border-t-2 border-[#E2E6E9] hidden
           sm:flex sm:flex-row sm:ml-auto sm:border-t-0 sm:border-b-0
           md:flex md:flex-row md:ml-auto md:border-t-0 md:border-b-0
           lg:flex lg:flex-row lg:ml-auto lg:border-t-0 lg:border-b-0
           ">
                <div className="w-full h-[64px] items-center justify-center flex border-x-2 border-[#E2E6E9]
                 sm:w-12 sm:h-12 
                 md:w-16 md:h-16 
                 ">
                    <Link href="/favorite">
                       <BadgeFavorite />
                    </Link>
                </div>
                <div className="w-full h-[64px] items-center justify-center flex 
                sm:w-12 sm:h-12 
                md:w-16 md:h-16
                ">
                    <Link href="/cart">
                        <BadgeCart />
                    </Link>
                </div>
            </div>
        </header>
    )
}