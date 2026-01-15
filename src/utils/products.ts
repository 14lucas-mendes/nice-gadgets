import { ProductDetails } from '@/types/ProductDetails';
import { Product } from '../types/Product';

import productsData from '@/data/products.json';


const getLocalProducts = (): Product[] => {
  return productsData as unknown as Product[];
};

export async function getTop10Products(): Promise<Product[]> {
  const products = getLocalProducts();
  
  return products.sort((a, b) => b.price - a.price).slice(0, 10);
}

export async function getTopYearProducts(): Promise<Product[]> {
  const products = getLocalProducts();
  
  return products.sort((a, b) => b.year - a.year).slice(0, 10);
}

export async function getAllPhonesProducts(): Promise<Product[]> {
  const products = getLocalProducts();
 
  return products
    .filter((p) => p.category === 'phones')
    .sort((a, b) => b.year - a.year)
    .slice(0, 120);
}

export async function getAllAccessoriesProducts(): Promise<Product[]> {
  const products = getLocalProducts();
 
  return products
    .filter((p) => p.category === 'accessories')
    .sort((a, b) => b.year - a.year)
    .slice(0, 120);
}

export async function getAllTabletsProducts(): Promise<Product[]> {
  const products = getLocalProducts();

  return products
    .filter((p) => p.category === 'tablets')
    .sort((a, b) => b.year - a.year)
    .slice(0, 120);
}

export async function getProductById(productId: string): Promise<ProductDetails> {
  const products = getLocalProducts();

  const product = products.find((p) => p.itemId === productId || String(p.id) === productId);

  if (!product) {
    throw new Error(`Falha ao buscar o produto: Produto não encontrado`);
  }

  return product as unknown as ProductDetails;
}

export async function getAllProducts(): Promise<Product[]> {
  return getLocalProducts();
}

export async function getProductsByItemIds(itemIds: string[]): Promise<Product[]> {
  const allProducts = getLocalProducts();
  return allProducts.filter((product) => itemIds.includes(product.itemId));
}
