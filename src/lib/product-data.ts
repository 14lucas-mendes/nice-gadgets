import type { ProductDetail } from '@/types/product-details';

import accessoriesData from '@/data/accessories.json';
import phonesData from '@/data/phones.json';
import productsData from '@/data/products.json';
import tabletsData from '@/data/tablets.json';
import { matchesProductIdentity, matchesProductMetadata } from './product-data-matching.mjs';

interface CatalogSummary {
  id: number;
  itemId: string;
  category: string;
  capacity: string;
  color: string;
  year: number;
}

const catalogSummaries = productsData as CatalogSummary[];
let cachedProducts: ProductDetail[] | null = null;

function findCatalogSummary(detail: ProductDetail): CatalogSummary | undefined {
  return (
    catalogSummaries.find((summary) =>
      matchesProductIdentity(summary, detail.id),
    ) ??
    catalogSummaries.find((summary) => matchesProductMetadata(summary, detail))
  );
}

function enrichDetail(detail: ProductDetail): ProductDetail {
  const summary = findCatalogSummary(detail);

  if (!summary) {
    throw new Error(`Missing catalog metadata for product "${detail.id}"`);
  }

  return {
    ...detail,
    catalogId: summary.id,
    year: summary.year,
  };
}

export function getAllProductDetails(): ProductDetail[] {
  if (cachedProducts) {
    return cachedProducts;
  }

  const rawProducts = [
    ...(phonesData as ProductDetail[]),
    ...(tabletsData as ProductDetail[]),
    ...(accessoriesData as ProductDetail[]),
  ];

  cachedProducts = rawProducts.map(enrichDetail);
  return cachedProducts;
}

export function getProductDetailsByCategory(category: string): ProductDetail[] {
  return getAllProductDetails().filter((product) => product.category === category);
}

export function findProductDetailById(productId: string): ProductDetail | null {
  return (
    getAllProductDetails().find((product) =>
      matchesProductIdentity(product, productId),
    ) ?? null
  );
}
