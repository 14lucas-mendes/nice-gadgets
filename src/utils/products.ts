import { ProductDetails } from "@/types/ProductDetails";
import { Product } from "../types/Product";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getTop10Products(): Promise<Product[]> {
    return fetch(`${baseUrl}/api/products?skip=0&limit=10&sortBy=priceDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getTopYearProducts(): Promise<Product[]> {
    return fetch(`${baseUrl}/api/products?skip=0&limit=10&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getAllPhonesProducts(): Promise<Product[]> {
    return fetch(`${baseUrl}/api/products?category=phones&limit=120&skip=0&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getAllAccessoriesProducts(): Promise<Product[]> {
    return fetch(`${baseUrl}/api/products?category=accessories&limit=120&skip=0&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getAllTabletsProducts(): Promise<Product[]> {
    return fetch(`${baseUrl}/api/products?category=tablets&limit=120&skip=0&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getProductById(productId: string): Promise<ProductDetails> {
    const url =  fetch(`${baseUrl}/api/products/${productId}`);
    

    try {
      const response = await url;
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao buscar o produto');
      }

      const data = await url.then(res => res.json());
      return data.product as ProductDetails;
    }

    catch (error) {
      
      throw new Error('Erro ao buscar o produto: ' + (error as Error).message);
    } 
}
