import Image from "next/image";
import Link from "next/link";



export default function Footer() {
    return (
        <div className="flex justify-between items-center w-full h-24 bg-gray-300 mt-0.5 shadow-md">
            <div>
                <Link href="/">
                    <Image src="/img/icons/logo.png" alt="logo" width={168} height={104} />
                </Link>
            </div>
            <div className="flex items-center text-[12px] gap-16 font-extrabold text-[#89939A]">
                <Link href="https://github.com/">GITHUB</Link>
                <Link href="/contacts">CONTACTS</Link>
                <Link href="#">RIGHTS</Link>
            </div>
            <div className="flex gap-4 items-center mr-8 text-[#89939A] font-bold">
                <span className="text-[12px]">Back to top</span>
                <Link href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}