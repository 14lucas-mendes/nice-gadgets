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
            <div className="relative w-full sm:w-[490px] sm:h-[189px] md:w-[1040px] md:h-[400px] mx-auto">
              {/* Imagem de fundo */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover rounded-lg"
                priority={slide.id === 1}
              />
              
              {/* Overlay escuro para melhor legibilidade */}
              <div className="absolute inset-0 bg-black/10 rounded-lg" />
              
              {/* Card com conteúdo - posicionado no canto superior esquerdo */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-[200px] sm:w-[220px] md:w-[320px] md:h-[350px] flex flex-col items-center text-center justify-center">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.buttonLink}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors duration-300 text-sm md:text-base"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
    )
}