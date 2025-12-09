'use client'

import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from "./ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'





export default function CarouselSlider() {
    const plugin = useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    )




    const images = [
        {
            src: '/img/layout/phones.png',
            alt: 'phones',
            link: '/products/phones'
        },
        {
            src: '/img/layout/tablets.png',
            alt: 'tablets',
            link: '/products/tablets'
        },
        {
            src: '/img/layout/accessories.png',
            alt: 'accessories',
            link: '/products/accessories'
        }
    ]

    return (
        <div className='w-full max-w-full p-0 overflow-hidden sm:px-12 md:max-w-5xl md:mx-auto'>
            <div className='py-6 px-4'>
                <h1 className='text-3xl font-extrabold text-[#0F0F11]'>Welcome to Nice Gadgets store!</h1>
            </div>
        <Carousel
        plugins={[plugin.current]}
        className='w-full'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-0 sm:pl-4">
                  <div className="">
                    <Card className="overflow-hidden p-0 h-[320px] rounded-none sm:rounded-lg sm:h-auto md:max-h-[400px]">
                      <CardContent className="flex items-center justify-center p-0 relative h-[320px] sm:h-auto sm:aspect-[490/189] md:aspect-video md:max-h-[400px]">
                        <Link href={image.link} className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
                          Imagem {index + 1}
                          {/* Para usar imagens reais, descomente abaixo */}
                          <Image src={image.src} alt={image.alt} fill className="object-cover" />
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex -left-12" />
            <CarouselNext className="hidden sm:flex -right-12" />
            
        </Carousel>
        </div>
    )
}