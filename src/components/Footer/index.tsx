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
        <footer className="bg-white inset-shadow-gray-400 h-[257px sm:h-[96px] w-full sm:items-center sm:justify-center">
            <div className="px-4 py-8 flex flex-col sm:flex sm:flex-row sm:justify-between sm:items-start">
                <Link href="/" className="mb-8 sm:mb-0">
                    <Image 
                    src="/img/icons/Logo.png" 
                    width={64} height={22} 
                    alt='logo' 
                    className="sm:w-[89px] sm:h-[32px] 
                    md:hover:scale-110 md:transition-transform md:duration-300 md:ease-in-out 
                    lg:hover:scale-110 lg:transition-transform lg:duration-300 lg:ease-in-out"
                    />
                </Link>

                <div className="text-[14px] font-bold text-[#89939A] flex flex-col gap-4 sm:flex sm:flex-row 
                sm:gap-10 sm:font-extrabold">
                    
                    <Link className=" md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out
                     lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out"
                    href="https://github.com/14lucas-mendes">
                        GitHub
                    </Link>
                    <Link className=" md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out
                     lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out" 
                    href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/">
                        Contacts
                    </Link>
                    <Link className=" md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out
                     lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out" 
                    href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/">
                        Rights
                    </Link>
                </div>
                <div 
                onClick={handleScrollToTop}
                className="font-bold text-[#89939A] text-[14px] flex flex-row items-center gap-2 mt-8 justify-center
                sm:mt-0 sm:justify-start sm:font-extrabold 
                md:mt-0 md:justify-start md:font-extrabold md:cursor-pointer 
                lg:mt-0 lg:justify-start lg:font-extrabold lg:cursor-pointer 

                ">
                Back to top
                <button 
                className="relative cursor-pointer " 
                >
                    <div className="absolute flex justify-center items-center
                    sm:h-8 sm:w-8
                    ">
                    </div>
                    <ExpandLessIcon />
                </button>
            </div>
            </div>
        </footer>
    )
}