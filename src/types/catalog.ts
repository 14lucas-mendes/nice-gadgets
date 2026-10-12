import type {
  PerPageOption,
  SortOption,
} from '@/lib/catalog-filters';

export type { PerPageOption, SortOption };

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
