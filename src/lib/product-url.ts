import type { ProductDetail } from '@/types/product-details';

/** Normalizes capacity/color fragments used in product ids (e.g. "Rose Gold" → "rose-gold"). */
export function formatVariantSlug(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

export function buildProductId(namespaceId: string, capacity: string, color: string): string {
  return `${namespaceId}-${formatVariantSlug(capacity)}-${formatVariantSlug(color)}`;
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

export function getSelectableColors(
  product: ProductDetail,
  existingIds: ReadonlySet<string>,
): string[] {
  return product.colorsAvailable.filter((color) => {
    if (color === product.color) {
      return true;
    }

    return existingIds.has(buildProductId(product.namespaceId, product.capacity, color));
  });
}

export function getSelectableCapacities(
  product: ProductDetail,
  existingIds: ReadonlySet<string>,
): string[] {
  return product.capacityAvailable.filter((capacity) => {
    if (capacity === product.capacity) {
      return true;
    }

    return existingIds.has(buildProductId(product.namespaceId, capacity, product.color));
  });
}
