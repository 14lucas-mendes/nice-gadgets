import { ProductDetails } from '@/types/ProductDetails';
import { Product } from '../types/Product';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getTop10Products(): Promise<Product[]> {
  return fetch(`${baseUrl}/api/products?skip=0&limit=10&sortBy=priceDesc`)
    .then((response) => response.json())
    .then((data) => data.products as Product[]);
}

export async function getTopYearProducts(): Promise<Product[]> {
  return fetch(`${baseUrl}/api/products?skip=0&limit=10&sortBy=yearDesc`)
    .then((response) => response.json())
    .then((data) => data.products as Product[]);
}

export async function getAllPhonesProducts(): Promise<Product[]> {
  return fetch(`${baseUrl}/api/products?category=phones&limit=120&skip=0&sortBy=yearDesc`)
    .then((response) => response.json())
    .then((data) => data.products as Product[]);
}

export async function getAllAccessoriesProducts(): Promise<Product[]> {
  return fetch(`${baseUrl}/api/products?category=accessories&limit=120&skip=0&sortBy=yearDesc`)
    .then((response) => response.json())
    .then((data) => data.products as Product[]);
}

export async function getAllTabletsProducts(): Promise<Product[]> {
  return fetch(`${baseUrl}/api/products?category=tablets&limit=120&skip=0&sortBy=yearDesc`)
    .then((response) => response.json())
    .then((data) => data.products as Product[]);
}

export async function getProductById(productId: string): Promise<ProductDetails> {
  try {
    const response = await fetch(`${baseUrl}/api/products/${productId}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha ao buscar o produto: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.product as ProductDetails;
  } catch (error) {
    throw new Error('Erro ao buscar o produto: ' + (error as Error).message);
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return fetch(`${baseUrl}/api/products?limit=1000&skip=0`)
    .then((response) => response.json())
    .then((data) => data.products as Product[]);
}

export async function getProductsByItemIds(itemIds: string[]): Promise<Product[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter((product) => itemIds.includes(product.itemId));
}
