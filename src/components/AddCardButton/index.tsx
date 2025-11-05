import Link from "next/link";

export default function AddCardButton() {
    return (
        <div className="flex flex-row gap-4 w-full justify-between items-center mt-4">
        <Link 
        className="flex justify-center items-center w-[263px] h-[48px] bg-[#F86800] rounded-[8px]
        font-bold text-[14px] text-white
        "
        href={'/'}
        >
        Add to Cart
        </Link>
        <Link href='/products' className="flex justify-center items-center rounded-full border border-gray-400 w-10 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#0F0F11]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </Link>
        </div>
    )
}