import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center">
            <Link href="/">
                <Image src="/img/icons/logo.png" alt="logo" width={80} height={26} />
            </Link>
            <div>
                <Link href="/">HOME</Link>
                <Link href="/phones">PHONES</Link>
                <Link href="/contact">TABLETS</Link>
                <Link href="/contact">ACCESSORIES</Link>
            </div>
            <Link href="/favorites">
                <Image src="/img/icons/heart_like.png" alt="heart" width={16} height={16} />
            </Link>
            <Link href="/cart">
                <Image src="/img/icons/cart.png" alt="cart" width={16} height={16} />
            </Link>
        </div>
    );
}