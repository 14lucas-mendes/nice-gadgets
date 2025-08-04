'use client'

import Image from "next/image"

export default function Carousel() {
  return (
    <div>
      <h1 className="font-black text-5xl mb-14 mt-14">Welcome to Nice Gadgets store!</h1>
      <div className="flex items-center w-full bg-amber-300 h-[432px]">
        <button className="w-8 h-[400px] bg-amber-100">
          P
        </button>
        <Image 
        src="/img/banner-accessories.png" 
        alt="banner accessories" 
        width={1040} 
        height={400}
        />
        <button className="w-8 h-[400px] bg-amber-200">
          N
        </button>
      </div>
    </div>
  )

}

