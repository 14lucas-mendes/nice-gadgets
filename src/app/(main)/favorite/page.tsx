'use client';

import { HeadingCard } from "@/components/HeadingCard";
import { useCartFavorite } from "@/context/CartFavoriteContext";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { getProductsByItemIds } from "@/utils/products";
import PageNavigation from "@/components/NavPage";

export default function Favorite() {
    const { favoriteItems, favoriteCount } = useCartFavorite();
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavoriteProducts = async () => {
            setIsLoading(true);
            try {
                const itemIds = Array.from(favoriteItems);
                if (itemIds.length > 0) {
                    const products = await getProductsByItemIds(itemIds);
                    setFavoriteProducts(products);
                } else {
                    setFavoriteProducts([]);
                }
            } catch (error) {
                console.error('Error loading favorite products:', error);
                setFavoriteProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavoriteProducts();
    }, [favoriteItems]);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto w-full pt-6">
                <HeadingCard as='h1'>Favourites</HeadingCard>
                <p className="font-semibold text-[14px] text-[#89939A] mt-2">Carregando...</p>
            </div>
        );
    }

    // Se não houver favoritos, mostrar estado vazio
    if (favoriteCount === 0 || favoriteProducts.length === 0) {
        return (
            <div className="max-w-6xl mx-auto w-full pt-6">
                <HeadingCard as='h1'>Favourites</HeadingCard>
                <p className="font-semibold text-[14px] text-[#89939A] mt-2">0 itens</p>
                <div className="flex justify-center items-center mt-10">
                    <p className="text-[#89939A]">Você não tem produtos favoritados ainda.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-14">
            <PageNavigation
                products={favoriteProducts}
                page="Favourites"
                title="Favourites"
                description={`${favoriteCount} ${favoriteCount === 1 ? 'item' : 'itens'}`}
            />
        </div>
    );
}