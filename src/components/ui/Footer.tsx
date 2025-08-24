import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white inset-shadow-gray-400 h-[257px} w-full">
            <div className="ml-4 mt-8">
                <Link href="/" className="mt-8">
                    <Image src="/img/icons/Logo.png" width={64} height={20} alt='logo' />
                </Link>
            </div>
            <div className="flex flex-col gap-1 ml-4 mt-8 text-[12px] font-bold text-[#89939A]">
                <Link href="https://github.com/14lucas-mendes">GitHub</Link>
                <Link href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/">Contacts</Link>
                <Link href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/">Rights</Link>
            </div>
            <div className="flex items-center justify-center mb-8 font-bold text-[#89939A] text-[12px] gap-1">
                <p>Back to top</p>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </footer>
    )
}