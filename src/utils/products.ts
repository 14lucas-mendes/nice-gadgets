import { Slider } from "@/types/Slider";
import { Product } from "../types/Product";

export async function getProductsByHotPrice(): Promise<Product[]> {
    try {
        const response = await fetch('./products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as Product[];

        data.sort((a: Product, b: Product) => {
            if(a.fullPrice - a.price > b.fullPrice - b.price) return -1;
            if(a.fullPrice - a.price < b.fullPrice - b.price) return 1;
            return 0;
        });

        return data.slice(0, 10);
    } catch (error) {
        console.error(error);
        return []; 
    }
}

export async function getAllProductsSlider(): Promise<Slider[]> {
    try {
        const response = await fetch('./slider.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json() as Slider[];
        return data;
    } catch (error) {
        console.error(error);
        return []; 
    }
}