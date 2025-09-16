'use client';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md h-[48px] flex">
            <div className="px-4 py-[13px]">
                <Link href="/">
                    <Image
                    src='/img/icons/logo.png'
                    alt="Logo"
                    width={64}
                    height={22}
                    />
                </Link>
            </div>
            {isMenuOpen && (
            <div className="fixed top-0 left-0 mt-12 w-full h-screen bg-white">
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col pt-6 gap-6 items-center text-sm font-extrabold text-[12px] uppercase text-[#89939A]">
                            <Link href="/">Home</Link>
                            <Link href="/phones">Phones</Link>
                            <Link href="/accesories">Accessories</Link>
                            <Link href="/tablets">Tablets</Link>
                        </div>
                    <div className="flex justify-center mb-12 border-b-2 border-t-2 border-[#E2E6E9]">
                        <div className="w-full h-[64px] items-center justify-center flex border-x-2 border-[#E2E6E9]">
                            <Link href="/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="w-full h-[64px] items-center justify-center flex ">
                            <Link href="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div> 
            </div>
                
            )}
        
           <div className="ml-auto px-4 py-[13px]">
            {!isMenuOpen ?  
                (<Bars3Icon className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => setIsMenuOpen(true)} />) 
                    : 
                (<XMarkIcon className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => setIsMenuOpen(false)} />)  
            }
           </div>
        </header>
    )
}