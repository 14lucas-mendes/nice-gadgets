'use client'

import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        //Se o menu estiver aberto impede o scroll
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        //Impede que o scroll fique travado por acidente
        return () => {
            document.body.classList.remove('overflow-hidden');
        };

        //só roda quando o estado do menu mudar.
    }, [isMenuOpen]);

    return (
        <header className="bg-white shadow-md h-12 fixed top-0 w-full z-10">
            <div className="flex items-center justify-between px-4 w-full pt-3">
                <Link href='/' onClick={() => {
                            setIsMenuOpen(false)
                            setActiveLink('home')
                        }}>
                    <Image src="/img/icons/Logo.png" width={64} height={20} alt='logo'/>
                </Link>
        
                {/*Botão de menu*/}
                {!isMenuOpen ? 
                    (<Bars3Icon width={24} height={24} onClick={() => setIsMenuOpen(prev => !prev)} className="cursor-pointer"/>
                    ) : (
                    <XMarkIcon width={24} height={24} onClick={() => setIsMenuOpen(prev => !prev)} className="cursor-pointer"/>
                    )}
            
            {/*Menu coms os links de navegação*/}
            {isMenuOpen && (
            <div className="fixed top-0 left-0 w-full h-screen mt-[50px] bg-white flex flex-col justify-between p-8 text-[#89939A]">
                <div className="flex flex-col items-center gap-4 text-lg pt-2">
                    <Link href='/' 
                        onClick={() => {
                            setIsMenuOpen(false);
                            setActiveLink('home')
                        }}
                        className={activeLink === 'home' ? 'border-b-2 border-black pb-1 text-[#313237]' : 'text-[#89939A]'}>

                        Home

                        </Link>
                    <Link href='/phones' 
                        onClick={() => {
                            setIsMenuOpen(false);
                            setActiveLink('phones')
                        }}
                        className={activeLink === 'phones' ? 'border-b-2 border-black pb-1 text-[#313237]' : 'text-[#89939A]'}>

                        Phones

                    </Link>
                    <Link href='/accessories' 
                        onClick={() => {
                            setIsMenuOpen(false);
                            setActiveLink('accessories')
                        }}
                        className={activeLink === 'accessories' ? 'border-b-2 border-black pb-1 text-[#313237]' : 'text-[#89939A]'}>

                        Accessories

                    </Link>
                    <Link href='/tablets' 
                        onClick={() => {
                            setIsMenuOpen(false);
                            setActiveLink('tablets')
                        }}
                        className={activeLink === 'tablets' ? 'border-b-2 border-black pb-1 text-[#313237]' : 'text-[#89939A]'}>

                        Tablets
                        
                    </Link>
                </div>

                 {/*Botões de favoritos e carrinho*/}
                <div className="flex justify-center w-full text-black border-t-[#E2E6E9] border-t border-b border-gray-300">
                    <div className="w-1/2 h-16 flex justify-center items-center border-r-[#E2E6E9] relative border-r border-gray-300">
                    <Link href='/favorite' onClick={() => {
                        setIsMenuOpen(false);
                        setActiveLink('favorites')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </Link>
                    </div>
                   <div className="w-1/2 h-16 flex justify-center items-center">
                    <Link href='/cart' onClick={() => {
                        setIsMenuOpen(false);
                        setActiveLink('cart')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </Link>
                   </div>
                </div>
             </div> 
            )} 
            </div>
        </header>
    )
}