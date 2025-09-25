import { Slider } from "@/types/Slider";
import { Product } from "../types/Product";

export async function getAllProducts(): Promise<Product[]> {
    return fetch("api/products?limiit=10&sortBy=priceAsc")
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getAllProductsSlider(): Promise<Slider[]> {
    try {
    const response = await fetch('/api/slider.json', { next: { revalidate: 0 } });
        if(!response.ok) {
            throw new Error('Http error! status: ' + response.status);
        }

    const data = await response.json() as Slider[];
    return data;
    } catch (error) {
        console.error(error);
        return [];
    }
    
}