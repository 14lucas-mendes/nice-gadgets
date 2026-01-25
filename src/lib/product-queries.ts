import type { Product } from '@/types/product';
import type { ProductDetail } from '@/types/product-details';
import { getAllProductDetails, findProductDetailById } from './product-data';
import { mapDetailToSummary, mapDetailsToSummaries } from './product-mapper';
import { sortProducts, SortOption } from './product-sorting';
import { PRODUCT_LIMITS } from '@/constants/products';

// ==========================================
// QUERIES DE PRODUCT DETAIL
// ==========================================

export async function getProductById(productId: string): Promise<ProductDetail | null> {
  return findProductDetailById(productId);
}

// ==========================================
// QUERIES DE PRODUCT SUMMARY
// ==========================================

export async function getAllProducts(): Promise<Product[]> {
  const details = getAllProductDetails();
  return mapDetailsToSummaries(details);
}

export async function getProductsByItemIds(itemIds: string[]): Promise<Product[]> {
  const details = getAllProductDetails();
  const filtered = details.filter((product) => itemIds.includes(product.id));
  return mapDetailsToSummaries(filtered);
}

// ==========================================
// TOP PRODUCTS (por preço)
// ==========================================

export async function getTopPriceProducts(
  limit: number = PRODUCT_LIMITS.TOP_PRODUCTS,
): Promise<Product[]> {
  const products = await getAllProducts();
  const sorted = sortProducts(products, SortOption.PRICE_DESC);
  return sorted.slice(0, limit);
}

// ==========================================
// NEWEST PRODUCTS (por ano)
// ==========================================

export async function getNewestProducts(
  limit: number = PRODUCT_LIMITS.TOP_PRODUCTS,
): Promise<Product[]> {
  const products = await getAllProducts();
  const sorted = sortProducts(products, SortOption.YEAR_DESC);
  return sorted.slice(0, limit);
}

// Alias para compatibilidade (se já está usando)
export const getTopYearProducts = getNewestProducts;

// ==========================================
// PRODUCTS POR CATEGORIA
// ==========================================

export async function getProductsByCategory(
  category: string,
  options?: {
    sortBy?: SortOption;
    limit?: number;
  },
): Promise<Product[]> {
  const { sortBy = SortOption.PRICE_DESC, limit = PRODUCT_LIMITS.CATEGORY_MAX } = options || {};

  const details = getAllProductDetails();
  const filtered = details.filter((p) => p.category === category);
  const products = mapDetailsToSummaries(filtered);
  const sorted = sortProducts(products, sortBy);

  return sorted.slice(0, limit);
}

export async function getAllPhonesProducts(): Promise<Product[]> {
  return getProductsByCategory('phones');
}

export async function getAllTabletsProducts(): Promise<Product[]> {
  return getProductsByCategory('tablets');
}

export async function getAllAccessoriesProducts(): Promise<Product[]> {
  return getProductsByCategory('accessories');
}
