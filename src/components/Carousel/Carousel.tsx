'use client'

import Image from "next/image"
import { useState } from "react"

const images = [
  {
    id: 1,
    src: '/img/banner-accessories.png',
    alt: 'banner accessories',
    href: '/accessories',
    description: 'Make your best choice!'
  },

  {
    id: 2,
    src: '/img/banner-phones.png',
    alt: 'banner phones',
    href: '/phones',
    description: 'See our especial offers!'
  },

  {
    id: 3,
    src: '/img/banner-tablets.png',
    alt: 'banner tablets',
    href: '/tablets',
    description: 'Available in our store!'
  }
]



export default function Carousel() {
const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div>
      <h1 className="font-black text-5xl mb-14 mt-14">Welcome to Nice Gadgets store!</h1>
      <div className="slider w-[1040px] h-[400px] relative overflow-hidden">
        <div className="slider__view flex flex-row min-w-[1040px] min-h-[400px] items-center abosulte" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
          
          {images.map(image => (
            <div key={image.id} className="slider__image
            rounded-lg 
            w-[1040px] 
            h-[400px] 
            flex 
            justify-end
            flex-shrink-0 
            items-center 
            bg-gradient-to-br from-black via-gray-800 to-black
            transition-all duration-500 ease-in-out">
              <div className="bg-neutral-700 p-4 rounded-lg absolute bottom-0 left-0 m-4 w-96 h-[370px]">
                <h1>{image.description}</h1>
                <button>ORDER NOW</button>
              </div>
              <Image src={image.src} alt={image.alt} width={650} height={270} className="bg-transparent border-0"/>
            </div>
          ))}
        </div>
      </div>
      <button className="w-[50px] h-[50px] bg-black text-white mr-4 cursor-pointer" 
        onClick={() => setCurrentSlide(currentSlide - 1 ? currentSlide <= 0 ? images.length - 1 : currentSlide - 1 : 0)}>
        P
      </button>
      <button className="w-[50px] h-[50px] bg-black text-white cursor-pointer" 
        onClick={() => setCurrentSlide(currentSlide + 1 ? currentSlide >= images.length - 1 ? 0 : currentSlide + 1 : 1)}>
        N
      </button>
    </div>
  )

}

