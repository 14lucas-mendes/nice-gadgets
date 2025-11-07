'use client'

import { Product } from "@/types/Product";
import { useRef, useState } from "react";
import { HeadingCard } from "../HeadingCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from "../Card";

type CardSliceProps = {
    products: Product[],
    title: string
}

export default function CardSlicer({products, title}: CardSliceProps) {

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
         <div className="w-full md:max-w-6xl">
            <div className="flex justify-between items-center">
                <HeadingCard as="h2">{title}</HeadingCard>
            <div className="flex gap-2">
                <button className="cursor-pointer" onClick={() => handlePrevCard()}>
                    <ArrowBackIosIcon />
                </button>
                <button className="cursor-pointer" onClick={() => handleNextCard()}>
                    <ArrowForwardIosIcon />
                </button>
            </div>
            </div>
            <div
            ref={cardContainerRef}
            className="flex flex-row mt-6 gap-14 overflow-x-auto md:overflow-hidden snap-x snap-mandatory">
                {products.map(product => (
                <div key={product.id} 
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/5 snap-start">
                    <Card 
                    product={product}
                    />
            </div>
            ))}
            </div>
        </div>  
    )
}