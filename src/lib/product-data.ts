import type { ProductDetail } from '@/types/product-details';

import phonesData from '@/data/phones.json';
import tabletsData from '@/data/tablets.json';
import accessoriesData from '@/data/accessories.json';

// Cache de dados (evita re-parse do JSON)
let cachedProducts: ProductDetail[] | null = null;

export function getAllProductDetails(): ProductDetail[] {
  if (cachedProducts) {
    return cachedProducts;
  }

  cachedProducts = [
    ...(phonesData as ProductDetail[]),
    ...(tabletsData as ProductDetail[]),
    ...(accessoriesData as ProductDetail[]),
  ];

  return cachedProducts;
}

export function getProductDetailsByCategory(category: string): ProductDetail[] {
  const allProducts = getAllProductDetails();
  return allProducts.filter((p) => p.category === category);
}

export function findProductDetailById(productId: string): ProductDetail | null {
  const allProducts = getAllProductDetails();
  return allProducts.find((p) => p.id === productId || p.namespaceId === productId) || null;
}
