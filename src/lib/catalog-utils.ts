import type { Product } from '@/types/product-temp';
import type { PerPageOption, SortOption } from '@/types/catalog';
import { normalizePage, parsePageSize } from './catalog-filters';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'alphabetically':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
}

export function paginateProducts(
  products: Product[],
  page: number,
  perPage: PerPageOption,
): Product[] {
  if (perPage === 'all') {
    return products;
  }

  const itemsPerPage = parsePageSize(perPage);
  const totalPages = calculateTotalPages(products.length, perPage);
  const safePage = normalizePage(page, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;

  return products.slice(startIndex, startIndex + itemsPerPage);
}

export function calculateTotalPages(totalItems: number, perPage: PerPageOption): number {
  if (perPage === 'all') {
    return 1;
  }

  return Math.max(1, Math.ceil(totalItems / parsePageSize(perPage)));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
