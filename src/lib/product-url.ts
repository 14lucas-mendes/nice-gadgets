import type { ProductDetail } from '@/types/product-details';

export function buildProductId(namespaceId: string, capacity: string, color: string): string {
  const capacityFormatted = capacity.toLowerCase();
  return `${namespaceId}-${capacityFormatted}-${color}`;
}

export function buildProductUrl(
  category: string,
  namespaceId: string,
  capacity: string,
  color: string,
): string {
  const productId = buildProductId(namespaceId, capacity, color);
  return `/products/${category}/${productId}`;
}

export function getProductUrlByColor(product: ProductDetail, color: string): string {
  return buildProductUrl(product.category, product.namespaceId, product.capacity, color);
}

export function getProductUrlByCapacity(product: ProductDetail, capacity: string): string {
  return buildProductUrl(product.category, product.namespaceId, capacity, product.color);
}
