import type { SortOption, PerPageOption } from '@/types/catalog';

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' as SortOption },
  { label: 'Alphabetically', value: 'alphabetically' as SortOption },
  { label: 'Cheapest', value: 'cheapest' as SortOption },
] as const;

export const PER_PAGE_OPTIONS = [
  { label: '4', value: '4' as PerPageOption },
  { label: '8', value: '8' as PerPageOption },
  { label: '16', value: '16' as PerPageOption },
  { label: 'All', value: 'all' as PerPageOption },
] as const;

export const DEFAULT_FILTERS = {
  sort: 'newest' as SortOption,
  perPage: 'all' as PerPageOption,
  page: 1,
} as const;
