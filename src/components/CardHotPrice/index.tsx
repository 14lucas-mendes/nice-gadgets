'use client'

import { Product } from "@/types/Product";
import { HeadingCard } from "../HeadingCard";
import { useState } from "react";
import Card from "../Card";


export default function CardHotPrice({ products }: { products: Product[]}) {

    const [currentCard, setCurrentCard] = useState(0)


    const handleNextCard = () => {
        if (!products || products.length === 0) return;
        const nextCard = currentCard === products.length - 1 ? 0 : currentCard + 1;
        setCurrentCard(nextCard);
    }

    const handlePrevCard = () => {
        if (!products || products.length === 0) return;
        const prevCard = currentCard === 0 ? products.length - 1 : currentCard - 1;
        setCurrentCard(prevCard);
    }


    return (
        <div className="w-full md:max-w-6xl">
            <div className="flex justify-between items-center">
                <HeadingCard as="h2">Hot prices</HeadingCard>
                <div className="flex gap-2">
                    <button className="cursor-pointer" onClick={() => handleNextCard()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"     className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1  18 0Z" />
                        </svg>
                    </button>
                    <button className="cursor-pointer" onClick={() => handlePrevCard()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-6 md:gap-6">
                <Card products={products} />
            </div>
        </div>  
    );
}