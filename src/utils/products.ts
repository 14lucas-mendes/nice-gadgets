import { Slider } from "@/types/Slider";
import { Product } from "../types/Product";

export async function getAllProducts(): Promise<Product[]> {

    try {
    const response = await fetch('/api/products.json', { next: { revalidate: 0 } });
        if(!response.ok) {
            throw new Error('Http error! status: ' + response.status);
        }

    const data = await response.json() as Product[];
    data.sort((a, b) => (a.fullPrice - a.price) - (b.fullPrice - b.price));
    return data.slice(0, 10);
    } catch (error) {
        console.error(error);
        return [];
    }
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