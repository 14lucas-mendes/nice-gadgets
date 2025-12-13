'use client'

import { useRouter } from "next/navigation";
import { ProductDetails } from "@/types/ProductDetails";

export default function StorageSelector({ product }: { product: ProductDetails | null }) {
    const router = useRouter();
    
    // Função para construir o novo productId baseado na capacidade selecionada
    const getProductIdByCapacity = (capacity: string): string => {
        if (!product) return '';
        
        // O formato do ID é: {namespaceId}-{capacity}-{color}
        // Exemplo: "apple-iphone-11-128gb-black"
        // O capacity vem como "128GB" e precisa ser convertido para "128gb"
        const capacityFormatted = capacity.toLowerCase();
        return `${product.namespaceId}-${capacityFormatted}-${product.color}`;
    }

    // Função para construir a rota completa
    const getRoute = (capacity: string): string => {
        if (!product) return '/';
        const newProductId = getProductIdByCapacity(capacity);
        return `/products/${product.category}/${newProductId}`;
    }

    // Handler para clicar na capacidade
    const handleCapacityClick = (capacity: string) => {
        if (!product) return;
        const route = getRoute(capacity);
        router.push(route);
    }

    return (
        <div className="flex flex-col w-full justify-start items-start">
            <div className="text-[#89939A] text-[12px] font-semibold">
                <p>Select Capacity</p>
            </div>
            <div className="flex flex-row gap-2 mt-2">
                {product?.capacityAvailable.map(capacity => (
                    <button
                    key={capacity}
                    type="button"
                    onClick={() => handleCapacityClick(capacity)}
                    className={`px-4 py-2 text-[14px] font-medium border rounded-md hover:border-blue-500 transition-colors cursor-pointer ${product.capacity === capacity ? 'border-2 border-gray-600' : 'border-gray-300'}`}
                    >
                        {capacity}
                    </button>
                ))}
            </div>
            <hr className="w-full my-6 border-gray-400" />
        </div>
    )
}