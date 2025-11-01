'use client'

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"

import "./Slider.css"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

import Image from "next/image"
import { HeadingCard } from "../HeadingCard"
import Link from "next/link"


export default function Slider() {

    const slider = [
    {
      id: 1,
      src: "/img/layout/banner-phones.png",
      alt: "phones",
      title: "See our special offers",
      description: "Check out the best deals on smartphones with incredible prices!",
      buttonText: "Shop Phones",
      buttonLink: "/products/phones"
    },
    {
      id: 2,
      src: "/img/layout/banner-tablets.png",
      alt: "tablets",
      title: "Make your best chance",
      description: "Discover our tablet collection with the latest technology.",
      buttonText: "Shop Tablets",
      buttonLink: "/products/tablets"
    },
    {
      id: 3,
      src: "/img/layout/banner-accessories.png",
      alt: "accessories",
      title: "Available in our store",
      description: "Find the perfect accessories to complement your devices.",
      buttonText: "Shop Accessories",
      buttonLink: "/products/accessories"
    }
]


 return (
    <div className="w-full relative sm:max-w-[490px] md:max-w-6xl"> 
        <div className="mb-8 sm:mb-10 md:mb-14 md:max-w-6xl mx-auto">
            <HeadingCard as="h1">Welcome to Nice Gadgets store!</HeadingCard>
        </div>
        <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            effect="fade"
            className="mySwiper" // Mantenha esta classe para o CSS
        >
            {slider.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-[300px] sm:h-[200px] md:h-[400px] mx-auto bg-gray-100 overflow-hidden rounded-none sm:rounded-xl md:rounded-2xl
                    transition-all duration-500 ease-in-out
                    sm:transition-all
                    md:transition-all
                    ">
                        {/* Container flex responsivo */}
                        <div className="flex flex-col sm:flex-row h-full">
                            {/* Card com conteúdo - adaptável para mobile */}
                            <div className="w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 bg-slate-600">
                                <div className="max-w-xs sm:max-w-sm md:max-w-md">
                                    <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-slate-100 mb-2 sm:mb-3 md:mb-4">
                                        {slide.title}
                                    </h2>
                                    <p className="text-slate-100 text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                                        {slide.description}
                                    </p>
                                    <Link
                                        href={slide.buttonLink}
                                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold 
                                        px-3 sm:px-4 md:px-6 
                                        py-2 sm:py-2 md:py-2.5
                                        text-xs sm:text-sm md:text-base
                                        rounded-md sm:rounded-lg transition-colors duration-300"
                                    >
                                        {slide.buttonText}
                                    </Link>
                                </div>
                            </div>

                            {/* Imagem - adaptável */}
                            <div className="relative w-full sm:w-1/2 h-48 sm:h-full bg-slate-900">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    className="object-contain sm:object-cover"
                                    priority={slide.id === 1}
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
)
}