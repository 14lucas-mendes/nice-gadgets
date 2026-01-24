export type SortOption = 'newest' | 'alphabetically' | 'cheapest';
export type PerPageOption = '4' | '8' | '16' | 'all';

export interface CatalogFilters {
  sort: SortOption;
  perPage: PerPageOption;
  page: number;
}

export interface CatalogState {
  sortBy: SortOption;
  perPage: PerPageOption;
  currentPage: number;
}
