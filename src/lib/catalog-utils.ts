import type { Product } from '@/types/product-temp';
import type { SortOption } from '@/types/catalog';

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

export function paginateProducts(products: Product[], page: number, perPage: string): Product[] {
  if (perPage === 'all') {
    return products;
  }

  const itemsPerPage = parseInt(perPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return products.slice(startIndex, endIndex);
}

export function calculateTotalPages(totalItems: number, perPage: string): number {
  if (perPage === 'all') return 1;
  return Math.ceil(totalItems / parseInt(perPage));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
