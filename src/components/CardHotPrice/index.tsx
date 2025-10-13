'use client'

import { Product } from "@/types/Product";
import { HeadingCard } from "../HeadingCard";
import { useRef, useState } from "react";
import Card from "../Card";


export default function CardHotPrice({ products }: { products: Product[]}) {

    const [currentCard, setCurrentCard] = useState(0)
    const cardContainerRef = useRef<HTMLDivElement>(null)


    const handleNextCard = () => {
        if (!products || products.length === 0) return;
        
        
        const nextCardIndex = currentCard === products.length - 1 ? 0 : currentCard + 1;
        
        
        if (cardContainerRef.current) {
           
            const targetCard = cardContainerRef.current.children[nextCardIndex] as HTMLElement;
            
            
            if (targetCard) {
                 targetCard.scrollIntoView({
                     behavior: 'smooth', // Adiciona transição suave
                     inline: 'start',     // Alinha o início do card ao início do contêiner
                     block: 'nearest'
                 });
            }
        }

        
        setCurrentCard(nextCardIndex);
    }

    const handlePrevCard = () => {
       if (!products || products.length === 0) return;
        
        
        const prevCardIndex = currentCard === 0 ? products.length - 1 : currentCard - 1;

        
        if (cardContainerRef.current) {
             const targetCard = cardContainerRef.current.children[prevCardIndex] as HTMLElement;
             
             
             if (targetCard) {
                 targetCard.scrollIntoView({
                     behavior: 'smooth', 
                     inline: 'start',
                     block: 'nearest'
                 });
             }
        }

        
        setCurrentCard(prevCardIndex);
    }


    return (
        <div className="w-full md:max-w-6xl mt-6">
            <div className="flex justify-between items-center">
                <HeadingCard as="h2">Hot prices</HeadingCard>
                <div className="flex gap-2">
                    <button className="cursor-pointer" onClick={() => handlePrevCard()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"     className="size-8 text-slate-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1  18 0Z" />
                        </svg>
                    </button>
                    <button className="cursor-pointer" onClick={() => handleNextCard()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-slate-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
            ref={cardContainerRef}
            className="flex flex-row mt-6 gap-13 overflow-x-auto md:overflow-hidden snap-x snap-mandatory">
                {products.map(product => (
                    <div key={product.id} 
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/5 snap-start">
                        <Card 
                        image={product.image} 
                        name={product.name} 
                        price={product.price} 
                        fullPrice={product.fullPrice} 
                        screen={product.screen}
                        capacity={product.capacity}
                        ram={product.ram}
                        />
                    </div>
                ))}
            </div>
        </div>  
    );
}