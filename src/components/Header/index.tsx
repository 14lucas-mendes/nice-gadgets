'use client';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    return (
        <header className="bg-white shadow-md h-[48px] md:h-[64px] lg:h-[64px] flex">
            <div className="px-4 py-[13px]">
                <Link href="/">
                    <Image
                    src='/img/icons/logo.png'
                    alt="Logo"
                    width={64}
                    height={22}
                    className="md:w-[80px] md:h-[28px] lg:w-[96px] lg:h-[32px]"
                    />
                </Link>
            </div>
            <div className="hidden 
            sm:flex sm:ml-8 sm:gap-8 sm:items-center sm:text-[#89939A] sm:text-[12px] sm:font-extrabold sm:uppercase sm:transition-all
            md:flex md:ml-12 md:gap-12 md:items-center md:text-[#89939A] md:text-[12px] md:font-extrabold md:uppercase md:transition-all
            lg:flex lg:ml-16 lg:gap-16 lg:items-center lg:text-[#89939A] lg:text-[12px] lg:font-extrabold lg:uppercase lg:transition-all
            ">
                <Link 
                className={activeLink === 'home' ? 'text-[#0F0F11] sm:border-b-3 sm:py-3.5 md:py-4.5 lg:py-5' : "sm:hover:border-b-3 sm:hover:border-black sm:hover:py-3.5 sm:text-[#89939A]"} 
                onClick={() => setActiveLink('home')}
                href="/">
                    Home
                </Link>

                <Link 
                className={activeLink === 'phone' ? 'text-[#0F0F11] sm:border-b-3 sm:py-3.5 md:py-4.5 lg:py-5' : "sm:hover:border-b-3 sm:hover:border-black sm:hover:py-3.5 sm:text-[#89939A]"} 
                onClick={() => setActiveLink('phone')}
                href='/phones'>
                    Phones
                </Link>

                <Link 
                className={activeLink === 'accessories' ? 'text-[#0F0F11] sm:border-b-3 sm:py-3.5 md:py-4.5 lg:py-5' : "sm:hover:border-b-3 sm:hover:border-black sm:hover:py-3.5 sm:text-[#89939A]"}
                onClick={() => setActiveLink('accessories')}
                href='/accessories'>
                    Accessories
                </Link>

                <Link 
                className={activeLink === 'tablets' ? 'text-[#0F0F11] sm:border-b-3 sm:py-3.5 md:py-4.5 lg:py-5' : "sm:hover:border-b-3 sm:hover:border-black sm:hover:py-3.5 sm:text-[#89939A]"} 
                onClick={() => setActiveLink('tablets')}
                href='/tablets'>
                    Tablets
                </Link>
            </div>
            {isMenuOpen && (
            <div className="fixed top-0 left-0 mt-12 w-full h-screen bg-white sm:hidden md:hidden lg:hidden z-50">
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col pt-6 gap-6 items-center text-sm font-extrabold text-[12px] uppercase">
                            <Link className={activeLink === 'home' ? 'border-b-3 py-3.5 border-black text-[#0F0F11]' : 'text-[#89939A]'}
                            onClick={() => {setActiveLink('home'); setIsMenuOpen(false);}}
                            href="/">
                                Home
                            </Link>

                            <Link className={activeLink === 'phones' ? 'border-b-3 py-3.5 border-black text-[#0F0F11]' : 'text-[#89939A]'}
                            onClick={() => {setActiveLink('phones'); setIsMenuOpen(false);}} 
                            href="/phones">
                                Phones
                            </Link>

                            <Link 
                            className={activeLink === 'accessories' ? 'border-b-3 py-3.5 border-black text-[#0F0F11]' : 'text-[#89939A]'} 
                            onClick={() => {setActiveLink('accessories'); setIsMenuOpen(false);}}
                            href="/accessories">
                                Accessories
                            </Link>

                            <Link 
                            className={activeLink === 'tablets' ? 'border-b-3 py-3.5 border-black text-[#0F0F11]' : 'text-[#89939A]'} 
                            onClick={() => {setActiveLink('tablets'); setIsMenuOpen(false);}}
                            href="/tablets">
                                Tablets
                            </Link>
                        </div>
                    <div className="flex justify-center mb-12 border-b-2 border-t-2 border-[#E2E6E9] sm:hidden md:hidden lg:hidden">
                        <div className="w-full h-[64px] items-center justify-center flex border-x-2 border-[#E2E6E9] sm:flex sm:flex-row">
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
                    <Link href="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-800">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </Link>
                </div>
                <div className="w-full h-[64px] items-center justify-center flex 
                sm:w-12 sm:h-12 
                md:w-16 md:h-16 
                ">
                    <Link href="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-800">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    )
}