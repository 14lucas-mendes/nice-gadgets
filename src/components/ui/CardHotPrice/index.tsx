'use client'

import { useEffect, useState } from "react";
import { CardNewModelsType } from "@/types/Product-type";
import Image from "next/image";
import Link from "next/link";


export default function CardHotPrice() {
    const [dadosCard, setDadosCard] = useState<CardNewModelsType[]>([]);
    const [currentCard, setCurrentCard] = useState(0)
    const [touchStartX, setTouchStartX] = useState(0);
    const [dragX, setDragX] = useState(0);

    useEffect(() => {

        fetch('./api/products.json')
            .then(response => response.json())
            .then(data => {
                const fatiados = data.slice(36, 47)

                console.log("Quantidade de itens fatiados: ", fatiados.length)

                setDadosCard(fatiados)
            })
            .catch(error => console.log(error))
    }, [])

    const handleNextCard = () => {
        const nextCard = currentCard === dadosCard.length - 1 ? 0 : currentCard + 1;
        setCurrentCard(nextCard);
    }

    const handlePrevCard = () => {
        const prevCard = currentCard === 0 ? dadosCard.length - 1 : currentCard - 1;
        setCurrentCard(prevCard);
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStartX(e.touches[0].clientX);
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {

        const difference = e.touches[0].clientX - touchStartX;

        setDragX(-difference)

    }


    const handleTouchEnd = () => {
        
        const threshold = 50

        if(dragX < -threshold) {
            //usuario arrastou para a esquerda, então avance.
           handlePrevCard();
        }

        if (dragX > threshold) {
            //usuario arrastou para a direita, então retroceda.
            handleNextCard();
        }

        setDragX(0)
    }


    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="font-extrabold text-[22px]">Hot prices</h1>
                <div className="hidden">
                    <button className="gap-4 text-gray-300" onClick={() => handlePrevCard()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <button className="text-gray-500" onClick={() => handleNextCard()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-row gap-4" 
            onTouchStart={handleTouchStart} 
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            style={{ transform: `translateX(-${currentCard * 212 + dragX}px)` }}
            >
            {dadosCard.map((item) => (
                <div key={item.id}
                className="w-[212px] h-auto p-6 flex flex-col gap-1 border-[1px] border-[#E2E6E9] rounded-[8px] bg-white"
                >
                <div className="flex flex-col items-center mt-4">
                    <div className="w-[148px] h-[129px] relative">
                    <Image
                        src={`/${item.image}`}
                        alt={item.itemId}
                        fill={true}
                        className="object-contain transition transform hover:scale-110 duration-300 ease-in-out"
                        onClick={() => handleNextCard()}
                     />
                    </div>
                     <p className="font-semibold text-[12px] mt-2 break-normal uppercase text-center w-[148px]">{item.name}</p>
                     <div className="flex gap-1 mt-4 mr-10">
                        <p className="font-bold text-[22px]">{`$${item.price}`}</p>
                        <p className="text-[22px] text-[#89939A] line-through">{`$${item.fullPrice}`}</p>
                     </div>
                     <div className="border-t border-[#E2E6E9] w-full mt-2"/>
                    </div>
                     <div className="flex justify-between w-full font-bold text-[12px] mt-2">
                        <p className="text-[#89939A]">Screen</p>
                        <p>{item.screen}</p>
                     </div>
                     <div className="flex justify-between w-full font-bold text-[12px]">
                        <p className="text-[#89939A]">Capacity</p>
                        <p>{item.capacity}</p>
                     </div>
                     <div className="flex justify-between w-full font-bold text-[12px]">
                        <p className="text-[#89939A]">RAM</p>
                        <p>{item.ram}</p>
                     </div>
                     <div className="flex justify-center w-full gap-2 mt-3.5">
                        <button className="bg-orange-500 h-10 w-[100px] rounded-[8px] text-white text-[14px] font-semibold">Add to cart</button>
                        <Link href={`/product/${item.id}`} className="flex justify-center items-center rounded-full border border-gray-400 w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#0F0F11]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </Link>
                     </div>
                </div>
            ))}
            </div> 
        </div>
    );
}