'use client'

import Link from "next/link";
import { ProductDetails } from "@/types/ProductDetails";

const colorMap = {
    gold: '#FFD700',
    spaceBlack: '#161617',
    silver: '#C0C0C0',
    spacegray: '#535456',
    coral: '#FF7F50',
    red: '#FF0000',
    white: '#FFFFFF',
    yellow: '#FFFF00',
    midnight: '#1F202C',
    purple: '#800080',
    graphite: '#505150',
    sierrablue: '#A0B4C6',
    blue: '#0000FF',
    pink: '#FFC0CB',
    black: '#000000',
    midnightgreen: '#4E5851',
    green: '#008000',
    rosegold: '#B76E79',
    starlight: '#FAF7F2',
    skyblue: '#87CEEB'
}

type ColorsKey = keyof typeof colorMap;

export default function ColorSelector({ product } : {product: ProductDetails | null}) {
    
    // Função para construir o novo productId baseado na cor selecionada
    const getProductIdByColor = (color: ColorsKey): string => {
        if (!product) return '';
        
        // O formato do ID é: {namespaceId}-{capacity}-{color}
        // Exemplo: "apple-iphone-11-128gb-black"
        // O capacity vem como "128GB" e precisa ser convertido para "128gb"
        const capacityFormatted = product.capacity.toLowerCase();
        return `${product.namespaceId}-${capacityFormatted}-${color}`;
    }

    // Função para construir a rota completa
    const getRoute = (color: ColorsKey): string => {
        if (!product) return '/';
        const newProductId = getProductIdByColor(color);
        return `/products/${product.category}/${newProductId}`;
    }

    
    return (
        <div className="flex flex-col w-full justify-start items-start">
            <div className="text-[#89939A] text-xs sm:text-[12px] font-semibold">
                <p>Avaliable Colors</p>
            </div>
            <div className="flex flex-row gap-2 mt-2">
                {product?.colorsAvailable.map(color => {
                    const colorKey = color as ColorsKey;
                    return (
                        <div key={color}
                        className="flex text-2xl text-center justify-center"
                        >
                            <Link href={getRoute(colorKey)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 hover:border-2 rounded-full ${product.color === color ? 'border-2 border-gray-600' : ''}`}
                            style={{ backgroundColor: colorMap[colorKey] || color }}
                            >
                        
                            </Link>
                        </div>
                    );
                })}
            </div>
            <hr className="w-full my-4 sm:my-6 border-gray-400" />
        </div>
    )
}