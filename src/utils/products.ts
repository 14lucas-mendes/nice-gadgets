import { Product } from "../types/Product";

export async function getTop10Products(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return fetch(`${baseUrl}/api/products?skip=0&limit=10&sortBy=priceDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}