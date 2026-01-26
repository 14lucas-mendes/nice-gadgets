import type { Product } from '@/types/product-temp';

export enum SortOption {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  YEAR_ASC = 'year_asc',
  YEAR_DESC = 'year_desc',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
}

type SortFunction = (a: Product, b: Product) => number;

const SORT_FUNCTIONS: Record<SortOption, SortFunction> = {
  [SortOption.PRICE_ASC]: (a, b) => a.price - b.price,
  [SortOption.PRICE_DESC]: (a, b) => b.price - a.price,
  [SortOption.YEAR_ASC]: (a, b) => a.year - b.year,
  [SortOption.YEAR_DESC]: (a, b) => b.year - a.year,
  [SortOption.NAME_ASC]: (a, b) => a.name.localeCompare(b.name),
  [SortOption.NAME_DESC]: (a, b) => b.name.localeCompare(a.name),
};

export function sortProducts(
  products: Product[],
  sortBy: SortOption = SortOption.YEAR_DESC,
): Product[] {
  const sortFn = SORT_FUNCTIONS[sortBy];
  return [...products].sort(sortFn);
}
