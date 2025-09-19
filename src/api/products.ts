import { Product } from "../types/Product";

export async function getProductsByHotPrice(): Promise<Product[] | null>  {
    
    try {
        const reposnse = await fetch('./api/products.json') ;
        const data = await reposnse.json() as Product[];

        data.sort((a: Product, b: Product) => {
            if(a.fullPrice - a.price > b.fullPrice - b.price) return -1;
            if(a.fullPrice - a.price < b.fullPrice - b.price) return 1;
            return 0;
        });

        return data.slice(0, 10);
    } catch (error) {
        console.error(error)
        return null;
    }
}