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
      buttonLink: "/phones"
    },
    {
      id: 2,
      src: "/img/layout/banner-tablets.png",
      alt: "tablets",
      title: "Make your best chance",
      description: "Discover our tablet collection with the latest technology.",
      buttonText: "Shop Tablets",
      buttonLink: "/tablets"
    },
    {
      id: 3,
      src: "/img/layout/banner-accessories.png",
      alt: "accessories",
      title: "Available in our store",
      description: "Find the perfect accessories to complement your devices.",
      buttonText: "Shop Accessories",
      buttonLink: "/accessories"
    }
]


    return (
        <div className="w-full relative">
            <div className="mb-14">
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
                className="mySwiper"
            >
        {slider.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full sm:w-[490px] sm:h-[189px] md:w-[1040px] md:h-[400px] mx-auto bg-gray-100 overflow-hidden rounded-2xl">
              
              {/* Container flex para dividir em 50/50 */}
              <div className="flex h-full">
                
                {/* Card com conteúdo - 50% esquerda */}
                <div className="w-1/2 flex items-center justify-center p-4 md:p-8 bg-slate-600">
                  <div className="max-w-sm">
                    <h2 className="text-lg md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-slate-100 text-xs md:text-base mb-3 md:mb-6 leading-relaxed">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.buttonLink}
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 md:px-8 py-2 md:py-3 rounded-lg transition-colors duration-300 text-sm md:text-base"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>

                {/* Imagem - 50% direita */}
                <div className="relative w-1/2 bg-slate-900">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
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