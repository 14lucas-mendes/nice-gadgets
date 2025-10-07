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
