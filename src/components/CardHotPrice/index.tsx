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
        <div>
            <HeadingCard as="h2">Hot prices</HeadingCard>
            <div className="mt-6 md:gap-6">
                <Card products={products} />
            </div>
        </div>  
    );
}