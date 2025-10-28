import { Product } from "../types/Product";

export async function getTop10Products(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return fetch(`${baseUrl}/api/products?skip=0&limit=10&sortBy=priceDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getTopYearProducts(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return fetch(`${baseUrl}/api/products?skip=0&limit=10&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getAllPhonesProducts(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return fetch(`${baseUrl}/api/products?category=phones&limit=120&skip=0&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getAllAccessoriesProducts(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return fetch(`${baseUrl}/api/products?category=accessories&limit=120&skip=0&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getAllTabletsProducts(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return fetch(`${baseUrl}/api/products?category=tablets&limit=120&skip=0&sortBy=yearDesc`)
    .then(response => response.json())
    .then(data => data.products as Product[])
}

export async function getProductById(itemId: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  return fetch(`${baseUrl}/api/products/${itemId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    })
    .then((data) => data ? data.product : null)
    .catch((error) => {
      console.error('Erro ao buscar produto:', error);
      return null;
    });
}
