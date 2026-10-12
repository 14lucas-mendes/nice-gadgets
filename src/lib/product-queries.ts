import type { Product } from '@/types/product-temp';
import type { ProductDetail } from '@/types/product-details';
import { getAllProductDetails, findProductDetailById } from './product-data';
import { mapDetailsToSummaries } from './product-mapper';
import { sortProducts, SortOption } from './product-sorting';
import { PRODUCT_LIMITS } from '@/constants/products';

export async function getProductById(productId: string): Promise<ProductDetail | null> {
  return findProductDetailById(productId);
}

export async function getAllProducts(): Promise<Product[]> {
  return mapDetailsToSummaries(getAllProductDetails());
}

export async function getProductsByItemIds(itemIds: string[]): Promise<Product[]> {
  const requestedIds = new Set(itemIds);
  const details = getAllProductDetails().filter((product) => requestedIds.has(product.id));
  return mapDetailsToSummaries(details);
}

export async function getTopPriceProducts(
  limit: number = PRODUCT_LIMITS.TOP_PRODUCTS,
): Promise<Product[]> {
  const sorted = sortProducts(await getAllProducts(), SortOption.PRICE_DESC);
  return sorted.slice(0, limit);
}

export async function getNewestProducts(
  limit: number = PRODUCT_LIMITS.TOP_PRODUCTS,
): Promise<Product[]> {
  const sorted = sortProducts(await getAllProducts(), SortOption.YEAR_DESC);
  return sorted.slice(0, limit);
}

export const getTopYearProducts = getNewestProducts;

export async function getProductsByCategory(
  category: string,
  options?: {
    sortBy?: SortOption;
    limit?: number;
  },
): Promise<Product[]> {
  const { sortBy = SortOption.PRICE_DESC, limit } = options || {};

  const sorted = sortProducts(
    mapDetailsToSummaries(
      getAllProductDetails().filter((product) => product.category === category),
    ),
    sortBy,
  );

  return limit === undefined ? sorted : sorted.slice(0, Math.max(0, limit));
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
