'use client'

import Image from "next/image";
import Link from "next/link";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Footer() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="bg-white inset-shadow-gray-400 w-full py-8 md:py-6">
            <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
                <Link href="/" className="flex items-center">
                    <Image 
                    src="/img/icons/Logo.png" 
                    width={64} 
                    height={22} 
                    alt='logo' 
                    className="h-5 w-auto md:h-8 md:hover:scale-110 md:transition-transform md:duration-300 md:ease-in-out lg:hover:scale-110 lg:transition-transform lg:duration-300 lg:ease-in-out"
                    />
                </Link>

                <div className="text-sm font-bold md:font-extrabold text-[#89939A] flex flex-col items-center gap-4 md:flex-row md:gap-8 lg:gap-10">
                    <Link 
                    className="min-h-[44px] flex items-center justify-center md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out"
                    href="https://github.com/14lucas-mendes">
                        GitHub
                    </Link>
                    <Link 
                    className="min-h-[44px] flex items-center justify-center md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out" 
                    href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/">
                        Contacts
                    </Link>
                    <Link 
                    className="min-h-[44px] flex items-center justify-center md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out" 
                    href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/">
                        Rights
                    </Link>
                </div>
                <button 
                onClick={handleScrollToTop}
                className="font-bold md:font-extrabold text-[#89939A] text-sm flex flex-row items-center gap-2 min-h-[44px] md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out"
                aria-label="Back to top"
                >
                    Back to top
                    <span className="flex items-center justify-center">
                        <ExpandLessIcon />
                    </span>
                </button>
            </div>
        </footer>
    )
}