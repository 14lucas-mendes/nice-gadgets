import Link from "next/link";
import Image from "next/image";
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
    return (
        <div className="flex justify-between items-center w-full h-16 bg-white mb-0.5 shadow-md">
            <div>
                <Link href="/">
                    <Image src="/img/icons/logo.png" alt="logo" width={168} height={104} />
                </Link>
            </div>
            <div className="flex items-center text-[12px] gap-16 font-extrabold">
                <Link href="/" className="">HOME</Link>
                <Link href="/phones">PHONES</Link>
                <Link href="/contact">TABLETS</Link>
                <Link href="/contact">ACCESSORIES</Link>
            </div>
            <div className="flex gap-11 items-center">
                <Link href="/favorites">
                    <HeartIcon className="w-6 h-6" />
                </Link>
                <Link href="/cart" className="mr-4">
                    <ShoppingCartIcon className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
}